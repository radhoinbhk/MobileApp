import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import HomeReducer from './Reducer/HomeReducer'
import HelpRequestReducer from './Reducer/HelpRequestReducer'

export default createStore(
    combineReducers({
        HomeReducer,
        HelpRequestReducer
    }),
    {},
    applyMiddleware(thunk)

);
