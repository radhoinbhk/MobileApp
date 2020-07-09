import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import HomeReducer from './Reducer/HomeReducer'
import HelpRequestReducer from './Reducer/HelpRequestReducer'
import ProfileReducer from './Reducer/ProfileReducer'

export default createStore(
    combineReducers({
        HomeReducer,
        HelpRequestReducer,
        ProfileReducer
    }),
    {},
    applyMiddleware(thunk)

);
