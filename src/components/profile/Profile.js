import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileByUsername } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Layout from '../layout/Layout';

const Profile = ({ match, auth: { user, loading }, getProfileByUsername, profile: { profile, error } }) => {
    useEffect(() => {
        getProfileByUsername(match.params.username);
      }, [getProfileByUsername, match.params.username]);
    
    const isOwnProfile = (profile && profile?.user === user?._id);

    return (
        <Layout>
            {profile === null && error.status !== 400 ? <Spinner /> : <Fragment>
                {profile && <Fragment>
                Profile page for {match.params.username}
                </Fragment>
            }

            {isOwnProfile && loading === false &&
                <Fragment>
                    <p>Hey, this is your profile!</p>
                    <Link to='/profile'>Edit It</Link>
                </Fragment>}
            </Fragment>}

            {error.status === 400 && <Fragment>
                    <p>There is no profile with that username.</p>
                </Fragment>}
        </Layout>
    )
};

Profile.propTypes = {
    getProfileByUsername: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileByUsername })(Profile);