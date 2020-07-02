import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Moment from 'react-moment';
import { getProfileByUsername } from '../../actions/profile';
import { createPostToUserProfile, getUserProfilePosts } from '../../actions/post';
import { sendFriendRequest, updateNumFriendRequests, getFriendshipStatus } from '../../actions/friendship';
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
                    sendFriendRequest,
                    updateNumFriendRequests,
                    getFriendshipStatus,
                    profile: { profile, error },
                    post: { posts } }) => {

    const [friendshipStatus, setFriendshipStatus] = useState(null);

    useEffect(() => {
        setFriendshipStatus(null);
    }, []);
                        
    useEffect(() => {
        getProfileByUsername(match.params.username);
      }, [getProfileByUsername, match.params.username]);

    useEffect(() => {
        if (profile) {
            getUserProfilePosts(profile._id);
        }
    }, [profile, getUserProfilePosts]);

    useEffect(() => {
        setFriendshipStatus(null);
        if (profile && user) {
            const friendshipStatusPromise = getFriendshipStatus(user._id, profile.user);
            friendshipStatusPromise.then((res) => {
                if (res) {
                    setFriendshipStatus(res.status);
                }
            });
        }
    }, [profile, getFriendshipStatus, user]);

    const [formData, setFormData] = useState({
        text: ''
    });
    
    let profilePicUrl = null;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const { text } = formData;

    const onSubmitNewPost = async e => {
        e.preventDefault();
        const newPostPromise = createPostToUserProfile(formData, profile._id);

        newPostPromise.then((newPost) => {
            setNotification(profile.user, `u:${user.username} posted a pc:${profile.username}:${newPost.commentId} on your p:profile`);
        });
        
        setFormData({text:''});
    };

    const onSubmitFriendshipRequest = async e => {
        e.preventDefault();
        
        const newFriendRequest = sendFriendRequest(profile.user);
        newFriendRequest.then(() => {
            updateNumFriendRequests(profile.user);
        });
    }

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

                    {!isOwnProfile && loading === false && friendshipStatus === 'no friendship' && 
                        <div className="friendship-box">
                            Friendship: {friendshipStatus}
                            <button onClick={e => onSubmitFriendshipRequest(e)}>Send a Friend Request to {profile.username}</button>
                        </div>
                    }

                    {!isOwnProfile && loading === false && friendshipStatus === 'requested' && 
                        <div className="friendship-box">
                            You have asked to be friends with {profile.username}
                        </div>
                    }

                    {!isOwnProfile && loading === false && friendshipStatus === 'requestee' && 
                        <div className="friendship-box">
                            {profile.username} has asked you to be friends.  Check out your <Link to='/friend_requests'>friend requests</Link>.
                        </div>
                    }

                    {!isOwnProfile && loading === false && friendshipStatus === 'rejected' && 
                    <div className="friendship-box">
                        {profile.username} has rejected your friend request.
                    </div>
                    }

                    {!isOwnProfile && loading === false && friendshipStatus === 'friends' && 
                    <div className="friendship-box">
                        {profile.username} is your friend.
                    </div>
                }                    

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

                    {posts.length > 0 && <div className="profile-comments-box">
                        {posts.map(post => (
                            <Post key={post._id} post={post} profile={profile} />
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

export default connect(mapStateToProps, { 
    getProfileByUsername, 
    createPostToUserProfile, 
    getUserProfilePosts, 
    setNotification,
    sendFriendRequest,
    updateNumFriendRequests,
    getFriendshipStatus })(Profile);