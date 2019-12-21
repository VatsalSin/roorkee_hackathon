import { 
    ADMIN_PAGE_LOADING,  
    GET_ALL_ROADS,
    GET_ALL_ROADS_FAIL,
} from '../actions/types';

import Axios from "axios";
import { returnErrors } from "./errorActions";
import { tokenConfig } from './authActions';
import { serverUrl } from '../../helper/url';

export const getAllRoads = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: ADMIN_PAGE_LOADING
            });
            const res = await Axios.get(`${serverUrl}/admins/pools`, tokenConfig(getState));
            dispatch({
                type: GET_ALL_ROADS,
                payload: { roads: res.data.roads, status: res.status }
            });
        } catch (err) {
            dispatch(
                returnErrors(err.response.data.message, err.response.status, "GET_ALL_ROADS_FAIL")
            );
            dispatch({ type: GET_ALL_ROADS_FAIL });
        }
    }
}