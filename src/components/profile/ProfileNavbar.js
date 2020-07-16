import React, {Fragment} from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProfileNavbar = ( {username,
                        expandCommentBox,
                        expandPrivateMessageBox,
                        auth: { isAuthenticated, loading },
                        friendshipStatus} ) => {
 
    const navLinks = (
    <Fragment>
        <ul className='profile-navbar__links'>
            <li className='profile-navbar__link'>
            <Link to={`/profile/${username}/friends`}>
                Friends
            </Link>
            </li>
            {isAuthenticated &&
                <li className='profile-navbar__link'>
                <Link to='#' onClick={expandCommentBox}>
                    Post a comment
                </Link>
                </li>
            }
            {isAuthenticated && friendshipStatus === 'friends' &&
                <li className='profile-navbar__link'>
                <Link to='#' onClick={expandPrivateMessageBox}>
                    Send a private message
                </Link>
                </li>
            }
        </ul>
    </Fragment>
    );

    return (
    <div>
        {navLinks}
    </div>
    )
};

ProfileNavbar.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ProfileNavbar);