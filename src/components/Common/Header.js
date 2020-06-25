import React from 'react'
import { IconButton, Button, Appbar, Title } from 'react-native-paper';
import { View, Text } from 'react-native';
import { useSelector } from "react-redux";


export default function Header(props) {
    const isSignedIn = useSelector((state) => state.HomeReducer.isSignedIn)
    const helpRList = props.screenTitel == "Liste des demandes d'aide"
    return (
        <View style={{ width: "100%" }}>
            {!isSignedIn ?
                <View style={{ paddingTop: 30, paddingLeft: 10 }}>
                    <Button mode="contained" style={{ width: 170 }} onPress={() => props.navigation.navigate('Login')}>
                        connecter
                    </Button>
                </View>
                :
                <Appbar style={{ backgroundColor: "rgba(41, 182, 246, 0.6)", color: "#fff" }}>
                    {props.outSideDrawer ?
                        <IconButton
                            icon="arrow-left"
                            size={30}
                            style={{ marginLeft: 0 }}
                            onPress={() => props.navigation.goBack()}
                            color="#fff"
                        />
                        : <IconButton
                            icon="menu"
                            style={{ marginLeft: 0 }}
                            size={30}
                            onPress={() => props.navigation.openDrawer()}
                            color="#fff"
                        />}
                    <View style={[{ width: "80%", alignItems: "center" }, helpRList && { width:"75%" }]}>
                        <Title style={{ color: "#fff" }}>{props.screenTitel}</Title>

                    </View>
                    {helpRList &&
                        <IconButton
                            icon="filter-outline"
                            size={30}
                            onPress={() => props.onPressFilter()}
                            color="#fff"
                        />}
                </Appbar>
            }
        </View>
    );
}