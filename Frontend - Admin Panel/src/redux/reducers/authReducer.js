import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    AUTH_ERROR,
    OPEN_LOGIN_MODAL,
    CLOSE_LOGIN_MODAL,
  } from "../actions/types";

const DEFAULT_STATE={
    isAuthenticated: false,
    isLoading: false,
    token: '',
    user: null,
    openloginModal: false
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state, 
                isAuthenticated: false,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state, 
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('JWT_TOKEN', action.payload.token);
            localStorage.setItem('USER', JSON.stringify(action.payload.user));
            return {
                ...state, 
                isAuthenticated: true, 
                isLoading: false,
                token: action.payload.token, 
                user: action.payload.user, 
                openloginModal: false
            }
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
            localStorage.removeItem("JWT_TOKEN");
            localStorage.removeItem("USER");
            return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            user: null
            };
        case OPEN_LOGIN_MODAL:
            return {
            ...state,
            openloginModal: true,
            openregisterModal: false
            };
        case CLOSE_LOGIN_MODAL:
            return {
            ...state,
            openloginModal: false
            };
        default:
            return state;
    }
}