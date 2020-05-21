import api from '../config/axios';

import {
    CREATE_POST,
    POST_ERROR,
    GET_POSTS
} from './types';

// Create new post to a user profile
export const createPostToUserProfile = (formData, profileId) => async dispatch => {
    try {
        formData = {...formData, profileId};
        const res = await api.post(`/api/posts`, formData);
 
        dispatch({
            type: CREATE_POST,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error }
        });
    }
}

// Get posts from a user profile
export const getUserProfilePosts = profileId => async dispatch => {
    try {
        const res = await api.get(`/api/posts/profile/${profileId}`);

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: error.response.data.msg, status: error.response.status }
        });
    }

}