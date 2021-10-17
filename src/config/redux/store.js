import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import hargaPerikananReducer from './reducer/hargaPerikanan/hargaPerikananReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const middleware = [thunk, logger];
const rootReducer = combineReducers({ hargaPerikananReducer })
const Store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)));


export default Store;