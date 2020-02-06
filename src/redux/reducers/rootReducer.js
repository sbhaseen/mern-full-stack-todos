import { combineReducers } from 'redux';
import authReducer from './authReducer';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  items: itemReducer,
  auth: authReducer,
  error: errorReducer
});
