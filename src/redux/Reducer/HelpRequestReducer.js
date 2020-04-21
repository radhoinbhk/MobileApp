import { ADD_DEMADE_ISERROR, ADD_DEMADE_ISSUCCESS, ADD_DEMADE_IS_LOADING, SET_ALL_DEMANDE, SET_ALL_REPONSE, SAVE_NEW_REPONSE } from '../Action/Type';

const initialState = {
    addDemandeIsError: false,
    addDemandeIsSuccess: false,
    isLoading: false,
    allDemande: [],
    allReponse: []
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
        default:
            return state
    }
}

