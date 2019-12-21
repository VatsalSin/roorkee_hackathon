    
import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import AuthReducer from './authReducer';
import UserReducer from './userReducer';
import ErrorReducer from './errorReducer';
import AdminReducer from './adminReducer';

export default combineReducers({
  form: FormReducer,
  auth: AuthReducer,
  user: UserReducer,
  error: ErrorReducer,
  admin: AdminReducer
});