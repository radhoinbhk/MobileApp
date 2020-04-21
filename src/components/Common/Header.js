import React from 'react'
import { IconButton, Button, Appbar, Title } from 'react-native-paper';
import { View, Text } from 'react-native';
import { useSelector } from "react-redux";


export default function Header(props) {
    const isSignedIn = useSelector((state) => state.HomeReducer.isSignedIn)
    return (
        <View style={{ width: "100%" }}>
            {!isSignedIn ?
                <View style={{ paddingTop: 30, paddingLeft: 10 }}>
                    <Button mode="contained" style={{ width: 170 }} onPress={() => props.navigation.navigate('Login')}>
                        connecter
                    </Button>
                </View>
                :
                <Appbar style={{ backgroundColor: "#fff", color: "#6200ee" }}>
                    {props.outSideDrawer ?
                        <IconButton
                            icon="arrow-left"
                            size={30}
                            onPress={() => props.navigation.goBack()}
                            color="#6200ee"
                        />
                        : <IconButton
                            icon="menu"
                            size={30}
                            onPress={() => props.navigation.openDrawer()}
                            color="#6200ee"
                        />}
                    <View style={{ width: "80%", alignItems: "center" }}>
                        <Title style={{ color: "#6200ee" }}>{props.screenTitel}</Title>
                    </View>
                </Appbar>
            }
        </View>
    );
}