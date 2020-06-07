import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, RefreshControl, SafeAreaView } from 'react-native';
import Header from "../Common/Header";
import { Card, Avatar, IconButton, Subheading, Caption, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUserJoin } from "../../redux/Action/HelpRequestAction";
import Loader from "../Common/Loader";
import Tunisia from '../Common/Tunisia.json'
import FilterHelpRequest from "./FilterHelpRequest";
import UserDetails from "./UserDetails";

export default function PersonnesPartcipant(props) {
    const idDemande = props.route.params.idDemande
    const dispatch = useDispatch()

    const [userDetailVisible, setUserDetailVisible] = useState(false);
    const [userDetail, setUserDetail] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const isLoading = useSelector((state) => state.HelpRequestReducer.isLoading);
    const demandeWithUserJoin = useSelector((state) => state.HelpRequestReducer.demandeWithUserJoin);

    useEffect(() => {
        dispatch(GetAllUserJoin({ "_id": idDemande }))
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

    const visibelDialog = (user) => {
        setUserDetailVisible(true)
        setUserDetail(user)
    }

    // const AcceptUserJoin = () => {
    // }

    const isExist = (idUserJoin) => {
        const result
        demandeWithUserJoin.userJoinWithStatus.map((value) => {
            if (value.idUserJoin == idUserJoin) {
                result = value
            }
        })
        return result
    }
    const onRefresh = () => {
        setRefreshing(true);
        dispatch(GetAllUserJoin({ "_id": idDemande }))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header navigation={props.navigation} outSideDrawer={true} screenTitel="Les personnes participant" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                keyboardShouldPersistTaps='handled'>
                {isLoading ?
                    <Loader />
                    : <View>
                        {demandeWithUserJoin.userJoin && demandeWithUserJoin.userJoin.map((user, index) =>
                            <Card key={index} style={{ backgroundColor: "#fff", marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                                <View style={{ padding: 20 }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Avatar.Icon size={40} icon="account" />
                                        <View style={{ width: "70%", marginLeft: 20 }}>
                                            <Subheading>{user.Nom} {user.Prenom}</Subheading>
                                            <Caption>{user.Nmobile}</Caption>
                                        </View>
                                        <IconButton
                                            icon="account-badge-horizontal-outline"
                                            color="#6200ee"
                                            size={30}
                                            onPress={() => visibelDialog(user)}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Avatar.Icon size={30} icon="map-marker" style={{ backgroundColor: "#fff" }} />
                                        <Text style={{ color: "rgba(0,0,0,.54)" }}>{getState(user.State)} {getDelegation(user.Delegation)} {user.Adresse}</Text>
                                    </View>
                                    {isExist(user._id) && <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>
                                        <Button color="#53AE63" icon="account-check" mode="outlined" onPress={() => AcceptUserJoin()}>
                                            Accepter
                                        </Button>
                                        <Button color="#D6483E" icon="account-minus" mode="outlined" onPress={() => console.log('Pressed')}>
                                            refuser
                                        </Button>
                                    </View>}
                                </View>
                            </Card>
                        )}
                    </View>}
            </ScrollView >
            <UserDetails userDetail={userDetail} userDetailVisible={userDetailVisible} hideDialog={() => setUserDetailVisible(false)} />
        </SafeAreaView>
    );
}