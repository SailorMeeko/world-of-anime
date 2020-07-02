import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import NotificationCount from '../layout/NotificationCount';
import FriendRequestCount from '../layout/FriendRequestCount';

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } } ) => {
    const onClick = async e => {
        e.preventDefault();
        logout();
    }

    const username = user?.username;
    
    const guestLinks = (
        <Fragment>
            <li className='navbar__link'>
                <Link to='/join'>
                    Join
                </Link>
            </li>
            <li className='navbar__link'>
                <Link to='/login'>
                    Login
                </Link>
            </li>
        </Fragment>
    )

    const navLinks = (
    <Fragment>
        <input id="toggler" className="navbar__toggler" type="checkbox" />
        <label htmlFor="toggler" className="navbar__burger">
            <span><i className="fas fa-bars"></i></span>
        </label>
        <ul className='navbar__links'>
            <li className='navbar__link'>
            <Link to='/'>
                Home
            </Link>
            </li>

            <li className='navbar__link'>
            <Link to='/members/search'>
                Search for Members
            </Link>
            </li>            
            { !loading && (
                <Fragment>
                {isAuthenticated ? (<Fragment>
                    <li className='navbar__link'>
                        <Link to={`/profile/${username}`}>My Profile</Link>
                    </li>
                    <button onClick={e => onClick(e)}>
                        Log out
                    </button>
                    <Link to={`/notifications`}>
                        <NotificationCount />
                    </Link>
                    <Link to={`/friend_requests`}>
                        <FriendRequestCount />
                    </Link>                    
                    </Fragment>) : (<Fragment>
                        {guestLinks}
                    </Fragment>)}
                </Fragment>
            ) }
        </ul>
    </Fragment>
    );

    return (
    <div className='navbar'>
        <nav>
            {navLinks}
         </nav>
    </div>
    )
};

Navbar.propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar);