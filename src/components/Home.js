import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Layout from './layout/Layout';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Home = ({isAuthenticated}) => {
    return (
        <Layout>
            {!isAuthenticated && <Fragment>
                <img src="/images/anime_hi.jpg" alt="Welcome to World of Anime" />
                    <p>Hi there! It doesn't look like you're a member of World of Anime yet. (Either that or you aren't <Link to="/login">logged in</Link>)</p>
                    <p>If you are not a member, we'd love to have you! Please join the world's best anime community site, and start having fun today!</p>
                    <p><Link to="/join">Yes, I'd love to join!</Link></p>
                </Fragment>}
            <h2>Welcome to World of Anime!</h2>
            <p>World of Anime is an anime community site custom created just for anime fans, and the best place for meeting new friends who all share your love of anime!</p>
        </Layout>
    )
};

Home.propTypes = {
    isAuthenticated: PropTypes.bool}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);