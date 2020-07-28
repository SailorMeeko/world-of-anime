import React, {Fragment, useEffect, useState} from 'react';
import Layout from './layout/Layout';
import PropTypes from 'prop-types';
import { getOnlineMembers } from '../actions/user';
import ProfileBasic from './profile/ProfileBasic';
import { connect } from 'react-redux';

const Online = ( { getOnlineMembers }) => {
    const [onlineMembers, setOnlineMembers] = useState(null);

    useEffect(() => {
        if (!onlineMembers) {
            getOnlineMembers().then((members) => {
                setOnlineMembers(members);
            });
        }
    }, []);

    return (
        <Layout>
                <div className="home-container">
                    <div className="home-content">
                        <h3>Who's Online Right Now?</h3>
                        {onlineMembers && onlineMembers.length > 0 && <Fragment>
                            {onlineMembers.map(user => (
                                <ProfileBasic key={user._id} username={user.username} profile_pic={user.avatar} />
                            ))}
                            </Fragment>}
                    </div>
                </div>
        </Layout>
    )
};

Online.propTypes = {
    getOnlineMembers: PropTypes.func.isRequired
}

export default connect(null, { getOnlineMembers })(Online);