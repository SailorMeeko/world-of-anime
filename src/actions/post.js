import api from '../config/axios';

import {
    CREATE_POST,
    CREATE_REPLY,
    POST_ERROR,
    GET_POSTS,
    CLEAR_POSTS,
    GET_POST
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

        return { commentId: res.data._id };
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error }
        });
    }
}

// Reply to a post
export const createReplyToPost = (formData, postId) => async dispatch => {
    try {
        formData = { text: formData.replyText };
        const res = await api.post(`/api/posts/comment/${postId}`, formData);

        return { newPost: res.data }
        
        dispatch({
            type: CREATE_REPLY,
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
export const getUserProfilePosts = (profileId, page = 1) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_POSTS
        });
        const res = await api.get(`/api/posts/profile/${profileId}?page=${page}`);

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

// Get post from id
export const getSinglePost = postId => async dispatch => {
    try {
        dispatch({
            type: CLEAR_POSTS
        });
        
        const res = await api.get(`/api/posts/${postId}`);

        console.log('Received ', res.data);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error }
        });
    }
}