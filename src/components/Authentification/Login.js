import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from 'react-native';
import { TextInput, Button, IconButton } from "react-native-paper";
import TextInputMask from "react-native-text-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { Signin } from '../../redux/Action/HomeAction'
import Loader from "../Common/Loader";

function Login(props) {
    const [cin, setCin] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.HomeReducer.isLoading)
    const isSignedIn = useSelector((state) => state.HomeReducer.isSignedIn)

    const authentification = () => {
        dispatch(Signin(cin, password))
    }

    useEffect(() => {
        if (isSignedIn) {
            console.warn("isSignedIn",isSignedIn);
            props.navigation.push('Home')
        }
    }, [isSignedIn])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
            {isLoading ?
                <Loader />
                : <View>
                    <Button icon="arrow-left-thick" mode="text"
                        onPress={() => props.navigation.goBack()}
                        style={{ marginLeft: 30, marginTop: 30, position: "absolute" }}>
                        Home
                    </Button>
                    {/* <IconButton
                icon="arrow-left-thick"
                size={25}
                onPress={() => props.navigation.goBack()}
                color="#fff"
                style={{ marginLeft: 30, marginTop: 30, position: "absolute", backgroundColor: "#6200ee" }}
            /> */}
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30, height: "85%" }}>
                        <TextInput
                            style={{ width: 300, marginBottom: 30 }}
                            keyboardType="numeric"
                            label='CIN'
                            value={cin}
                            mode='outlined'
                            render={props =>
                                <TextInputMask
                                    {...props}
                                    mask={"[00000000]"}
                                />
                            }
                            onChangeText={value => setCin(value)}
                        />
                        <TextInput
                            style={{ width: 300, marginBottom: 20 }}
                            label='Mot de passe'
                            autoCompleteType="password"
                            secureTextEntry={true}
                            value={password}
                            mode='outlined'
                            onChangeText={value => setPassword(value)}
                        />
                        <View style={{ width: 300, alignItems: "flex-end", marginBottom: 40 }}>
                            <Text>Mot de passe perdu ?</Text>
                        </View>
                        <Button style={{ width: 250 }} icon="login" mode="contained" onPress={() => authentification()}>
                            S'identifier
                </Button>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Button style={{ width: 250 }} icon="account-plus" mode="outlined" onPress={() => props.navigation.navigate("Signup")}>
                            S'inscrire
                </Button>
                    </View>
                </View>
            }
        </ScrollView>
    );
}

export default Login