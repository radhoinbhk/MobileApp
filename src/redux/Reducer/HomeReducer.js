import { SET_TOKEN_USER, IS_LOADING, STACK_IS_LOADING } from '../Action/Type';

const initialState = {
    isSignedIn: false,
    userData: {},
    userToken: "",
    isLoading: false,
    stackIsLoading: false
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
        default:
            return state
    }
}

