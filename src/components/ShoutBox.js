import React, {Fragment, useEffect, useState} from 'react';
import Layout from './layout/Layout';
import Shout from './Shout';

const ShoutBox = () => {

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

                <Shout />
        </Layout>
    )
};

export default ShoutBox;