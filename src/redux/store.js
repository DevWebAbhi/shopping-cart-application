import {combineReducers,legacy_createStore,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import { productsReducer } from "./reducers/productsReducer";

const reducers = combineReducers({
    productsReducer
});

export const store = legacy_createStore(reducers,applyMiddleware(thunk));