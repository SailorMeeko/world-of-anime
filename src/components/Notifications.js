import React, {Fragment, useState, useEffect} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetNotificationCount, getNotifications, deleteNotifications } from '../actions/notification';
import Notification from './Notification';
import Layout from './layout/Layout';
import Pagination from './Pagination';
import PageHeader from './widgets/PageHeader';

const Notifications = ({ auth: { user },
                        resetNotificationCount,
                        getNotifications,
                        deleteNotifications }) => {
    const [notifications, setNotifications] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);    
    let lastNotificationDate = null;
    let day = null;
    let count = 0;
    let label = null;

    useEffect(() => {
        async function fetchNotifications() {
            getNotifications().then((res) => {
                setNotifications(res.notifications);
                setCurrentPage(res.currentPage);
                setTotalPages(res.totalPages);
            });
        }

        if (user) {
            resetNotificationCount(user._id).then(() => {
                fetchNotifications();
            });
        }
    }, [user]);

    const fetchNotificationsByPage = async (e, page) => {
        e.preventDefault();

        async function fetchNotifications() {
            getNotifications(page).then((res) => {
                setNotifications(res.notifications);
                setCurrentPage(res.currentPage);
                setTotalPages(res.totalPages);
            });
        }

        if (user) {
            resetNotificationCount(user._id).then(() => {
                fetchNotifications();
            });
        }
    }

    const onClickRemove = async (e) => {
        e.preventDefault();
        deleteNotifications();
        setNotifications(null);
    }           

    return (
        <Layout>
            <PageHeader>Your Notifications</PageHeader>
            <Fragment>
                <div className='notification-remove'><button onClick={e => onClickRemove(e)}>Remove all notifications</button></div>
                {notifications && <Fragment>
                    {notifications.map(notification => {
                            label = null;
                            day = moment(notification.date).format('MMMM Do, YYYY');
                            if (day !== lastNotificationDate) {
                                label = day;
                            }
                            lastNotificationDate = day;
                            return <Notification key={notification._id} notification={notification} label={label} />
                       }
                       )}
                    
                       <Pagination currentPage={currentPage} totalPages={totalPages} onClickHandler={fetchNotificationsByPage} />
                </Fragment>}     
            </Fragment>
        </Layout>
    )
}

Notifications.propTypes = {
    auth: PropTypes.object,
    resetNotificationCount: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    deleteNotifications: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { resetNotificationCount, getNotifications, deleteNotifications })(Notifications);