import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
} from "./types";

import Axios from "axios";
import { returnErrors } from "./errorActions";

import { serverUrl } from '../../helper/url';

export const signIn = (data) => {
  let {email, password} = data;
  return async (dispatch) => {
    dispatch({
        type: USER_LOADING
    });
    if(email === "admin@gmail.com" && password == 123456){
      
      setTimeout(function(){
        let user = {
          name: "Admin",
          phone: "9999999999",
          email
        }
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { token: "vg3f3tft43t4ct", user: user, status: 200 }
        });
      }, 1000)
    } else {
      setTimeout(function(){
        dispatch(
            returnErrors("Wrong Credentials", 404, "LOGIN_FAIL")
        );
        dispatch({ type: LOGIN_FAIL });
      }, 1000)
    }
    
  }
}

export const signOut = () => {
  return (dispatch) => {
    setTimeout(function(){
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: {}
      })
    }, 500)
    
  }
}

export const openLoginModal = () => dispatch => {
  dispatch({ type: OPEN_LOGIN_MODAL });
};

export const closeLoginModal = () => dispatch => {
  dispatch({ type: CLOSE_LOGIN_MODAL });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config.headers["authorization"] = token;
  }
  return config;
}