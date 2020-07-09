import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Picker, SafeAreaView, ScrollView } from "react-native";
import { Button, Avatar, Title, IconButton, Card, Subheading, ThemeProvider, Searchbar, Menu, Divider, Provider, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Tunisia from '../Common/Tunisia.json'
import DomainAction from '../Common/DomainAction.json'
import { GetAllDemandeWithFilter } from "../../redux/Action/HelpRequestAction";

export default function FilterHelpRequest(props) {
    const [filter, setFilter] = useState("Tous");
    const [gouvernoratValue, setGouvernoratValue] = useState();
    const [delegationValue, setDelegationValue] = useState();
    const [delegationList, setDelegationList] = useState();
    const [domainAction, setDomainAction] = useState();
    const userData = useSelector((state) => state.HomeReducer.userData);
    const dispatch = useDispatch()

    useEffect(() => {
        Tunisia.map((gouvernorat) => {
            if (gouvernorat.code == gouvernoratValue) {
                setDelegationList(gouvernorat)
            }
        })
    }, [gouvernoratValue])

    const showFilter = () => {
        var body
        switch (filter) {
            case "Région":
                body = {
                    "State": gouvernoratValue,
                    "Delegation": delegationValue
                }
                break;
            case "Domaine d'action":
                body = {
                    "Domaine_action": domainAction
                }
                break;
            case "J'ai participé":
                body = {
                    "userJoin": userData._id
                }
                break;
            default:
                body = {}
                break;
        }
        dispatch(GetAllDemandeWithFilter(body))
        props.hideDialog()
    }

    const FilterCard = (props) => {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Card style={{ width: "90%", backgroundColor: props.color, borderRadius: 20, padding: 30 }}>
                    <Title style={{ color: "#fff" }}>{filter} :</Title>
                    <Text style={{ color: "#fff" }}>{props.text}</Text>
                    <View style={{ justifyContent: "center" }}>
                        {filter == "Région" &&
                            <>
                                <View style={{ width: 300, marginBottom: 20, borderColor: "#fff", borderWidth: 1, borderRadius: 4, marginTop: 20 }}>
                                    <Picker
                                        mode='dialog'
                                        selectedValue={gouvernoratValue}
                                        style={{ height: 56, width: 300, color: "#fff" }}
                                        onValueChange={(itemValue, itemIndex) => setGouvernoratValue(itemValue)}
                                    >
                                        <Picker.Item label="Choisir le Gouvernorat" />
                                        {Tunisia.map((gouvernorat, index) =>
                                            <Picker.Item key={index} label={gouvernorat.nameFR} value={gouvernorat.code} />
                                        )}
                                    </Picker>
                                </View>
                                <View style={{ width: 300, marginBottom: 20, borderColor: "#fff", borderWidth: 1, borderRadius: 4 }}>
                                    <Picker
                                        mode='dialog'
                                        selectedValue={delegationValue}
                                        style={{ height: 56, width: 300, color: "#fff" }}
                                        onValueChange={(itemValue, itemIndex) => setDelegationValue(itemValue)}
                                    >
                                        <Picker.Item label="Choisir le Délégation" />
                                        {delegationList && delegationList.Delegation.map((Delegation, indexDelegation) =>
                                            < Picker.Item key={indexDelegation} label={Delegation.nameFR} value={Delegation.code} />
                                        )}
                                    </Picker>
                                </View>
                            </>}
                        {filter == "Domaine d'action" &&
                            <View style={{ width: 300, marginBottom: 20, borderColor: "#fff", borderWidth: 1, borderRadius: 4, marginTop: 20 }}>
                                <Picker
                                    mode='dialog'
                                    selectedValue={domainAction}
                                    style={{ height: 56, width: 300, color: "#fff" }}
                                    onValueChange={(itemValue, itemIndex) => setDomainAction(itemValue)}
                                >
                                    <Picker.Item label="Choisir un domaine d'action" />
                                    {DomainAction.map((value, index) =>
                                        <Picker.Item key={index} label={value.DAFR} value={value.DAFR} />
                                    )}
                                </Picker>
                            </View>
                        }
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Button onPress={() => showFilter()} icon="check-bold" mode="outlined" color={props.color} style={{ marginTop: 30, width: 200, backgroundColor: "#fff" }} >
                            Afficher
                        </Button>
                    </View>
                </Card>
            </View>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1, position: "absolute", left: 0, right: 0, bottom: 0, top: 0, backgroundColor: "#fff" }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
                keyboardShouldPersistTaps='handled'>
                <IconButton
                    icon="close-circle-outline"
                    color="#E62923"
                    size={30}
                    onPress={() => props.hideDialog()}
                />
                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", marginBottom: 30, marginTop: 30 }}>
                    <Card style={{ backgroundColor: "#86DBD4", width: 180, height: 100, borderRadius: 20, marginRight: 20 }}>
                        <TouchableOpacity style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center" }} onPress={() => setFilter("Tous")}>
                            <Avatar.Icon size={50} color="#fff" style={{ backgroundColor: "#86DBD4", height: 40 }} icon="check-all" />
                            <Subheading style={{ color: "#fff" }}>Tous</Subheading>
                        </TouchableOpacity>
                    </Card>
                    <Card style={{ backgroundColor: "#E36C8D", width: 180, height: 100, borderRadius: 20 }}>
                        <TouchableOpacity style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center" }} onPress={() => setFilter("Région")}>
                            <Avatar.Icon size={50} color="#fff" style={{ backgroundColor: "#E36C8D", height: 40 }} icon="home-city" />
                            <Subheading style={{ color: "#fff" }}>Région</Subheading>
                        </TouchableOpacity>
                    </Card>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", flexWrap: "wrap", marginBottom: 40 }}>
                    <Card style={{ backgroundColor: "#F6D37B", width: 180, height: 100, borderRadius: 20, marginRight: 20 }}>
                        <TouchableOpacity style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center" }} onPress={() => setFilter("Domaine d'action")}>
                            <Avatar.Icon size={50} color="#fff" style={{ backgroundColor: "#F6D37B", height: 40 }} icon="charity" />
                            <Subheading style={{ color: "#fff" }}>Domaine d'action</Subheading>
                        </TouchableOpacity>
                    </Card>
                    <Card style={{ backgroundColor: "rgb(133, 133, 133)", width: 180, height: 100, borderRadius: 20 }}>
                        <TouchableOpacity style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center" }} onPress={() => setFilter("J'ai participé")}>
                            <Avatar.Icon size={50} color="#fff" style={{ backgroundColor: "rgb(133, 133, 133)", height: 40 }} icon="account-group" />
                            <Subheading style={{ color: "#fff" }}>J'ai participé</Subheading>
                        </TouchableOpacity>
                    </Card>
                </View>
                <View style={{ justifyContent: "center" }}>
                    {filter == "J'ai participé" ?
                        <FilterCard color="rgb(133, 133, 133)" text="Trouver une mission que j'ai participé" />
                        : filter == "Domaine d'action" ?
                            <FilterCard color="#F6D37B" text="Trouver une mission à travers les domaines d'action" />
                            : filter == "Région" ?
                                <FilterCard color="#E36C8D" text="Trouver une mission dans votre Région" />
                                : <FilterCard color="#86DBD4" text="Afficher tous les missions" />
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}