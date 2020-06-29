import database from '../config/firebase';
import { SET_NOTIFICATION, CHECK_NOTIFICATIONS } from './types';

export const setNotification = (user, msg, notification_type = 'info') => async dispatch => {
    console.log('Setting notification of ', msg);
    const currentCount = await database.ref(`users/${user}/unread_notification_count`).once('value').then((snapshot) => snapshot.val()) || 0;
    return database.ref(`users/${user}/notifications`).push({
        notification_type,
        msg,
        create_date: Date.now()
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
