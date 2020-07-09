import React from "react";
import { Dialog, Paragraph, Button, Avatar, Title, IconButton } from "react-native-paper";
import { View, Text } from "react-native";
import Tunisia from '../Common/Tunisia.json'
import { Linking } from 'react-native'

export default function UserDetails(props) {

    const getState = (code) => {
        return Tunisia[code.substring(0, 2) - 1].nameFR
    }

    const getDelegation = (code) => {
        return Tunisia[code.substring(0, 2) - 1].Delegation[code.substring(2, code.length) - 1].nameFR
    }

    return (
        <Dialog
            visible={props.userDetailVisible}
            style={{ padding: 30 }}
            onDismiss={() => props.hideDialog()}>
            {props.userDetail &&
                <View style={{ alignItems: "center" }}>
                    <Avatar.Text style={{ position: "absolute", top: -70, backgroundColor: "rgba(41, 182, 246, 1)" }} size={80} label={props.userDetail.Nom[0]} color="#fff" />
                    <Title style={{ marginTop: 30 }}>{props.userDetail.Nom} {props.userDetail.Prenom}</Title>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Avatar.Icon size={30} icon="map-marker" style={{ backgroundColor: "#fff" }} />
                        <Text style={{ color: "rgba(0,0,0,.54)" }}>{getState(props.userDetail.State)} {getDelegation(props.userDetail.Delegation)} {props.userDetail.Adresse}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Avatar.Icon size={30} icon="email" style={{ backgroundColor: "#fff" }} />
                        <Text style={{ color: "rgba(0,0,0,.54)" }}>{props.userDetail.Email}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Avatar.Icon size={30} icon="phone" style={{ backgroundColor: "#fff" }} />
                        <Text style={{ color: "rgba(0,0,0,.54)" }}>{props.userDetail.Nmobile}</Text>
                    </View>
                    <Dialog.Actions >
                        <IconButton
                            icon="phone-outgoing"
                            color="#fff"
                            style={{ backgroundColor: "#86DBD4", marginRight: 30 }}
                            size={30}
                            onPress={() => Linking.openURL(`tel:${props.userDetail.Nmobile}`)}
                        />
                        <IconButton
                            icon="window-close"
                            color="#fff"
                            style={{ backgroundColor: "rgb(227, 108, 141)", marginRight: 30, marginTop: 90 }}
                            size={30}
                            onPress={() => props.hideDialog()}
                        />
                        <IconButton
                            icon="android-messages"
                            color="#fff"
                            style={{ backgroundColor: "#F6D37B" }}
                            size={30}
                            onPress={() => console.log('Pressed')}
                        />
                    </Dialog.Actions>
                </View>
            }
        </Dialog>
    );
}