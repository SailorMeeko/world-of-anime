import database from '../config/firebase';
import { SET_NOTIFICATION, CHECK_NOTIFICATIONS } from './types';

export const setNotification = (user, msg) => async dispatch => {
    const currentCount = await database.ref(`users/${user}/unread_notification_count`).once('value').then((snapshot) => snapshot.val()) || 0;
    return database.ref(`users/${user}/notifications`).push({
        viewed: false,
        msg
    }).database.ref(`users/${user}`).update({
        unread_notification_count: currentCount + 1
    }).then((ref) => {
        dispatch({
            type: SET_NOTIFICATION,
            payload: {
                msg,
                id: user
            }
        });
    });
}
