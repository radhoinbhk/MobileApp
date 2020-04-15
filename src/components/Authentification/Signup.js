import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, FlatList, Picker } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import Tunisia from '../Common/Tunisia.json'
import TextInputMask from 'react-native-text-input-mask';

export default function Login(props) {
    const [text, setText] = useState("")
    const [codePostal, setCodePostal] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [cin, setCin] = useState()
    const [gouvernoratValue, setGouvernoratValue] = useState();
    const [delegationValue, setDelegationValue] = useState();
    const [delegationList, setDelegationList] = useState();

    useEffect(() => {
        Tunisia.map((gouvernorat) => {
            if (gouvernorat.code == gouvernoratValue) {
                setDelegationList(gouvernorat)
            }
        })
    }, [gouvernoratValue])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'>
            <View style={{ width: "100%", alignItems: "flex-start", paddingTop: 20, paddingLeft: 10 }}>
                <Button icon="arrow-left-thick" mode="text"
                    onPress={() => props.navigation.goBack()}>
                    Retour
                </Button>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                <TextInput
                    style={{ width: 300, marginBottom: 30 }}
                    label='Nom'
                    value={text}
                    mode='outlined'
                    onChangeText={text => setText({ text })}
                />
                <TextInput
                    style={{ width: 300, marginBottom: 30 }}
                    label='Prenom'
                    value={text}
                    mode='outlined'
                    onChangeText={text => setText({ text })}
                />
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
                    style={{ width: 300, marginBottom: 30 }}
                    keyboardType="email-address"
                    label='Email'
                    value={text}
                    mode='outlined'
                    onChangeText={text => setText({ text })}
                />
                <TextInput
                    autoCompleteType="password"
                    secureTextEntry={true}
                    style={{ width: 300, marginBottom: 30 }}
                    label='Mot de passe'
                    value={text}
                    mode='outlined'
                    onChangeText={text => setText({ text })}
                />
                <TextInput
                    style={{ width: 300, marginBottom: 30 }}
                    autoCompleteType="password"
                    secureTextEntry={true}
                    label='Confirmation du mot de passe'
                    value={text}
                    mode='outlined'
                    onChangeText={text => setText({ text })}
                />
                <TextInput
                    keyboardType="phone-pad"
                    style={{ width: 300, marginBottom: 30 }}
                    label='Téléphone mobile'
                    value={phoneNumber}
                    mode='outlined'
                    render={props =>
                        <TextInputMask
                            {...props}
                            mask={"+216 [00] [000] [000]"}
                        />
                    }
                    onChangeText={value => setPhoneNumber(value)}
                />
                <View style={{ width: 300, marginBottom: 20, borderColor: "#7f7f7f", borderWidth: 1, borderRadius: 4 }}>
                    <Picker
                        mode='dialog'
                        selectedValue={gouvernoratValue}
                        style={{ height: 60, width: 300, color: "#7f7f7f" }}
                        onValueChange={(itemValue, itemIndex) => { setGouvernoratValue(itemValue), console.log("GouvernoratitemValue", itemValue) }}
                    >
                        <Picker.Item label="Choisir le Gouvernorat" />
                        {Tunisia.map((gouvernorat, index) =>
                            <Picker.Item key={index} label={gouvernorat.nameFR} value={gouvernorat.code} />
                        )}
                    </Picker>
                </View>
                <View style={{ width: 300, marginBottom: 20, borderColor: "#7f7f7f", borderWidth: 1, borderRadius: 4 }}>
                    <Picker
                        mode='dialog'
                        selectedValue={delegationValue}
                        style={{ height: 60, width: 300, color: "#7f7f7f" }}
                        onValueChange={(itemValue, itemIndex) => setDelegationValue(itemValue)}
                    >
                        <Picker.Item label="Choisir le Délégation" />
                        {delegationList && delegationList.Delegation.map((Delegation, indexDelegation) =>
                            < Picker.Item key={indexDelegation} label={Delegation.nameFR} value={Delegation.code} />
                        )}
                    </Picker>
                </View>
                <TextInput
                    style={{ width: 300, marginBottom: 30 }}
                    label='Adresse'
                    value={text}
                    mode='outlined'
                    onChangeText={text => setText({ text })}
                />
                <TextInput
                    style={{ width: 300, marginBottom: 30 }}
                    keyboardType="numeric"
                    label='Code Postal'
                    value={codePostal}
                    mode='outlined'
                    render={props =>
                        <TextInputMask
                            {...props}
                            mask={"[0000]"}
                        />
                    }
                    onChangeText={(value) => setCodePostal(value)}
                />
                <Button style={{ width: 250, marginBottom: 50 }} icon="login" mode="contained" onPress={() => console.warn('Pressed')}>
                    S'inscrire
                </Button>
                <Button style={{ width: 250, marginBottom: 30 }} icon="account-plus" mode="outlined" onPress={() => console.warn('Pressed')}>
                    S'identifier
                </Button>
            </View>
        </ScrollView>
    );
}

