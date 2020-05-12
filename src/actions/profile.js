import api from '../config/axios';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE
} from './types';

// Get profile by username
export const getProfileByUsername = username => async dispatch => {
    try {
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
export const updateProfile = (formData, profile_pic_url, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (profile_pic_url) {
            formData = {...formData, profile_pic_url}
        }
        const res = await api.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        return { profileUpdated: true };
    } catch (error) {
        const errors = error?.response?.data?.errors;

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.data.msg, status: error.response.status }
        });

        return { profileUpdated: false, errors };
    }
}