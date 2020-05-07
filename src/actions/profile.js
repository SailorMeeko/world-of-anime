import api from '../config/axios';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE
} from './types';

// Get profile by username
export const getProfileByUsername = username => async dispatch => {
    try {
        console.log('Trying to get the profile of ', username);
        const res = await api.get(`/api/profile/${username}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        });
    }
}


// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        console.log('Getting currently logged in user profile');
        const res = await api.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({ type: CLEAR_PROFILE });
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        });
    }
}


// Update profile
export const updateProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        console.log('Updating a profile');
        const res = await api.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        const errors = error.response.data.errors;
        
        if (errors) {
            // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        });
    }
}