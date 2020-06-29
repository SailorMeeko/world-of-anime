import React, {Fragment} from 'react';

const ProfileHead = ({ profile, msg }) => {
    let profilePicUrl = null;

    if (profile && profile?.profile_pic?.url_175) {
        profilePicUrl = profile?.profile_pic?.url_175;
    } else if (profile && profile?.profile_pic?.url_full) {
        profilePicUrl = profile?.profile_pic?.url_full;
    }

    return (
        <Fragment>
            <img className="profile--pic" src={profilePicUrl} alt={`${profile.username}'s profile`}/>
            {msg}
        </Fragment>
    )
};


export default ProfileHead;