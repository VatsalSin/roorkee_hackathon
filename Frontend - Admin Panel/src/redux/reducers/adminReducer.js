import { 
    ADMIN_PAGE_LOADING,  
    GET_ALL_ROADS,
    GET_ALL_ROADS_FAIL
} from '../actions/types';

const DEFAULT_STATE={
    roads: null,
    status: null,
    loading: false
}

export default (state=DEFAULT_STATE,action)=>{
    switch(action.type) {
        case ADMIN_PAGE_LOADING:
            return {
                ...state, 
                loading: true
            }
        case GET_ALL_ROADS:
            return {
                ...state, 
                loading: false,
                roads: action.payload.roads,
                status: action.payload.status
            }
        case GET_ALL_ROADS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}