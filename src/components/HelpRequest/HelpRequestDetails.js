import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, RefreshControl, SafeAreaView, Keyboard } from 'react-native';
import Header from "../Common/Header";
import { Card, Avatar, IconButton, Subheading, Caption, Title, Headline, Divider, TextInput, Appbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDemande, AddReponse, GetAllReponse } from "../../redux/Action/HelpRequestAction";
import Loader from "../Common/Loader";
import Tunisia from '../Common/Tunisia.json'
import moment from "moment";

export default function HelpRequestDetails(props) {
    const dispatch = useDispatch()

    const [reponse, setReponse] = useState("");
    const userData = useSelector((state) => state.HomeReducer.userData);
    const allReponse = useSelector((state) => state.HelpRequestReducer.allReponse);
    const isLoading = useSelector((state) => state.HelpRequestReducer.isLoading);

    const demande = props.route.params.demande

    useEffect(() => {
        const body = {
            "filter": { "idDemande": demande._id }
        }
        dispatch(GetAllReponse(body))
    }, [demande])

    const getState = (code) => {
        return Tunisia[code.substring(0, 2) - 1].nameFR
    }

    const getDelegation = (code) => {
        return Tunisia[code.substring(0, 2) - 1].Delegation[code.substring(2, code.length) - 1].nameFR
    }

    const saveReponse = () => {
        const body = {
            "descriptionReponse": reponse,
            "dateReponse": moment().format(),
            "idDemande": demande._id,
            "idUser": userData._id,
        }
        dispatch(AddReponse(body))
        Keyboard.dismiss()
        setReponse("")
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={props.navigation} outSideDrawer={true} screenTitel="détail de la demande d'aide" />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
                // refreshControl={
                //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                keyboardShouldPersistTaps='handled'>
                {isLoading ?
                    <Loader />
                    : <View style={{ flex: 1 }} >
                        <Card style={{ padding: 20, marginBottom: 10, marginLeft: 10, marginRight: 10 }}>
                            <View style={{ alignItems: "center", marginBottom: 20 }}>
                                <Avatar.Icon size={70} icon="bullhorn-outline" />
                                <Title>{demande.Titre}</Title>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Avatar.Icon size={30} icon="map-marker" style={{ backgroundColor: "#fff" }} />
                                    <Text style={{ color: "rgba(0,0,0,.54)" }}>{getState(demande.State)} {getDelegation(demande.Delegation)} {demande.Adresse}</Text>
                                </View>
                            </View>
                            <Divider style={{ marginBottom: 20 }} />
                            <View style={{ marginBottom: 20 }}>
                                <Subheading>OBJECTIF DE LA MISSION :</Subheading>
                                <Text>{demande.Objectif}</Text>
                            </View>
                            <Divider style={{ marginBottom: 20 }} />
                            <View style={{ marginBottom: 20 }}>
                                <Subheading>DESCRIPTION DE LA MISSION :</Subheading>
                                <Text>{demande.Description}</Text>
                            </View>
                        </Card>
                        {allReponse.map((reponse, index) =>
                            <Card key={index} style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                                <View style={{ padding: 20 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Avatar.Text size={40} label={demande.Titre[0]} />
                                        <View style={{ width: "70%", marginLeft: 20 }}>
                                            <Subheading>User name</Subheading>
                                            <Caption>{reponse.descriptionReponse}</Caption>
                                        </View>
                                        <IconButton
                                            icon="account-badge-horizontal-outline"
                                            color="#6200ee"
                                            size={30}
                                        // onPress={() => props.navigation.navigate("HelpRequestDetails", { "demande": demande })}
                                        />
                                    </View>
                                </View>
                            </Card>
                        )}
                    </View>}
            </ScrollView>
            <Appbar style={{
                position: 'absolute',
                backgroundColor: "#fff",
                left: 0,
                right: 0,
                bottom: 0,
                height: 90,
                paddingLeft: 20,
                paddingRight: 20
            }}>
                <TextInput
                    style={{ width: "87%" }}
                    mode="outlined"
                    label='Écrire une réponse'
                    value={reponse}
                    onChangeText={(value) => setReponse(value)}
                />
                <IconButton
                    icon="send"
                    color="#6200ee"
                    size={30}
                    onPress={() => saveReponse()}
                />
            </Appbar>
        </SafeAreaView>
    );
}