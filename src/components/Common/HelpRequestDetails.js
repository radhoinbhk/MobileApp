import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, RefreshControl, SafeAreaView, Keyboard } from 'react-native';
import Header from "./Header";
import { Card, Avatar, IconButton, Subheading, Caption, Title, Headline, Divider, TextInput, Appbar, Button, TouchableRipple, Badge } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AddReponse, GetAllReponse, AddUserJoin, UserJoinIsSuccess } from "../../redux/Action/HelpRequestAction";
import Loader from "./Loader";
import Tunisia from './Tunisia.json'
import moment from "moment";
import UserDetails from "./UserDetails";

export default function HelpRequestDetails(props) {
    const demande = props.route.params.demande
    const myHelpRequest = props.route.params.myHelpRequest
    const dispatch = useDispatch()

    const [reponse, setReponse] = useState("");
    const [userDetailVisible, setUserDetailVisible] = useState(false);
    const [userDetail, setUserDetail] = useState();
    const [sumUserJoin, setSumUserJoin] = useState(demande.userJoin && demande.userJoin.length);
    const userData = useSelector((state) => state.HomeReducer.userData);
    const allReponse = useSelector((state) => state.HelpRequestReducer.allReponse);
    const isLoading = useSelector((state) => state.HelpRequestReducer.isLoading);
    const userJoinIsSuccess = useSelector((state) => state.HelpRequestReducer.userJoinIsSuccess);
    const userIsJoin = demande.userJoin.find(idUser => idUser == userData._id)

    useEffect(() => {
        const body = {
            "filter": { "idDemande": demande._id }
        }
        const userIsJoin = demande.userJoin.find(idUser => idUser == userData._id)
        dispatch(UserJoinIsSuccess(userIsJoin != undefined))
        dispatch(GetAllReponse(body))
    }, [demande])

    useEffect(() => {
        if (userJoinIsSuccess && userIsJoin == undefined) {
            setSumUserJoin(sumUserJoin + 1)
        }
    }, [userJoinIsSuccess])

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
            "idUser": userData,
        }
        dispatch(AddReponse(body))
        Keyboard.dismiss()
        setReponse("")
    }

    const visibelDialog = (user) => {
        setUserDetailVisible(true)
        setUserDetail(user)
    }

    const OnPreesRejoindre = () => {
        const body = {
            "idDemande": demande._id,
            "userJoin": userData._id
        }
        dispatch(AddUserJoin(body))
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={props.navigation} outSideDrawer={true} screenTitel="Détail de la demande" />
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
                                <Text style={{ position: "absolute", top: 0, left: "55%", zIndex: 1, backgroundColor: "rgb(227, 108, 141)", color: "#fff", paddingLeft: 6, paddingRight: 6, borderRadius: 50 }}>{sumUserJoin}</Text>
                                <Avatar.Icon size={70} icon="bullhorn-outline" color="#fff" style={{backgroundColor:"rgba(41, 182, 246, 1)"}}/>
                                <Title style={{textAlign:"center"}}>{demande.Titre}</Title>
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
                            <View style={{ marginBottom: 30 }}>
                                <Subheading>DESCRIPTION DE LA MISSION :</Subheading>
                                <Text>{demande.Description}</Text>
                            </View>
                            <Divider style={{ marginBottom: 20 }} />
                            <View style={{ marginBottom: 20, flexDirection: "row" }}>
                                <Subheading>NOMBRE MAXIMUM DE BÉNÉVOLE :</Subheading>
                                <Text style={{ marginLeft: 15, backgroundColor: "rgba(41, 182, 246, 1)", color: "#fff", width: 30, height: 30, lineHeight: 25, textAlign: "center", borderRadius: 50 }}>23</Text>
                            </View>
                            <Divider style={{ marginBottom: 20 }} />
                            <View style={{ marginBottom: 40 }}>
                                <Subheading>ÉTAT DE LA DEMANDE :</Subheading>
                                {/* <Text style={{ marginTop: 20, borderColor: "#E75131", color: "#E75131", borderWidth: 1, textAlign: "center", padding: 5, width: 150, borderRadius: 20, marginLeft: "auto", marginRight: "auto" }}>FERMÉE</Text> */}
                                {sumUserJoin == 0
                                    ? <Text style={{ marginTop: 20, borderColor: "rgb(227, 108, 141)", color: "rgb(227, 108, 141)", borderWidth: 1, textAlign: "center", padding: 5, width: 150, borderRadius: 20, marginLeft: "auto", marginRight: "auto" }}>EN ATTENTE</Text>
                                    : <Text style={{ marginTop: 20, borderColor: "rgba(41, 182, 246, 1)", color: "rgba(41, 182, 246, 1)", borderWidth: 1, textAlign: "center", padding: 5, width: 150, borderRadius: 20, marginLeft: "auto", marginRight: "auto" }}>EN COURS</Text>}
                            </View>
                            {!userJoinIsSuccess && !myHelpRequest && <View style={{ width: "100%", alignItems: "center" }}>
                                <Button dark={true} icon="account-multiple-plus" color="rgba(41, 182, 246, 1)" style={{ width: 200 }} mode="contained" onPress={() => OnPreesRejoindre()}>
                                    Rejoindre
                                </Button>
                            </View>}
                            {myHelpRequest && <View style={{ alignItems: "center" }}>
                                <Button dark={true} color="rgba(41, 182, 246, 1)" icon="account-group" color="rgba(41, 182, 246, 1)" labelStyle={{color:"#fff"}} mode="contained" onPress={() => props.navigation.navigate("PersonneParticipant", { "idDemande": demande._id })}>
                                    Les personnes participants
                                </Button>
                            </View>}
                        </Card>
                        {allReponse.map((reponse, index) =>
                            <Card key={index} style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                                <View style={{ padding: 20 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Avatar.Text size={40} label={reponse.idUser.Nom[0]} color="#fff" style={{backgroundColor:"rgba(41, 182, 246, 1)"}} />
                                        <View style={{ width: "70%", marginLeft: 20 }}>
                                            <Subheading>{reponse.idUser.Nom} {reponse.idUser.Prenom}</Subheading>
                                            <Caption>{reponse.descriptionReponse}</Caption>
                                        </View>
                                        <IconButton
                                            icon="account-badge-horizontal-outline"
                                            color="rgba(41, 182, 246, 1)"
                                            size={30}
                                            onPress={() => visibelDialog(reponse.idUser)}
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
                    color="rgba(41, 182, 246, 1)"
                    size={30}
                    onPress={() => saveReponse()}
                />
            </Appbar>
            <UserDetails userDetail={userDetail} userDetailVisible={userDetailVisible} hideDialog={() => setUserDetailVisible(false)} />
        </SafeAreaView >
    );
}