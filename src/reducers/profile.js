import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    SEARCH_MEMBERS
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    posts: [],
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }

        case GET_PROFILES:
        case SEARCH_MEMBERS:
            return {
                ...state,
                profiles: payload,
                loading: false
            }

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }

        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }

        default:
            return state;
    }
}