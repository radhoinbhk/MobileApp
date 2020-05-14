import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Picker, SafeAreaView, ScrollView } from "react-native";
import { Button, Avatar, Title, IconButton, Card, Subheading, ThemeProvider, Searchbar, Menu, Divider, Provider, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Tunisia from '../Common/Tunisia.json'
import DomainAction from '../Common/DomainAction.json'
import { GetAllDemandeWithFilter, getAssociation } from "../../redux/Action/HelpRequestAction";

export default function FilterHelpRequest(props) {
    const [filter, setFilter] = useState("Tous");
    const [gouvernoratValue, setGouvernoratValue] = useState();
    const [delegationValue, setDelegationValue] = useState();
    const [delegationList, setDelegationList] = useState();
    const [domainAction, setDomainAction] = useState();
    const [searchAssociation, setSearchAssociation] = useState();
    const associationList = useSelector((state) => state.HelpRequestReducer.setAssociationList);
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
            case "Domaine d'action":
                break;
            default:
                body = {}
                break;
        }
        dispatch(GetAllDemandeWithFilter(body))
        props.hideDialog()
    }

    const onChangeSearch = (value) => {
        setSearchAssociation(value)
        dispatch(getAssociation(value))
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
                        {filter == "Association" &&
                            <View style={{ width: 300, marginBottom: 20, borderColor: "#fff", borderWidth: 1, borderRadius: 4, marginTop: 20 }}>
                                <Searchbar
                                    placeholder="Search"
                                    iconColor={props.color}
                                    onChangeText={onChangeSearch}
                                    value={searchAssociation}
                                />
                                {associationList && associationList.map((value, index) =>
                                    <List.Item key={index} style={{ backgroundColor: "#fff" }} title={value.Nom} />
                                )}
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
                    <Card style={{ backgroundColor: "#e37280", width: 180, height: 100, borderRadius: 20, marginRight: 20 }}>
                        <TouchableOpacity style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center" }} onPress={() => setFilter("Tous")}>
                            <Avatar.Icon size={50} color="#fff" style={{ backgroundColor: "#e37280", height: 40 }} icon="check-all" />
                            <Subheading style={{ color: "#fff" }}>Tous</Subheading>
                        </TouchableOpacity>
                    </Card>
                    <Card style={{ backgroundColor: "#73ccdb", width: 180, height: 100, borderRadius: 20 }}>
                        <TouchableOpacity style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center" }} onPress={() => setFilter("Région")}>
                            <Avatar.Icon size={50} color="#fff" style={{ backgroundColor: "#73ccdb", height: 40 }} icon="home-city" />
                            <Subheading style={{ color: "#fff" }}>Région</Subheading>
                        </TouchableOpacity>
                    </Card>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", flexWrap: "wrap", marginBottom: 40 }}>
                    <Card style={{ backgroundColor: "#524fdd", width: 180, height: 100, borderRadius: 20, marginRight: 20 }}>
                        <TouchableOpacity style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center" }} onPress={() => setFilter("Domaine d'action")}>
                            <Avatar.Icon size={50} color="#fff" style={{ backgroundColor: "#524fdd", height: 40 }} icon="charity" />
                            <Subheading style={{ color: "#fff" }}>Domaine d'action</Subheading>
                        </TouchableOpacity>
                    </Card>
                    <Card style={{ backgroundColor: "#e58f3e", width: 180, height: 100, borderRadius: 20 }}>
                        <TouchableOpacity style={{ width: 180, height: 100, justifyContent: "center", alignItems: "center" }} onPress={() => setFilter("Association")}>
                            <Avatar.Icon size={50} color="#fff" style={{ backgroundColor: "#e58f3e", height: 40 }} icon="account-group" />
                            <Subheading style={{ color: "#fff" }}>Association</Subheading>
                        </TouchableOpacity>
                    </Card>
                </View>
                <View style={{ justifyContent: "center" }}>
                    {filter == "Association" ?
                        <FilterCard color="#e58f3e" text="Trouver une mission à travers une association" />
                        : filter == "Domaine d'action" ?
                            <FilterCard color="#524fdd" text="Trouver une mission à travers les domaines d'action" />
                            : filter == "Région" ?
                                <FilterCard color="#73ccdb" text="Trouver une mission dans votre Région" />
                                : <FilterCard color="#e37280" text="Afficher tous les missions" />
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}