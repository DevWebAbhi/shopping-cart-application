import {combineReducers,legacy_createStore,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import { productsReducer } from "./reducers/productsReducer";
import { cartReducer } from "./reducers/cartReducers";

const reducers = combineReducers({
    productsReducer,cartReducer
});

export const store = legacy_createStore(reducers,applyMiddleware(thunk));