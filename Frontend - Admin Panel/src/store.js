import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './redux/reducers';

const JWT_TOKEN=localStorage.getItem('JWT_TOKEN');
const USER=JSON.parse(localStorage.getItem('USER'));

const initialState = { auth: {
        token: JWT_TOKEN,
        isAuthenticated: JWT_TOKEN ? true : false,
        user: USER
    }
};
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)));

export default store;