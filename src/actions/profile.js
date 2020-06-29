import api from '../config/axios';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    SEARCH_MEMBERS
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
            payload: { msg: error }
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
            payload: { msg: error }
        });
    }
}


// Update profile
export const updateProfile = (formData, profile_pic, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (profile_pic) {
            formData = {...formData, profile_pic}
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
            payload: { msg: error }
        });

        return { profileUpdated: false, errors };
    }
}


// Search members
export const searchForMembers = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await api.post('/api/profile/search', formData, config);

        dispatch({
            type: SEARCH_MEMBERS,
            payload: res.data
        });

        return res.data;
    } catch (error) {
        const errors = error?.response?.data?.errors;

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error }
        });

        return { profileUpdated: false, errors };
    }
}