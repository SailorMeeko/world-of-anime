import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Layout from './layout/Layout';
import PropTypes from 'prop-types';
import { getNewMembers } from '../actions/profile';
import ProfileBasic from './profile/ProfileBasic';
import { connect } from 'react-redux';

const Home = ( { getNewMembers,
                isAuthenticated, 
                loading}) => {
    const [newMembers, setNewMembers] = useState(null);

    useEffect(() => {
        if (!newMembers) {
            getNewMembers().then((members) => {
                setNewMembers(members);
            });
        }
    }, []);

    return (
        <Layout>
            {!isAuthenticated && !loading && <Fragment>
                <img src="/images/anime_hi.jpg" alt="Welcome to World of Anime" />
                    <p>Hi there! It doesn't look like you're a member of World of Anime yet. (Either that or you aren't <Link to="/login">logged in</Link>)</p>
                    <p>If you are not a member, we'd love to have you! Please join the world's best anime community site, and start having fun today!</p>
                    <p><Link to="/join">Yes, I'd love to join!</Link></p>
                </Fragment>}
                <div className="home-container">
                    <div className="home-content">
                        <h2>Welcome to World of Anime!</h2>
                        <p>World of Anime is an anime community site custom created just for anime fans, and the best place for meeting new friends who all share your love of anime!</p>
                    </div>
                    <div className="home-welcome-image">
                        <img src="/images/welcome.jpg" />
                    </div>                    
                </div>

                <div className="home-container">
                    <div className="home-content">
                        <h3>Please take a moment to welcome our newest members!</h3>
                        {newMembers && newMembers.length > 0 && <Fragment>
                            {newMembers.map(user => (
                                <ProfileBasic key={user._id} username={user.username} profile_pic={user.avatar} />
                            ))}
                            </Fragment>}
                    </div>
                </div>
        </Layout>
    )
};

Home.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    getNewMembers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(mapStateToProps, { getNewMembers })(Home);