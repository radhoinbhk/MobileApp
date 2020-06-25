import {
    SET_ASSOCIATION_LIST,
    ADD_NEW_DEMANDE,
    ADD_DEMADE_ISSUCCESS,
    ADD_DEMADE_IS_LOADING,
    ADD_DEMADE_ISERROR,
    SET_ALL_DEMANDE,
    SET_ALL_REPONSE,
    SAVE_NEW_REPONSE,
    DEMANDE_FILTER,
    USER_JOIN_ISERROR,
    USER_JOIN_ISSUCCESS,
    SET_DEMANDE_WITH_USER_JOIN,
    SET_MY_DEMANDE
} from './Type'
import Axios from 'axios'

export function AddDemandeIsError(bool) {
    return {
        type: ADD_DEMADE_ISERROR,
        addDemandeIsError: bool
    }
}

export function DemandeFilter(filter) {
    return {
        type: DEMANDE_FILTER,
        demandeFilter: filter
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

export function SetMyDemande(demandes) {
    return {
        type: SET_MY_DEMANDE,
        myDemande: demandes
    }
}

export function SetAllDemande(demandes) {
    return {
        type: SET_ALL_DEMANDE,
        allDemande: demandes
    }
}

export function SetDemandeWithUserJoin(demandeWithUserJoin) {
    return {
        type: SET_DEMANDE_WITH_USER_JOIN,
        demandeWithUserJoin: demandeWithUserJoin
    }
}

export function AddNewDemande(demande) {
    return {
        type: ADD_NEW_DEMANDE,
        addNewDemande: demande
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

export function SetAssociationList(list) {
    return {
        type: SET_ASSOCIATION_LIST,
        setAssociationList: list
    }
}

export function UserJoinIsSuccess(bool) {
    return {
        type: USER_JOIN_ISSUCCESS,
        userJoinIsSuccess: bool
    }
}

export function UserJoinIsError(bool) {
    return {
        type: USER_JOIN_ISERROR,
        userJoinIsError: bool
    }
}

export function addStatusUserJoin(body) {
    return (dispatch) => {
        dispatch(IsLoading(true))
        /**
         * rederige to Home if API return error that is a problem
         */
        Axios.post("http://192.168.0.89:3000/demande/addStatusUserJoin", body)
            .then(function (response) {
                // handle success
                Axios.post("http://192.168.0.89:3000/demande/getDemandeWithFilter", { "_id": idDemande })
                    .then(function (response) {
                        // handle success
                        dispatch(SetDemandeWithUserJoin(response.data[0]))
                        dispatch(IsLoading(false))
                    })
                    .catch(function (error) {
                        // handle error
                        dispatch(IsLoading(false))
                    })
            })
            .catch(function (error) {
                // handle error
                dispatch(IsLoading(false))
            })
    }
}

export function getAssociation(filter) {
    return (dispatch) => {
        /**
         * rederige to Home if API return error that is a problem
         */
        Axios.get(`http://192.168.0.89:3000/user/getAssociation/${filter}`)
            .then(function (response) {
                // handle success
                dispatch(SetAssociationList(response.data))
            })
            .catch(function (error) {
                // handle error
                console.warn("error", error);
            })
    }
}

export function AddUserJoin(body) {
    return (dispatch) => {
        dispatch(IsLoading(true))
        /**
         * rederige to Home if API return error that is a problem
         */
        Axios.post("http://192.168.0.89:3000/demande/userJoin", body)
            .then(function (response) {
                // handle success
                dispatch(UserJoinIsSuccess(true))
                dispatch(IsLoading(false))
            })
            .catch(function (error) {
                // handle error
                dispatch(userJoinIsError(true))
                dispatch(IsLoading(false))
            })
    }
}

export function GetAllUserJoin(body) {
    return (dispatch) => {
        dispatch(IsLoading(true))
        /**
         * rederige to Home if API return error that is a problem
         */
        Axios.post("http://192.168.0.89:3000/demande/getDemandeWithFilter", body)
            .then(function (response) {
                // handle success
                dispatch(SetDemandeWithUserJoin(response.data[0]))
                dispatch(IsLoading(false))
            })
            .catch(function (error) {
                // handle error
                console.warn("error", error);
                dispatch(IsLoading(false))
            })
    }
}

export function GetAllDemande() {
    return (dispatch) => {
        dispatch(IsLoading(true))
        /**
         * rederige to Home if API return error that is a problem
         */
        Axios.post("http://192.168.0.89:3000/demande/getDemandeWithFilter", {})
            .then(function (response) {
                // handle success
                dispatch(SetMyDemande(response.data))
                dispatch(IsLoading(false))
            })
            .catch(function (error) {
                // handle error
                console.warn("error", error);
                dispatch(IsLoading(false))
            })
    }
}

export function GetAllDemandeWithFilter(body) {
    return (dispatch) => {
        dispatch(IsLoading(true))
        /**
         * rederige to Home if API return error that is a problem
         */
        Axios.post("http://192.168.0.89:3000/demande/getDemandeWithFilter", body)
            .then(function (response) {
                // handle success
                dispatch(DemandeFilter(body))
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
        Axios.post("http://192.168.0.89:3000/demande/addDemande", body)
            .then(function (response) {
                // handle success
                dispatch(AddNewDemande(body))
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

        Axios.post("http://192.168.0.89:3000/reponse/getAllReponseWithFilter", filter)
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

export function AddReponse(data) {
    const body = {
        "descriptionReponse": data.descriptionReponse,
        "dateReponse": data.dateReponse,
        "idDemande": data.idDemande,
        "idUser": data.idUser._id,
    }
    return (dispatch) => {
        dispatch(IsLoading(true))

        Axios.post("http://192.168.0.89:3000/reponse/addReponse", body)
            .then(function (response) {
                // handle success
                dispatch(SaveNewReponse(data))
                dispatch(IsLoading(false))
            })
            .catch(function (error) {
                // handle error
                console.warn("error", error);
                dispatch(IsLoading(false))
            })
    }
}