import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const ProfileBasic = ({ username, profile_pic }) => {
    let profilePicUrl = null;
    if (profile_pic?.url_80) {
        profilePicUrl = profile_pic?.url_80;
    } else if (profile_pic?.url_full) {
        profilePicUrl = profile_pic?.url_full;
    }

    return (
        <div className="profile-basic">
                <Link to={`/profile/${username}`}>
                    <img className="profile--pic-small" src={profilePicUrl} alt={username} />
                </Link>
            <p>{username}</p>
        </div>
    )
};

ProfileBasic.propTypes = {

}

export default ProfileBasic;