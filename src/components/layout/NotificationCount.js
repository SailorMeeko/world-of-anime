import database from '../../config/firebase';
import React, {Fragment, useState, useEffect} from 'react';
import BellIcon from 'react-bell-icon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const NotificationCount = ({ auth: { user } }) => {
    const [notificationCount, setNotificationCount] = useState(-1);
    let notificationCountColor = (notificationCount > 0) ? 'red' : 'white';
    let notificationCountWord = (notificationCount === 1) ? 'Notification' : 'Notifications';

    useEffect(() => {
        let currentCountRef;

        async function getNotificationCount(user) {
            if (user) {
                currentCountRef = database.ref(`users/${user._id}/unread_notification_count`);
                currentCountRef.on('value', function(snapshot) {
                    if (!snapshot.val()) {
                        setNotificationCount(0);
                    } else {
                        setNotificationCount(snapshot.val());
                    }
                });
            }
        }

        getNotificationCount(user);

        return function cleanup() {
            if (currentCountRef != null) {
                currentCountRef.off();
            }
        }
    }, []);

    return (
        <Fragment>
            <BellIcon width='20' height='20' color={notificationCountColor} active={true} />        
            <span className='notificationCount'>
                    {notificationCount >= 0 && notificationCount} {notificationCountWord}
            </span>
        </Fragment>
    )
}

NotificationCount.propTypes = {
    auth: PropTypes.object,        
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(NotificationCount);