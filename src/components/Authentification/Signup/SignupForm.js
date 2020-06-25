import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, Text, FlatList, Picker, TouchableOpacity } from 'react-native';
import { TextInput, Button, RadioButton } from "react-native-paper";
import Tunisia from '../../Common/Tunisia.json'
import TextInputMask from 'react-native-text-input-mask';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Signup, SignupIsSuccess, SignupIsError } from "../../../redux/Action/HomeAction";
import { ShowSnackbarSuccess, ShowSnackbarError } from "../../Common/Snackbar";
import Loader from "../../Common/Loader";

export default function SignupForm(props) {
    const [nom, setNom] = useState()
    const [prenom, setPrenom] = useState()
    const [cin, setCin] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confPassword, setConfPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [gouvernoratValue, setGouvernoratValue] = useState();
    const [delegationValue, setDelegationValue] = useState();
    const [adresse, setAdresse] = useState()
    const [codePostal, setCodePostal] = useState()
    const [delegationList, setDelegationList] = useState();
    const [dateNaissance, setDateNaissance] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [infecté, setInfecté] = useState(false);
    const [role, setRole] = useState("");
    const typeUser = props.route.params.typeUser;
    const signupIsError = useSelector((state) => state.HomeReducer.signupIsError)
    const signupIsSuccess = useSelector((state) => state.HomeReducer.signupIsSuccess)
    const isLoading = useSelector((state) => state.HomeReducer.isLoading)
    const dispatch = useDispatch()
    const scrollRef = useRef()

    useEffect(() => {
        Tunisia.map((gouvernorat) => {
            if (gouvernorat.code == gouvernoratValue) {
                setDelegationList(gouvernorat)
            }
        })
    }, [gouvernoratValue])

    useEffect(() => {
        if (signupIsSuccess) {
            props.navigation.push("Login")
        }
    }, [signupIsSuccess])

    useEffect(() => {
        if (signupIsError) {
            scrollRef.current.scrollToEnd({ animated: true })
        }
    }, [signupIsError])

    const onchangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(false);
        setDateNaissance(moment(currentDate).format('MM/DD/YYYY'));
    }


    const Sinscrire = () => {
        const body = {
            "CIN": cin,
            "Nom": nom,
            "Prenom": prenom,
            "Code_Postal": codePostal,
            "Email": email,
            "Password": password,
            "Nmobile": phoneNumber,
            "State": gouvernoratValue,
            "Delegation": delegationValue,
            "Adresse": adresse,
            "TypeUser": typeUser,
            "DateNaissance": dateNaissance,
            "Infecté": infecté,
            "PosteAutorite": role,
        }
        dispatch(Signup(body))
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            ref={scrollRef}
            keyboardShouldPersistTaps='handled'>
            {isLoading ?
                <Loader />
                : <>
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
                            value={nom}
                            mode='outlined'
                            onChangeText={value => setNom(value)}
                        />
                        <TextInput
                            style={{ width: 300, marginBottom: 30 }}
                            label='Prenom'
                            value={prenom}
                            mode='outlined'
                            onChangeText={value => setPrenom(value)}
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
                            value={email}
                            mode='outlined'
                            onChangeText={value => setEmail(value)}
                        />
                        <TextInput
                            autoCompleteType="password"
                            secureTextEntry={true}
                            style={{ width: 300, marginBottom: 30 }}
                            label='Mot de passe'
                            value={password}
                            mode='outlined'
                            onChangeText={value => setPassword(value)}
                        />
                        <TextInput
                            style={{ width: 300, marginBottom: 30 }}
                            autoCompleteType="password"
                            secureTextEntry={true}
                            label='Confirmation du mot de passe'
                            value={confPassword}
                            mode='outlined'
                            onChangeText={value => setConfPassword(value)}
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
                                style={{ height: 56, width: 300, color: "#7f7f7f" }}
                                onValueChange={(itemValue, itemIndex) => { setGouvernoratValue(itemValue) }}
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
                                style={{ height: 56, width: 300, color: "#7f7f7f" }}
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
                            value={adresse}
                            mode='outlined'
                            onChangeText={value => setAdresse(value)}
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
                        {typeUser == "citoyen" ?
                            <View>
                                <TouchableOpacity
                                    style={{ height: 56, width: 300, marginBottom: 20, borderColor: "#7f7f7f", borderWidth: 1, borderRadius: 4, justifyContent: "center", paddingLeft: 14 }}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    {dateNaissance ? <Text style={{ color: "#7f7f7f", fontSize: 16 }}>{dateNaissance}</Text>
                                        : <Text style={{ color: "#7f7f7f", fontSize: 16 }}>Date de naissance</Text>}
                                </TouchableOpacity>
                                {showDatePicker && <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={0}
                                    value={dateNaissance ? dateNaissance : new Date()}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onchangeDate}
                                />}
                                {/* <Text style={{ color: "#7f7f7f", fontSize: 16 }}>Infecté ?</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 50 }}>
                                    <Text style={{ color: "#7f7f7f", fontSize: 16 }}>Oui</Text>
                                    <RadioButton
                                        color="rgba(41, 182, 246, 1)"
                                        value="oui"
                                        status={infecté ? 'checked' : 'unchecked'}
                                        onPress={() => setInfecté(!infecté)}
                                    />
                                    <Text style={{ color: "#7f7f7f", fontSize: 16 }}>Non</Text>
                                    <RadioButton
                                        color="rgba(41, 182, 246, 1)"
                                        value="non"
                                        status={!infecté ? 'checked' : 'unchecked'}
                                        onPress={() => setInfecté(!infecté)}
                                    />
                                </View> */}
                            </View>
                            :
                            <>
                                <Text style={{ color: "#7f7f7f", fontSize: 16, width: 300, marginBottom: 10 }}>Votre rôle dans  une structure publique ou association :</Text>
                                <TextInput
                                    style={{ width: 300, marginBottom: 50 }}
                                    label='rôle'
                                    value={role}
                                    mode='outlined'
                                    onChangeText={value => setRole(value)}
                                />
                            </>
                        }
                        <Button style={{ width: 250, marginBottom: 50 }} icon="account-plus" mode="contained" onPress={() => Sinscrire()}>
                            S'inscrire
                </Button>
                        <Button style={{ width: 250, marginBottom: 30 }} icon="login" mode="outlined" onPress={() => props.navigation.navigate("Login")}>
                            S'identifier
                </Button>
                    </View>
                </>
            }
            {signupIsError && <ShowSnackbarError message={"Veuillez remplir tous les champs"} />}
            {signupIsSuccess && <ShowSnackbarSuccess message={"le compte a été crée avec succès"} />}
        </ScrollView>
    );
}

