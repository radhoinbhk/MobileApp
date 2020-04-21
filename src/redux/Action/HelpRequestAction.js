import { ADD_DEMADE_ISSUCCESS, ADD_DEMADE_IS_LOADING, ADD_DEMADE_ISERROR, SET_ALL_DEMANDE, SET_ALL_REPONSE, SAVE_NEW_REPONSE } from './Type'
import Axios from 'axios'

export function AddDemandeIsError(bool) {
    return {
        type: ADD_DEMADE_ISERROR,
        addDemandeIsError: bool
    }
}

export function AddDemandeIsSuccess(bool) {
    return {
        type: ADD_DEMADE_ISSUCCESS,
        addDemandeIsSuccess: bool
    }
}

export function IsLoading(bool) {
    return {
        type: ADD_DEMADE_IS_LOADING,
        isLoading: bool
    }
}

export function SetAllDemande(demandes) {
    return {
        type: SET_ALL_DEMANDE,
        allDemande: demandes
    }
}

export function SetAllReponse(reponse) {
    return {
        type: SET_ALL_REPONSE,
        allReponse: reponse
    }
}

export function SaveNewReponse(reponse) {
    return {
        type: SAVE_NEW_REPONSE,
        saveNewReponse: reponse
    }
}


export function GetAllDemande() {

    return (dispatch) => {
        dispatch(IsLoading(true))
        /**
         * rederige to Home if API return error that is a problem
         */
        Axios.get("http://192.168.1.20:3000/demande/getAllDemande")
            .then(function (response) {
                // handle success
                dispatch(SetAllDemande(response.data))
                dispatch(IsLoading(false))
            })
            .catch(function (error) {
                // handle error
                console.warn("error", error);
                dispatch(IsLoading(false))
            })
    }
}

export function AddDemande(body) {
    return (dispatch) => {
        dispatch(AddDemandeIsSuccess(false))
        dispatch(AddDemandeIsError(false))
        dispatch(IsLoading(true))
        /**
         * rederige to Home if API return error that is a problem
         */
        Axios.post("http://192.168.1.20:3000/demande/addDemande", body)
            .then(function (response) {
                // handle success
                dispatch(SetAllDemande(response.data))
                dispatch(AddDemandeIsSuccess(true))
                dispatch(IsLoading(false))
            })
            .catch(function (error) {
                // handle error
                dispatch(AddDemandeIsError(true))
                console.warn("error", error);
                dispatch(IsLoading(false))
            })
    }
}

export function GetAllReponse(filter) {

    return (dispatch) => {
        dispatch(IsLoading(true))

        Axios.post("http://192.168.1.20:3000/reponse/getAllReponseWithFilter", filter)
            .then(function (response) {
                // handle success
                dispatch(SetAllReponse(response.data))
                dispatch(IsLoading(false))
            })
            .catch(function (error) {
                // handle error
                console.warn("error", error);
                dispatch(IsLoading(false))
            })
    }
}

export function AddReponse(body) {
    return (dispatch) => {
        dispatch(IsLoading(true))

        Axios.post("http://192.168.1.20:3000/reponse/addReponse", body)
            .then(function (response) {
                // handle success
                dispatch(SaveNewReponse(body))
                dispatch(IsLoading(false))
            })
            .catch(function (error) {
                // handle error
                console.warn("error", error);
                dispatch(IsLoading(false))
            })
    }
}