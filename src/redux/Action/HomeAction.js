import { SET_TOKEN_USER, IS_LOADING, STACK_IS_LOADING, SIGNIN_IS_ERROR, SIGNUP_IS_ERROR, SIGNUP_IS_SUCCESS } from './Type'
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