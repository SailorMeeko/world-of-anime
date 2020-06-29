import database from '../../config/firebase';
import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const NotificationCount = ({ auth: { user } }) => {
    const [notificationCount, setNotificationCount] = useState(-1);

    useEffect(() => {
        async function getNotificationCount(user) {
            if (user) {
                var currentCountRef = database.ref(`users/${user._id}/unread_notification_count`);
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
    }, [user]);

    return (
        <Fragment>
            <span className="notificationCount">
                {notificationCount >= 0 && notificationCount} Notifications
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