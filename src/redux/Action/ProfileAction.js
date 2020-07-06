import { SET_TOKEN_USER, UPDATE_IS_LOADING, UPDATE_IS_SUCCESS, UPDATE_IS_ERROR } from "./Type"
import Axios from "axios"
import { useSelector } from "react-redux"
import AsyncStorage from "@react-native-community/async-storage"
import { SetUserData } from "./HomeAction"

export function UpdateIsLoading(bool) {
    return {
        type: UPDATE_IS_LOADING,
        updateIsLoading: bool
    }
}

export function UpdateIsSuccess(bool) {
    return {
        type: UPDATE_IS_SUCCESS,
        updateIsSuccess: bool
    }
}

export function UpdateIsError(bool) {
    return {
        type: UPDATE_IS_ERROR,
        updateIsError: bool
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

export function SetUpdate(isSignedIn, userToken, body) {
    return (dispatch) => {
        dispatch(UpdateIsSuccess(false))
        dispatch(UpdateIsError(false))
        dispatch(UpdateIsLoading(true))
        /**
         * rederige to Home if API return error that is a problem
         */
        Axios.post("http://192.168.20.126:3000/user/updateUser", body)
            .then(function (response) {
                // handle success
                dispatch(UpdateIsSuccess(true))
            })
            .catch(function (error) {
                // handle error
                dispatch(UpdateIsError(true))
                console.warn("error1", error);
                dispatch(UpdateIsLoading(false))
            }).then(
                Axios.post("http://192.168.20.126:3000/user/getUserWithFilter", { "CIN": body.CIN })
                    .then(function (res) {
                        const userData = {
                            "success": isSignedIn,
                            "token": userToken,
                            "user": res.data
                        }
                        setResData(userData)
                        dispatch(SetUserData(isSignedIn, res.data, userToken))
                        dispatch(UpdateIsLoading(false))
                    })
                    .catch(function (error) {
                        // handle error
                        dispatch(UpdateIsError(true))
                        console.warn("error2", error);
                        dispatch(UpdateIsLoading(false))
                    })
            )
            .catch(function (error) {
                dispatch(UpdateIsLoading(false))
                console.warn("error3", error);
            })

    }
}