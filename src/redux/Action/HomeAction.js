import { SAVE_CAS_RETABLIS, SAVE_NOMBRE_DECES, SAVE_CAS_CONFIRMES, SET_TOKEN_USER, IS_LOADING, STACK_IS_LOADING, SIGNIN_IS_ERROR, SIGNUP_IS_ERROR, SIGNUP_IS_SUCCESS, EVOLUTION_DES_CAS, STATIQUE_PAR_GOUVERNORAT, PERSONNE_RETABLIES, PERSONNE_DECES } from './Type'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import url from '../../config/url';
import moment from 'moment';

export function SetUserData(isSignedIn, userData, userToken) {
    return {
        type: SET_TOKEN_USER,
        isSignedIn: isSignedIn,
        userData: userData,
        userToken: userToken
    }
}

export function StackIsLoading(bool) {
    return {
        type: STACK_IS_LOADING,
        stackIsLoading: bool
    }
}

export function IsLoading(bool) {
    return {
        type: IS_LOADING,
        isLoading: bool
    }
}

export function SigninIsError(bool) {
    return {
        type: SIGNIN_IS_ERROR,
        signinIsError: bool
    }
}

export function SignupIsSuccess(bool) {
    return {
        type: SIGNUP_IS_SUCCESS,
        signupIsSuccess: bool
    }
}

export function SignupIsError(bool) {
    return {
        type: SIGNUP_IS_ERROR,
        signupIsError: bool
    }
}

function saveCasRetablis(data) {
    return {
        type: SAVE_CAS_RETABLIS,
        saveCasRetablis: data
    }
}

function saveNombreDeces(data) {
    return {
        type: SAVE_NOMBRE_DECES,
        saveNombreDeces: data
    }
}

function saveCasConfirmes(data) {
    return {
        type: SAVE_CAS_CONFIRMES,
        saveCasConfirmes: data
    }
}

function statistiqueParGouvernorat(data) {
    return {
        type: STATIQUE_PAR_GOUVERNORAT,
        statistiqueParGouvernorat: data
    }
}

function SetEvolutionDesCas(data) {
    return {
        type: EVOLUTION_DES_CAS,
        evolutionDesCas: data
    }
}

function SetPersonneRetablies(data) {
    return {
        type: PERSONNE_RETABLIES,
        personneRetablies: data
    }
}

function SetPersonneDeces(data) {
    return {
        type: PERSONNE_DECES,
        personneDeces: data
    }
}

async function setResData(resData) {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(resData))
    } catch (e) {
        // saving error
        console.warn("e", e);
    }
}

export function getStatistiCovid() {
    return (dispatch) => {
        dispatch(IsLoading(true))
        Axios.get(url.covidApi.CasRetablis)
            .then(function (response) {
                dispatch(saveCasRetablis(response.data.features[0].attributes.value))
            })
            .catch(function (error) {
                dispatch(IsLoading(false))
                console.warn("error", error);
            }).then(
                Axios.get(url.covidApi.NombreDeces)
                    .then(function (response) {
                        dispatch(saveNombreDeces(response.data.features[0].attributes.value))
                    })
                    .catch(function (error) {
                        dispatch(IsLoading(false))
                        console.warn("error", error);
                    }).then(
                        Axios.get(url.covidApi.CasConfirmes)
                            .then(function (response) {
                                dispatch(saveCasConfirmes(response.data.features[0].attributes.value))
                            })
                            .catch(function (error) {
                                dispatch(IsLoading(false))
                                console.warn("error", error);
                            }).then(
                                Axios.get(url.covidApi.NbrConfirmParGouvernorat)
                                    .then(function (response) {
                                        dispatch(statistiqueParGouvernorat(response.data.features))
                                    })
                                    .catch(function (error) {
                                        dispatch(IsLoading(false))
                                        console.warn("error", error);
                                    }).then(
                                        Axios.get(url.covidApi.EvolutionDesCas)
                                            .then(function (response) {
                                                const array = [];
                                                const personneRetablies = [];
                                                const personneDeces = [];
                                                response.data.features.map((data) => {
                                                    if (data.attributes.Total_Confirmed !== null) {
                                                        array.push({ x: data.attributes.Dates, y: data.attributes.Total_Confirmed, marker: `date: ${moment.unix(data.attributes.Dates / 1000).format('DD/MM')} \n Cas Confirmés: ${data.attributes.Total_Confirmed}` })
                                                    }
                                                    if (data.attributes.Retablis !== null) {
                                                        personneRetablies.push({ x: data.attributes.Dates, y: data.attributes.Retablis, marker: `date: ${moment.unix(data.attributes.Dates / 1000).format('DD/MM')} \n personnes rétablies: ${data.attributes.Retablis}` })
                                                    }
                                                    if (data.attributes.Décès !== null) {
                                                        personneDeces.push({ x: data.attributes.Dates, y: data.attributes.Décès, marker: `date: ${moment.unix(data.attributes.Dates / 1000).format('DD/MM')} \n Nombre de décès: ${data.attributes.Décès}` })
                                                    }
                                                })
                                                dispatch(SetEvolutionDesCas(array))
                                                dispatch(SetPersonneRetablies(personneRetablies))
                                                dispatch(SetPersonneDeces(personneDeces))
                                                dispatch(IsLoading(false))
                                            })
                                            .catch(function (error) {
                                                dispatch(IsLoading(false))
                                                console.warn("error", error);
                                            })
                                    )
                                    .catch(function (error) {
                                        dispatch(IsLoading(false))
                                        console.warn("error", error);
                                    })
                            )
                            .catch(function (error) {
                                dispatch(IsLoading(false))
                                console.warn("error", error);
                            })
                    )
                    .catch(function (error) {
                        dispatch(IsLoading(false))
                        console.warn("error", error);
                    })
            )
            .catch(function (error) {
                dispatch(IsLoading(false))
                console.warn("error", error);
            })
    }

}
export function Signin(CIN, password) {

    return (dispatch) => {
        dispatch(SigninIsError(false))
        dispatch(IsLoading(true))
        /**
         * rederige to Home if API return error that is a problem
         */
        const body = {
            "CIN": CIN,
            "Password": password
        }
        Axios.post("http://192.168.1.20:3000/user/signin", body)
            .then(function (response) {
                let resData = response.data
                // handle success
                setResData(resData)
                dispatch(SetUserData(resData.success, resData.user, resData.token))
                dispatch(IsLoading(false))
            })
            .catch(function (error) {
                // handle error
                dispatch(SigninIsError(true))
                console.warn("error", error);
                dispatch(IsLoading(false))
            })
    }
}

export function Signup(body) {
    return (dispatch) => {
        dispatch(SignupIsSuccess(false))
        dispatch(SignupIsError(false))
        dispatch(IsLoading(true))
        /**
         * rederige to Home if API return error that is a problem
         */
        Axios.post("http://192.168.1.20:3000/user/signup", body)
            .then(function (response) {
                // handle success
                dispatch(SignupIsSuccess(true))
                dispatch(IsLoading(false))
            })
            .catch(function (error) {
                // handle error
                dispatch(SignupIsError(true))
                console.warn("error", error);
                dispatch(IsLoading(false))
            })
    }
}