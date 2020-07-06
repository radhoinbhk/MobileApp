import React, { useState, useEffect } from "react";
import { View, Picker, ScrollView, SafeAreaView } from 'react-native';
import { Avatar, TextInput, Button } from 'react-native-paper';
import Header from '../Common/Header'
import Tunisia from '../Common/Tunisia.json'
import TextInputMask from "react-native-text-input-mask";
import { useSelector, useDispatch } from "react-redux";
import { SetUpdate } from "../../redux/Action/ProfileAction";
import Loader from "../Common/Loader";

export default function Profile(props) {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.HomeReducer.userData)
    const isSignedIn = useSelector(state => state.HomeReducer.isSignedIn)
    const userToken = useSelector(state => state.HomeReducer.userToken)
    const updateIsLoading = useSelector((state) => state.ProfileReducer.updateIsLoading)
    const [nom, setNom] = useState(userData.Nom)
    const [prenom, setPrenom] = useState(userData.Prenom)
    const [cin, setCin] = useState(userData.CIN)
    const [email, setEmail] = useState(userData.Email)
    const [password, setPassword] = useState()
    const [confPassword, setConfPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState(userData.Nmobile)
    const [gouvernoratValue, setGouvernoratValue] = useState(userData.State);
    const [delegationValue, setDelegationValue] = useState(userData.Delegation);
    const [adresse, setAdresse] = useState(userData.Adresse)
    const [codePostal, setCodePostal] = useState(userData.Code_Postal)
    const [delegationList, setDelegationList] = useState();

    useEffect(() => {
        Tunisia.map((gouvernorat) => {
            if (gouvernorat.code == gouvernoratValue) {
                setDelegationList(gouvernorat)
            }
        })
    }, [gouvernoratValue])

    const saveUpdate = () => {
        const user = {
            "CIN": cin,
            "Nom": nom,
            "Prenom": prenom,
            "Code_Postal": codePostal,
            "Email": email,
            "Password": password,
            "Nmobile": phoneNumber,
            "State": gouvernoratValue,
            "Delegation": delegationValue,
            "Adresse": adresse
        }
        const body = {
            "CIN": userData.CIN,
            "update": user
        }
        dispatch(SetUpdate(isSignedIn, userToken, body))
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={props.navigation} />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
                {updateIsLoading ?
                    <Loader />
                    : <View style={{ marginTop: 30, alignItems: "center" }}>
                        <Avatar.Icon size={90} icon="account" color="#fff" style={{ backgroundColor: "rgba(41, 182, 246, 0.6)" }} />
                        <TextInput
                            style={{ width: 300, marginBottom: 30, marginTop: 30 }}
                            theme={{ colors: {primary: "rgba(41, 182, 246, 1)"} }}
                            label='Nom'
                            value={nom}
                            mode='outlined'
                            onChangeText={value => setNom(value)}
                        />
                        <TextInput
                            style={{ width: 300, marginBottom: 30 }}
                            theme={{ colors: {primary: "rgba(41, 182, 246, 1)"} }}
                            label='Prenom'
                            value={prenom}
                            mode='outlined'
                            onChangeText={value => setPrenom(value)}
                        />
                        <TextInput
                            style={{ width: 300, marginBottom: 30 }}
                            theme={{ colors: {primary: "rgba(41, 182, 246, 1)"} }}
                            keyboardType="numeric"
                            label='CIN'
                            value={cin}
                            mode='outlined'
                            render={props =>
                                <TextInputMask
                                    {...props}
                                    mask={"[00000000]"}
                                />
                            }
                            onChangeText={value => setCin(value)}
                        />
                        <TextInput
                            style={{ width: 300, marginBottom: 30 }}
                            theme={{ colors: {primary: "rgba(41, 182, 246, 1)"} }}
                            keyboardType="email-address"
                            label='Email'
                            value={email}
                            mode='outlined'
                            onChangeText={value => setEmail(value)}
                        />
                        <TextInput
                            autoCompleteType="password"
                            theme={{ colors: {primary: "rgba(41, 182, 246, 1)"} }}
                            secureTextEntry={true}
                            style={{ width: 300, marginBottom: 30 }}
                            label='Mot de passe'
                            value={password}
                            mode='outlined'
                            onChangeText={value => setPassword(value)}
                        />
                        <TextInput
                            style={{ width: 300, marginBottom: 30 }}
                            theme={{ colors: {primary: "rgba(41, 182, 246, 1)"} }}
                            autoCompleteType="password"
                            secureTextEntry={true}
                            label='Confirmation du mot de passe'
                            value={confPassword}
                            mode='outlined'
                            onChangeText={value => setConfPassword(value)}
                        />
                        <TextInput
                            keyboardType="phone-pad"
                            theme={{ colors: {primary: "rgba(41, 182, 246, 1)"} }}
                            style={{ width: 300, marginBottom: 30 }}
                            label='Téléphone mobile'
                            value={phoneNumber}
                            mode='outlined'
                            render={props =>
                                <TextInputMask
                                    {...props}
                                    mask={"+216 [00] [000] [000]"}
                                />
                            }
                            onChangeText={value => setPhoneNumber(value)}
                        />
                        <View style={{ width: 300, marginBottom: 20, borderColor: "#7f7f7f", borderWidth: 1, borderRadius: 4 }}>
                            <Picker
                                mode='dialog'
                                selectedValue={gouvernoratValue}
                                style={{ height: 56, width: 300, color: "#7f7f7f" }}
                                onValueChange={(itemValue, itemIndex) => { setGouvernoratValue(itemValue) }}
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
                            theme={{ colors: {primary: "rgba(41, 182, 246, 1)"} }}
                            label='Adresse'
                            value={adresse}
                            mode='outlined'
                            onChangeText={value => setAdresse(value)}
                        />
                        <TextInput
                            style={{ width: 300, marginBottom: 30 }}
                            theme={{ colors: {primary: "rgba(41, 182, 246, 1)"} }}
                            keyboardType="numeric"
                            label='Code Postal'
                            value={codePostal}
                            mode='outlined'
                            render={props =>
                                <TextInputMask
                                    {...props}
                                    mask={"[0000]"}
                                />
                            }
                            onChangeText={(value) => setCodePostal(value)}
                        />
                        <Button dark={true} color="rgba(41, 182, 246, 1)" labelStyle={{ color: "#fff" }} style={{ marginBottom: 50 }} icon="content-save-edit" mode="contained" onPress={() => saveUpdate()}>
                            sauvegarder
                        </Button>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

