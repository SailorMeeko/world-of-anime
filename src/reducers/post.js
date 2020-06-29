import {
    CREATE_POST,
    CREATE_REPLY,
    POST_ERROR,
    GET_POST,
    GET_POSTS,
    CLEAR_POSTS
} from '../actions/types';

const initialState = {
    posts: []
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
        case GET_POST:
            return {
                ...state,
                posts: payload,
            }

        case CREATE_POST:
            return {
                ...state,
                posts: [payload, ...state.posts]
            }

        case CREATE_REPLY:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload._id ? { ...post, comments: payload.comments } : post),
            }

        case POST_ERROR:
        case CLEAR_POSTS:
            return {
                ...state,
                posts: []
            }

        default:
            return state;
    }
}