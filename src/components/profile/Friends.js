import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileHead from '../profile/ProfileHead';
import { getProfileByUsername } from '../../actions/profile';
import { getUserFriends } from '../../actions/friendship';
import FriendsBasic from '../profile/FriendsBasic';
import Layout from '../layout/Layout';

const Friends = ({ match,
                    getProfileByUsername,
                    getUserFriends,
                    profile: { profile }
                }) => {
    const [friends, setFriends] = useState(null);
    const [search, setSearch] = useState(null);
    let filteredFriends;
    let friendCountWord;

    useEffect(() => {
        getProfileByUsername(match.params.username);
    }, [getProfileByUsername, match.params.username]);

    useEffect(() => {
        if (profile) {
            const friendsRequest = getUserFriends(profile.user);
            friendsRequest.then((friends) => {
                setFriends(friends);
            });
        }
    }, [profile, getUserFriends]);

    const searchSpace = e => {
        let name = e.target.value;
        setSearch(name);
    }

    filteredFriends = friends && friends.filter((data)=>{
        if(search == null)
            return data
        else if(data.username.toLowerCase().includes(search.toLowerCase()) || data.username.toLowerCase().includes(search.toLowerCase())){
            return data
        }
      });

    friendCountWord = (filteredFriends && filteredFriends.length === 1) ? 'friend' : 'friends';

    return (
        <Layout>
            {profile === null ? <Spinner /> :
                <Fragment>
                    <ProfileHead profile={profile} msg={`${profile.username}'s Friends`} secondaryMsg={filteredFriends && `${filteredFriends.length} ${friendCountWord}`} />
                </Fragment>}

                <div className="friend-search-box">
                    Find a friend: 
                    <input type="text" className="search-query-input" placeholder="Friend's Name" onChange={(e) => searchSpace(e)} />
                </div>

                {filteredFriends && filteredFriends.length > 0 && <Fragment>
                {filteredFriends.map(friend => (
                    <FriendsBasic key={friend._id} username={friend.username} profile_pic={friend.avatar} />
                ))}
                </Fragment>}                
        </Layout>
    )
}

Friends.propTypes = {
    getProfileByUsername: PropTypes.func.isRequired,
    getUserFriends: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileByUsername, getUserFriends } )(Friends);