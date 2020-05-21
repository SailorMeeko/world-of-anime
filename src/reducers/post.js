import {
    CREATE_POST,
    POST_ERROR,
    GET_POSTS
} from '../actions/types';

const initialState = {
    posts: []
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
            }

        case CREATE_POST:
            return {
                ...state,
                posts: [payload, ...state.posts]
            }            

        case POST_ERROR:
            return {
                ...state,
                posts: []
            }

        default:
            return state;
    }
}