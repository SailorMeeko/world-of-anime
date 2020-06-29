import React, {Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getFriendRequests, updateNumFriendRequests } from '../../actions/friendship';

const FriendRequests = ({ auth: { user, loading }, 
                        getFriendRequests,
                        updateNumFriendRequests
                    }) => {
    const [requests, setRequests] = useState(null);

    useEffect(() => {
        if (user) {
            updateNumFriendRequests(user._id);
        }
    }, [user]);

    useEffect(() => {
        const allRequests = getFriendRequests(user);
        allRequests.then((req) => {
            setRequests(req.requests);
        });
    }, [user]);

    return (
        <Layout>
            <Fragment>
                <div>Friend Requests</div>
                    {requests && <div className="notification">
                    {requests.map(request => (
                        <Fragment>{request._id}</Fragment>
                    ))}
            </div>}  
            </Fragment>
        </Layout>
    );
}

FriendRequests.propTypes = {
    auth: PropTypes.object,        
    getFriendRequests: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getFriendRequests, updateNumFriendRequests })(FriendRequests);
