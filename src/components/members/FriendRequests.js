import React, {Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../layout/Layout';
import FriendRequest from '../members/FriendRequest';
import Spinner from '../layout/Spinner';
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
    }, [user, updateNumFriendRequests]);

    useEffect(() => {
        const allRequests = getFriendRequests(user);
        allRequests.then((req) => {
            setRequests(req.requests);
        });
    }, [user, getFriendRequests]);

    return (
        <Layout>
            <Fragment>
                <div>Friend Requests</div>
                    {!requests && <Spinner />}
                    {requests && 
                    <div className="notification">
                        {requests.map(request => (
                            <FriendRequest key={request._id} request={request} />
                        ))}
                    </div>
                    }
                    {requests && requests.length === 0 &&
                        <Fragment>
                            You currently have no friend requests.
                        </Fragment>
                    }
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
