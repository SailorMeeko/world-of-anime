import { SET_NOTIFICATION, CHECK_NOTIFICATIONS, READ_NOTIFICATION, CLEAR_NOTIFICATIONS } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_NOTIFICATION:
            return [...state, payload];
        case CHECK_NOTIFICATIONS:
        default:
            return state;
    }
}