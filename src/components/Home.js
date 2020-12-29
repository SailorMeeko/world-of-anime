import React, {Fragment, useEffect, useState} from 'react';
import flags from '../config/flags';
import { Link } from 'react-router-dom';
import Layout from './layout/Layout';
import PropTypes from 'prop-types';
import { getNewMembers } from '../actions/user';
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
            {flags.socialSite && !isAuthenticated && !loading && <Fragment>
                <img src="/images/anime_hi.jpg" alt="Welcome to World of Anime" />
                    <p>Hi there! It doesn't look like you're a member of World of Anime yet. (Either that or you aren't <Link to="/login">logged in</Link>)</p>
                    <p>If you are not a member, we'd love to have you! Please join the world's best anime community site, and start having fun today!</p>
                    <p><Link to="/join">Yes, I'd love to join!</Link></p>
                </Fragment>}
                {flags.socialSite &&
                    <div className="home-container">
                        <div className="home-content">
                            <h2>Welcome to World of Anime!</h2>
                            <p>World of Anime is an anime community site custom created just for anime fans, and the best place for meeting new friends who all share your love of anime!</p>
                        </div>
                        <div className="home-welcome-image">
                            <img src="/images/welcome.jpg" />
                        </div>                    
                    </div>
                }

                {flags.socialSite && 
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
                }

                {!flags.socialSite && <Fragment>
                        <div className="legacy-home-container">
                            <div className='legacy-title desktop'>
                                <a href="https://www.play-asia.com/23/?affiliate_id=2013387">
                                <img src="https://www.play-asia.com/1e/742oh.gif" border="0" alt="Playasia - Your One-Stop-Shop for Asian Entertainment" width="728" height="90" /></a>
                            </div>

                            <div className='legacy-title mobile'>
                                <a href="https://www.play-asia.com/23/?affiliate_id=2013387">
                                <img src="https://www.play-asia.com/1e/742of.gif" border="0" alt="Playasia - Your One-Stop-Shop for Asian Entertainment" width="468" height="60" /></a>
                            </div>

                            <div className='legacy-title'>World of Anime</div>
                            <img src="/images/sasami.jpg" alt="Sasami looking ahead" />
                            <div className='legacy-title'>...is on hiatus</div>
                        </div>

                        <div className="home-content">
                        <h3>What happened to World of Anime, the social networking site?</h3>
                        <p>From 2009 - 2020, World of Anime was the place to go for anime fans to connect with each to discuss their love of the medium.  Through two (and a half) major versions of the site, anime fans everywhere could find any connect with others who shared their same passion.  Now, a new version is under development, and we look forward to having you join us in the future to continue the legacy of World of Anime.</p>
                        <h3>When will the new version be available?</h3>
                        <p>It is completely unknown when the new version will be available.  It is still under development, and it will be ready when it is ready.  Keep checking the <Link to='/updates'>updates</Link> page to see what's new.</p>
                        <h3>So what can I do on this site now?</h3>
                        <p>While the new social site is under development, the best thing you can do is to shop at <a href="https://www.play-asia.com/?tagid=2013387">Play-Asia</a> using this affiliate link.</p>
                        <p>To get updates on the site and what's going on with it, you can sign up for the <Link to='/newsletter'>newsletter</Link> here.</p>
                        <p>And of course keep checking the <Link to='/updates'>updates</Link> page to see what's new!</p>
                        </div>
                    </Fragment>
                }
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