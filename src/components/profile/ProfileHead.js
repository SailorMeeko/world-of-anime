import React from 'react';

const ProfileHead = ({ profile, msg, secondaryMsg }) => {
    let profilePicUrl = null;

    if (profile && profile?.profile_pic?.url_175) {
        profilePicUrl = profile?.profile_pic?.url_175;
    } else if (profile && profile?.profile_pic?.url_full) {
        profilePicUrl = profile?.profile_pic?.url_full;
    }

    if (profile && profile?.avatar?.url_175) {
        profilePicUrl = profile?.avatar?.url_175;
    } else if (profile && profile?.avatar?.url_full) {
        profilePicUrl = profile?.avatar?.url_full;
    }    

    return (
        <div className="profile-head">
            <img className="profile--pic-small" src={profilePicUrl} alt={`${profile.username}'s profile`} />
            <div className="profile-head-content">
                <div className="profile-head-message">{msg}</div>
                <div className="profile-head-secondary-message">{secondaryMsg}</div>
            </div>
        </div>
    )
};


export default ProfileHead;