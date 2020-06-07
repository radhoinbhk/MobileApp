import { ADD_DEMADE_ISERROR, ADD_DEMADE_ISSUCCESS, ADD_DEMADE_IS_LOADING, SET_ALL_DEMANDE, SET_ALL_REPONSE, SAVE_NEW_REPONSE, ADD_NEW_DEMANDE, DEMANDE_FILTER, SET_ASSOCIATION_LIST, USER_JOIN_ISSUCCESS, USER_JOIN_ISERROR, SET_DEMANDE_WITH_USER_JOIN } from '../Action/Type';

const initialState = {
    addDemandeIsError: false,
    addDemandeIsSuccess: false,
    isLoading: false,
    allDemande: [],
    allReponse: [],
    demandeFilter: {},
    setAssociationList: [],
    userJoinIsError: false,
    userJoinIsSuccess: false,
    demandeWithUserJoin: {}
}
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_DEMADE_ISERROR:
            return {
                ...state,
                addDemandeIsError: action.addDemandeIsError
            };
        case ADD_DEMADE_ISSUCCESS:
            return {
                ...state,
                addDemandeIsSuccess: action.addDemandeIsSuccess
            };
        case ADD_DEMADE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case SET_ALL_DEMANDE:
            return {
                ...state,
                allDemande: action.allDemande
            };
        case ADD_NEW_DEMANDE:
            return {
                ...state,
                allDemande: [...state.allDemande, action.addNewDemande]
            };
        case SET_ALL_REPONSE:
            return {
                ...state,
                allReponse: action.allReponse
            };
        case SAVE_NEW_REPONSE:
            return {
                ...state,
                allReponse: [...state.allReponse, action.saveNewReponse]
            };
        case DEMANDE_FILTER:
            return {
                ...state,
                demandeFilter: action.demandeFilter
            };
        case SET_ASSOCIATION_LIST:
            return {
                ...state,
                setAssociationList: action.setAssociationList
            };
        case USER_JOIN_ISSUCCESS:
            return {
                ...state,
                userJoinIsSuccess: action.userJoinIsSuccess
            };
        case USER_JOIN_ISERROR:
            return {
                ...state,
                userJoinIsError: action.userJoinIsError
            };
        case SET_DEMANDE_WITH_USER_JOIN:
            return {
                ...state,
                demandeWithUserJoin: action.demandeWithUserJoin
            };
        default:
            return state
    }
}

