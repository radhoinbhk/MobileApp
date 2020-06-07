import React, { useState, useEffect } from "react";
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Avatar, Card, Title, Paragraph } from "react-native-paper";
import Tunisia from '../../Common/Tunisia.json'
import TextInputMask from 'react-native-text-input-mask';
import { SignupIsSuccess } from "../../../redux/Action/HomeAction";
import { useDispatch } from "react-redux";

export default function Signup(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(SignupIsSuccess(false))
    }, [])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'>
            <View style={{ width: "100%", alignItems: "flex-start", paddingTop: 20, paddingLeft: 10 }}>
                <Button icon="arrow-left-thick" mode="text"
                    onPress={() => props.navigation.goBack()}>
                    Retour
                </Button>
            </View>
            <View style={{ alignItems: "center", height: "100%", justifyContent: "space-evenly" }}>
                <Card style={{ width: "70%", height: "30%" }}>
                    <Card.Content style={{ alignItems: "center", justifyContent: "center", height: "50%" }}>
                        <Title style={{ textAlign: "center", marginBottom: 10 }}>APPEL AUX CITOYENS</Title>
                        <Paragraph style={{ textAlign: "center" }}>Je suis volontaire pour aider</Paragraph>
                        <Paragraph style={{ textAlign: "center" }}>ou</Paragraph>
                        <Paragraph style={{ textAlign: "center" }}>Je suis citoyen recherche d'aide</Paragraph>
                    </Card.Content>
                    <Card.Actions style={{ alignItems: "center", justifyContent: "center", height: "50%" }}>
                        <Button style={{ width: 160 }} icon="check-circle" mode="contained"
                            onPress={() => props.navigation.navigate("SignupForm", {
                                typeUser: "citoyen"
                            })}>Choisir</Button>
                    </Card.Actions>
                </Card>
                <Card style={{ width: "70%", height: "30%" }}>
                    <Card.Content style={{ alignItems: "center", justifyContent: "center", height: "50%", width: "100%" }}>
                        <Title style={{ textAlign: "center", marginBottom: 10 }}>APPEL AUX ORGANISMES</Title>
                        <Paragraph style={{ textAlign: "center" }}>Je suis une structure publique ou association</Paragraph>
                    </Card.Content>
                    <Card.Actions style={{ alignItems: "center", justifyContent: "center", height: "50%" }}>
                        <Button style={{ width: 160 }} icon="check-circle" mode="contained"
                            onPress={() => props.navigation.navigate("SignupForm", {
                                typeUser: "organismes"
                            })}
                        >Choisir</Button>
                    </Card.Actions>
                </Card>
            </View>
        </ScrollView>
    );
}

