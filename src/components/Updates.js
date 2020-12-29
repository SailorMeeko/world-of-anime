import React, {Fragment, useEffect, useState} from 'react';
import Layout from './layout/Layout';

const Updates = () => {

    return (
        <Layout>
                <div className="legacy-home-container">
                    <div className="home-content">
                        
                        <div className='legacy-title desktop'>
                            <a href="https://www.play-asia.com/23/?affiliate_id=2013387">
                            <img src="https://www.play-asia.com/1e/742m7.gif" border="0" alt="Playasia - Your One-Stop-Shop for Asian Entertainment" width="728" height="90" /></a>
                        </div>

                        <div className='legacy-title mobile'>
                            <a href="https://www.play-asia.com/23/?affiliate_id=2013387">
                            <img src="https://www.play-asia.com/1e/742qd.gif" border="0" alt="Playasia - Your One-Stop-Shop for Asian Entertainment" width="468" height="60" /></a>
                        </div>
                    </div>
                </div>

                <h3>Updates</h3>
                <p>Updates to the web site will be posted here.  Check back frequently!</p>

                <h5>12/29/2020</h5>
                World of Anime - the social networking site goes on hiatus.  A new experimental sandbox web site is put up in its place.
        </Layout>
    )
};

export default Updates;