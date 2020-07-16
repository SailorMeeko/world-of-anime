import database from '../config/firebase';
import React, {Fragment, useState, useEffect} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetNotificationCount } from '../actions/notification';
import Notification from './Notification';
import Layout from './layout/Layout';
import PageHeader from './widgets/PageHeader';

const Notifications = ({ auth: { user },
                        resetNotificationCount }) => {
    const [notifications, setNotifications] = useState(null);
    let lastNotificationDate = null;
    let day = null;
    let count = 0;
    let label = null;

    useEffect(() => {
        async function getNotifications(userId) {
            if (user) {
                let allNotifications = [];
                await database.ref(`users/${userId}/notifications`)
                    .once('value')
                    .then((snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                            allNotifications.push({
                                id: childSnapshot.key,
                                ...childSnapshot.val()
                            });                        
                        });
                    }
                );
                setNotifications(allNotifications);
            }
        }

        if (user) {
            resetNotificationCount(user._id).then(() => {
                getNotifications(user._id);
            });
        }
    }, [user]);

    return (
        <Layout>
            <PageHeader>Your Notifications</PageHeader>
            <Fragment>
                {notifications && <Fragment>
                    {notifications.sort(
                        (a, b) =>
                        moment(b.create_date) - moment(a.create_date)
                       ).map(notification => {
                            label = null;
                            day = moment(notification.create_date).format('MMMM Do, YYYY');
                            if (day !== lastNotificationDate) {
                                label = day;
                            }
                            lastNotificationDate = day;
                            return <Notification key={notification.id} notification={notification} label={label} />
                       }
                       )}
                </Fragment>}     
            </Fragment>
        </Layout>
    )
}

Notifications.propTypes = {
    auth: PropTypes.object,
    resetNotificationCount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { resetNotificationCount })(Notifications);