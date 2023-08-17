// store.js
import { legacy_createStore as  createStore, combineReducers } from 'redux';
import Loginreducer from '../Services/Reducers/Loginreducer';

const rootReducer = combineReducers({
  auth: Loginreducer,
});

const store = createStore(rootReducer);

export default store;
