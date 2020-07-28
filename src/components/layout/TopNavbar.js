import React, {Fragment, useEffect} from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { updateLastOnline } from '../../actions/user';
import NotificationCount from '../layout/NotificationCount';

const TopNavbar = ({ logout, 
                    updateLastOnline, 
                    auth: { isAuthenticated, loading, user } } ) => {
    const onClick = async e => {
        e.preventDefault();
        logout();
    }

    const username = user?.username;

    useEffect(() => {
        if (user) {
            updateLastOnline();
        }
    });
    
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
                    <li className='navbar__link'>
                        <Link to={`/notifications`}>
                            <NotificationCount />
                        </Link>
                    </li>
                    <Link to={`/friend_requests`}>
                        
                    </Link>
                    <button onClick={e => onClick(e)}>
                        Log out
                    </button>                    
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

TopNavbar.propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func.isRequired,
    updateLastOnline: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout, updateLastOnline })(TopNavbar);