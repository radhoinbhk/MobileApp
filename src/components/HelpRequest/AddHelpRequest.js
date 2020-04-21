import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Picker } from 'react-native';
import { TextInput, Button, Appbar } from "react-native-paper";
import Tunisia from '../Common/Tunisia.json'
import Header from "../Common/Header";
import { useSelector, useDispatch } from "react-redux";
import { AddDemande } from "../../redux/Action/HelpRequestAction";
import { ShowSnackbarError, ShowSnackbarSuccess } from "../Common/Snackbar";
import Loader from "../Common/Loader";

export default function AddHelpRequest(props) {
    const dispatch = useDispatch()

    const [titre, setTitre] = useState()
    const [objectif, setObjectif] = useState()
    const [gouvernoratValue, setGouvernoratValue] = useState();
    const [delegationValue, setDelegationValue] = useState();
    const [adresse, setAdresse] = useState()
    const [description, setDescription] = useState()
    const [delegationList, setDelegationList] = useState();
    const scrollRef = useRef();
    const userData = useSelector((state) => state.HomeReducer.userData);
    const addDemandeIsError = useSelector((state) => state.HelpRequestReducer.addDemandeIsError);
    const addDemandeIsSuccess = useSelector((state) => state.HelpRequestReducer.addDemandeIsSuccess);
    const isLoading = useSelector((state) => state.HelpRequestReducer.isLoading);

    useEffect(() => {
        Tunisia.map((gouvernorat) => {
            if (gouvernorat.code == gouvernoratValue) {
                setDelegationList(gouvernorat)
            }
        })
    }, [gouvernoratValue])

    const Sinscrire = () => {
        const body = {
            "Titre": titre,
            "Objectif": objectif,
            "Description": description,
            "State": gouvernoratValue,
            "Delegation": delegationValue,
            "Adresse": adresse,
            "idUser": userData._id
        }
        dispatch(AddDemande(body))
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            ref={scrollRef}
            keyboardShouldPersistTaps='handled'>
            <Header navigation={props.navigation} screenTitel="Ajouter demande d'aide" />
            {isLoading ?
                <Loader />
                : <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                    <TextInput
                        style={{ width: 300, marginBottom: 30 }}
                        label='TITRE DE LA MISSION'
                        value={titre}
                        mode='outlined'
                        onChangeText={value => setTitre(value)}
                    />
                    <TextInput
                        style={{ width: 300, marginBottom: 30 }}
                        label='OBJECTIF DE LA MISSION'
                        value={objectif}
                        mode='outlined'
                        onChangeText={value => setObjectif(value)}
                    />
                    <TextInput
                        style={{ width: 300, marginBottom: 30 }}
                        multiline={true}
                        numberOfLines={7}
                        label='DESCRIPTION DE LA MISSION'
                        value={description}
                        mode='outlined'
                        onChangeText={value => setDescription(value)}
                    />
                    <View style={{ width: 300, marginBottom: 20, borderColor: "#7f7f7f", borderWidth: 1, borderRadius: 4 }}>
                        <Picker
                            mode='dialog'
                            selectedValue={gouvernoratValue}
                            style={{ height: 56, width: 300, color: "#7f7f7f" }}
                            onValueChange={(itemValue, itemIndex) => { setGouvernoratValue(itemValue), console.log("GouvernoratitemValue", itemValue) }}
                        >
                            <Picker.Item label="Choisir le Gouvernorat" />
                            {Tunisia.map((gouvernorat, index) =>
                                <Picker.Item key={index} label={gouvernorat.nameFR} value={gouvernorat.code} />
                            )}
                        </Picker>
                    </View>
                    <View style={{ width: 300, marginBottom: 20, borderColor: "#7f7f7f", borderWidth: 1, borderRadius: 4 }}>
                        <Picker
                            mode='dialog'
                            selectedValue={delegationValue}
                            style={{ height: 56, width: 300, color: "#7f7f7f" }}
                            onValueChange={(itemValue, itemIndex) => setDelegationValue(itemValue)}
                        >
                            <Picker.Item label="Choisir le Délégation" />
                            {delegationList && delegationList.Delegation.map((Delegation, indexDelegation) =>
                                < Picker.Item key={indexDelegation} label={Delegation.nameFR} value={Delegation.code} />
                            )}
                        </Picker>
                    </View>
                    <TextInput
                        style={{ width: 300, marginBottom: 30 }}
                        label='Adresse'
                        value={adresse}
                        mode='outlined'
                        onChangeText={value => setAdresse(value)}
                    />
                    <Button style={{ marginBottom: 50 }} icon="content-save" mode="contained" onPress={() => Sinscrire()}>
                        Enregistrer la demande
                </Button>
                </View>}
            {addDemandeIsError && <ShowSnackbarError message={"Il y a un problème veuillez essayer un autre fois"} />}
            {addDemandeIsSuccess && <ShowSnackbarSuccess message={"La demande est créée avec succès"} />}
        </ScrollView >
    );
}

