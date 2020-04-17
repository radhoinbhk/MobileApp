import { SET_TOKEN_USER, IS_LOADING, STACK_IS_LOADING, SIGNIN_IS_ERROR, SIGNUP_IS_ERROR, SIGNUP_IS_SUCCESS } from '../Action/Type';

const initialState = {
    isSignedIn: false,
    userData: {},
    userToken: "",
    isLoading: false,
    stackIsLoading: false,
    signinIsError: false,
    signupIsError: false,
    signupIsSuccess: false
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
        default:
            return state
    }
}

