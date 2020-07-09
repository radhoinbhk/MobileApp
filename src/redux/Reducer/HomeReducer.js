import { SET_TOKEN_USER, IS_LOADING, STACK_IS_LOADING, SIGNIN_IS_ERROR, SIGNUP_IS_ERROR, SIGNUP_IS_SUCCESS, SAVE_CAS_CONFIRMES, SAVE_NOMBRE_DECES, SAVE_CAS_RETABLIS, STATIQUE_PAR_GOUVERNORAT, EVOLUTION_DES_CAS, PERSONNE_RETABLIES, PERSONNE_DECES } from '../Action/Type';

const initialState = {
    isSignedIn: false,
    userData: {},
    userToken: "",
    isLoading: false,
    stackIsLoading: false,
    signinIsError: false,
    signupIsError: false,
    signupIsSuccess: false,
    saveCasConfirmes: 0,
    saveCasRetablis: 0,
    saveNombreDeces: 0,
    statistiqueParGouvernorat: [],
    evolutionDesCas: [],
    personneRetablies: [],
    personneDeces: []
}
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_TOKEN_USER:
            return {
                ...state,
                isSignedIn: action.isSignedIn,
                userData: action.userData,
                userToken: action.userToken
            };
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case STACK_IS_LOADING:
            return {
                ...state,
                stackIsLoading: action.stackIsLoading
            };
        case SIGNIN_IS_ERROR:
            return {
                ...state,
                signinIsError: action.signinIsError
            };
        case SIGNUP_IS_ERROR:
            return {
                ...state,
                signupIsError: action.signupIsError
            };
        case SIGNUP_IS_SUCCESS:
            return {
                ...state,
                signupIsSuccess: action.signupIsSuccess
            };
        case SAVE_CAS_CONFIRMES:
            return {
                ...state,
                saveCasConfirmes: action.saveCasConfirmes
            };
        case SAVE_NOMBRE_DECES:
            return {
                ...state,
                saveNombreDeces: action.saveNombreDeces
            };
        case SAVE_CAS_RETABLIS:
            return {
                ...state,
                saveCasRetablis: action.saveCasRetablis
            };
        case STATIQUE_PAR_GOUVERNORAT:
            return {
                ...state,
                statistiqueParGouvernorat: action.statistiqueParGouvernorat
            };
        case EVOLUTION_DES_CAS:
            return {
                ...state,
                evolutionDesCas: action.evolutionDesCas
            };
        case PERSONNE_RETABLIES:
            return {
                ...state,
                personneRetablies: action.personneRetablies
            };
        case PERSONNE_DECES:
            return {
                ...state,
                personneDeces: action.personneDeces
            };
        default:
            return state
    }
}

