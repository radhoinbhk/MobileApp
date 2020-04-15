import { SET_TOKEN_USER, IS_LOADING, STACK_IS_LOADING } from './Type'
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

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

async function setResData(resData) {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(resData))
    } catch (e) {
        // saving error
        console.warn("e", e);
    }
}

export function Signin(CIN, password) {

    return (dispatch) => {
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
                console.warn("error", error);
                dispatch(IsLoading(false))
            })
    }
}