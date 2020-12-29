import React, {Fragment, useEffect, useState} from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import Layout from './layout/Layout';

const url = "//worldofanime.us9.list-manage.com/subscribe/post?u=d7df37c6a635140d3940d116f&amp;id=a3837245a3";

const Newsletter = () => {

    return (
        <Layout>
                <div className="legacy-home-container">
                    <div className="home-content">
                        <div className='legacy-title desktop'>
                            <a href="https://www.play-asia.com/23/?affiliate_id=2013387">
                            <img src="https://www.play-asia.com/1e/742nf.gif" border="0" alt="Playasia - Your One-Stop-Shop for Asian Entertainment" width="728" height="90" /></a>
                        </div>

                        <div className='legacy-title mobile'>
                            <a href="https://www.play-asia.com/23/?affiliate_id=2013387">
                            <img src="https://www.play-asia.com/1e/742qn.gif" border="0" alt="Playasia - Your One-Stop-Shop for Asian Entertainment" width="468" height="60" /></a>
                        </div>
                    </div>
                </div>

                <h3>Newsletter</h3>

                <div class="section_image">
                <img src="/images/anime_newsletter.jpg" alt="World of Anime Newsletter" />
                </div>
                <span class="conversation_text">
                        <p>World of Anime has a newsletter!</p>
                </span>
                <span class="normal_text">
                    Subscribe today to begin receiving...
                    <p />
                        <ul>
                                <li>The latest info on recent and upcoming improvements to World of Anime</li>
                                <li>Anime news, and other stuff you will love</li>
                                <li>Cool anime stuff I find</li>
                                <li>Lots of other fun stuff and surprises!</li>
                        </ul>
                </span>
                
                <span class="normal_text">
                To join the World of Anime Newsletter, simply enter your e-mail address below.  Of course, you can unsubscribe any time you want.  Subscribe today, you'll love it!
                </span>                        

                <MailchimpSubscribe url={url} />

                <p>Hope to hear from you soon!</p>
        </Layout>
    )
};

export default Newsletter;