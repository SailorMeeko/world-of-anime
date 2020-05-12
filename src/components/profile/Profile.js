import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Moment from 'react-moment';
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
            {profile === null && error.status !== 400 ? <Spinner /> :
            <div className="profile-container">

                <div className="profile-info">
                    {profile && <Fragment>
                    <p>{match.params.username}'s profile</p>
                    {profile.profile_pic_url && <img className="profile--pic" src={profile.profile_pic_url} alt={`${match.params.username}'s profile`}/>}
                    <p>Joined <Moment format='MMMM Do, YYYY hh:mm A'>{profile.createDate}</Moment></p>
                    </Fragment>
                    }

                    {isOwnProfile && loading === false &&
                    <Fragment>
                        <p>
                            <Link className="button button--success" to="/profile">Edit your profile</Link>
                        </p>
                    </Fragment>}
                
                {profile.name && <Fragment>
                        <p className="profile--label">Name</p>
                        <p className="profile--text">{profile.name}</p>
                    </Fragment>}

                {profile.birthday && profile.show_age && <Fragment>
                        <p className="profile--label">Age</p>
                        <p className="profile--text">{moment().diff(profile.birthday, 'years')}</p>
                    </Fragment>}

                {profile.about_me && <Fragment>
                        <p className="profile--label">About Me</p>
                        <p className="profile--text">{profile.about_me}</p>
                    </Fragment>}

                {profile.favorite_anime && <Fragment>
                        <p className="profile--label">Favorite anime</p>
                        <p className="profile--text">{profile.favorite_anime}</p>
                    </Fragment>}

                {profile.favorite_movies && <Fragment>
                        <p className="profile--label">Favorite movies</p>
                        <p className="profile--text">{profile.favorite_movies}</p>
                    </Fragment>}
        
                </div>


            </div>}

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