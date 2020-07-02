import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileHead from '../profile/ProfileHead';
import Post from '../profile/Post';
import { getProfileByUsername } from '../../actions/profile';
import { getSinglePost } from '../../actions/post';
import Layout from '../layout/Layout';

const Thread = ({ match,
                  getProfileByUsername,
                  getSinglePost,
                  profile: { profile },
                  post: { posts }
                }) => {
    useEffect(() => {
        getProfileByUsername(match.params.username);
      }, [getProfileByUsername, match.params.username]);
    
    useEffect(() => {
        console.log('Getting thread');
    getSinglePost(match.params.id);
    }, [getSinglePost, match.params.id]);

    return (
        <Layout>
            {profile === null ? <Spinner /> :
                <Fragment>
                    <ProfileHead profile={profile} msg={`This exciting thread is taking place on ${profile.username}'s profile`} />
                    {!posts.user && <Spinner />}
                    {posts.user && <Post post={posts} />}
                </Fragment>}
        </Layout>
    )
};

Thread.propTypes = {
    getProfileByUsername: PropTypes.func.isRequired,
    getSinglePost: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    posts: PropTypes.object
}

const mapStateToProps = state => ({
    profile: state.profile,
    post: state.post
});

export default connect(mapStateToProps, { getProfileByUsername, getSinglePost } )(Thread);