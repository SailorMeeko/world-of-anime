import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Moment from 'react-moment';
import { getProfileByUsername } from '../../actions/profile';
import { createPostToUserProfile, getUserProfilePosts } from '../../actions/post';
import { setNotification} from '../../actions/notification';
import Post from './Post';
import Spinner from '../layout/Spinner';
import Layout from '../layout/Layout';

const Profile = ({ match, 
                    auth: { user, loading }, 
                    getProfileByUsername, 
                    createPostToUserProfile, 
                    getUserProfilePosts, 
                    setNotification, 
                    profile: { profile, error },
                    post: { posts } }) => {
    useEffect(() => {
        getProfileByUsername(match.params.username);
      }, [getProfileByUsername, match.params.username]);

      useEffect(() => {
        if (profile) {
            getUserProfilePosts(profile._id);
        }
      }, [getUserProfilePosts, profile]);      

    const [formData, setFormData] = useState({
        text: ''
    });
    
    let profilePicUrl = null;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const { text } = formData;

    const onSubmitNewPost = async e => {
        e.preventDefault();
        createPostToUserProfile(formData, profile._id);
        setFormData({text:''});
    };    

    // useEffect(() => {
    //     profile && setNotification(profile.user, 'Someone looked at your profile');
    // }, [profile]);
    
    const isOwnProfile = (profile && profile?.user === user?._id);
    if (profile && profile?.profile_pic?.url_175) {
        profilePicUrl = profile?.profile_pic?.url_175;
    } else if (profile && profile?.profile_pic?.url_full) {
        profilePicUrl = profile?.profile_pic?.url_full;
    }

    return (
        <Layout>
            {profile === null && error.status !== 400 ? <Spinner /> :
            <div className="profile-container">

                <div className="profile-info">
                    {profile && <Fragment>
                    <p>{match.params.username}'s profile</p>
                    {profilePicUrl && 
                        <img className="profile--pic" src={profilePicUrl} alt={`${match.params.username}'s profile`}/>
                    }
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

                <div className="profile-content">

                    <div className="profile-action-box">
                        <form>
                            <textarea
                                name="text"
                                rows="4"
                                value={text}
                                onChange={e => onChange(e)
                                }
                            />

                            <p><button onClick={e => onSubmitNewPost(e)}>Add new comment</button></p>
                        </form>
                    </div>

                    {posts && <div className="profile-comments-box">
                        {posts.map(post => (
                            <Post key={post._id} post={post} />
                        ))}
                    </div>}            

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
    createPostToUserProfile: PropTypes.func.isRequired,
    getUserProfilePosts: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    posts: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post
});

export default connect(mapStateToProps, { getProfileByUsername, createPostToUserProfile, getUserProfilePosts, setNotification })(Profile);