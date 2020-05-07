import api from '../config/axios';
import { setAlert } from './alert';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_PROFILE
} from './types';
import Cookies from 'universal-cookie';
import setAuthToken from '../utils/setAuthToken';

const cookies = new Cookies();

// Load User
export const loadUser = () => async dispatch => {
    if (cookies.get('token')) {
        setAuthToken(cookies.get('token'));
    }

    try {
        console.log('Loading user...');
        const res = await api.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

// Register User
export const register = ({ username, email, password }) => async dispatch => {
    console.log(username);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, email, password });

    try {
        console.log('Registering a user.');
        const res = await api.post('/api/users', body, config);
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}


// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        console.log('Logging in a user');
        const res = await api.post('/api/auth', body, config);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

       dispatch(loadUser());
    } catch (error) {
        const errors = error?.response?.data?.errors;
        
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
}


// Logout / Clear Profile
export const logout = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};