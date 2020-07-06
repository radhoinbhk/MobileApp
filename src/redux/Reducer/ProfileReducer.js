import { UPDATE_IS_LOADING, UPDATE_IS_SUCCESS, UPDATE_IS_ERROR } from '../Action/Type';

const initialState = {
    updateIsLoading: false,
    updateIsSuccess: false,
    updateIsError:false
}
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_IS_LOADING:
            return {
                ...state,
                updateIsLoading: action.updateIsLoading
            };
        case UPDATE_IS_SUCCESS:
            return {
                ...state,
                updateIsSuccess: action.updateIsSuccess
            };
        case UPDATE_IS_ERROR:
            return {
                ...state,
                updateIsError: action.updateIsError
            };
        default:
            return state
    }
}

