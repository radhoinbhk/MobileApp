import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, RefreshControl, SafeAreaView } from 'react-native';
import Header from "../Common/Header";
import { Card, Avatar, IconButton, Subheading, Caption } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { GetAllDemande } from "../../redux/Action/HelpRequestAction";
import Loader from "../Common/Loader";
import Tunisia from '../Common/Tunisia.json'

export default function HelpRequestList(props) {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);
    const isLoading = useSelector((state) => state.HelpRequestReducer.isLoading);
    const myDemande = useSelector((state) => state.HelpRequestReducer.myDemande);
    const userData = useSelector((state) => state.HomeReducer.userData);

    useEffect(() => {
        dispatch(GetAllDemande())
    }, [])

    useEffect(() => {
        if (!isLoading) {
            setRefreshing(false);
        }
    }, [isLoading])

    const getState = (code) => {
        if (Tunisia[code.substring(0, 2) - 1]) {
            return Tunisia[code.substring(0, 2) - 1].nameFR
        }
    }

    const getDelegation = (code) => {
        if (Tunisia[code.substring(0, 2) - 1].Delegation[code.substring(2, code.length) - 1]) {
            return Tunisia[code.substring(0, 2) - 1].Delegation[code.substring(2, code.length) - 1].nameFR
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(GetAllDemande())
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={props.navigation} screenTitel="Mes demandes" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                keyboardShouldPersistTaps='handled'>
                {isLoading ?
                    <Loader />
                    : <View>
                        {myDemande.map((demande, index) =>
                            demande.idUser == userData._id &&
                            <Card key={index} style={{ backgroundColor: "#fff", marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                                <View style={{ padding: 20 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Avatar.Icon size={40} icon="bullhorn-outline" color="#fff" style={{backgroundColor:"rgba(41, 182, 246, 1)"}} />
                                        <View style={{ width: "70%", marginLeft: 20 }}>
                                            <Subheading>{demande.Titre}</Subheading>
                                            <Caption>{demande.Description}</Caption>
                                        </View>
                                        <IconButton
                                            icon="clipboard-text-play-outline"
                                            color="rgba(41, 182, 246, 1)"
                                            size={30}
                                            onPress={() => props.navigation.navigate("HelpRequestDetails", { "demande": demande, "myHelpRequest": true })}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Avatar.Icon size={30} icon="map-marker" style={{ backgroundColor: "#fff" }} />
                                        <Text style={{ color: "rgba(0,0,0,.54)" }}>{getState(demande.State)} {getDelegation(demande.Delegation)} {demande.Adresse}</Text>
                                    </View>
                                </View>
                            </Card>
                        )}
                    </View>}
            </ScrollView >
        </SafeAreaView>
    );
}

