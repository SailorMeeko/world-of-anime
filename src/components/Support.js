import React, {Fragment, useEffect, useState} from 'react';
import Layout from './layout/Layout';

const PlayAsiaJavascript = `
var t = "";
t += window.location;
t = t.replace( /#.*$/g, "" ).replace( /^.*:\/*/i, "" ).replace( /\./g, "[dot]" ).replace( /\//g, "[obs]" ).replace( /-/g, "[dash]" );
t = encodeURIComponent( encodeURIComponent( t ) );
var iframe = document.getElementById( "id01_767567" );
iframe.src = iframe.src.replace( "iframe_banner", t );
</script>
`;

const PlayAsiaStyle = "border-style: none; border-width: 0px; border-color: #000000; padding: 0; margin: 0; scrolling: no; frameborder: 0;";

const Support = () => {

    return (
        <Layout>
                <div className="legacy-home-container">
                    <div className="home-content">
                        <div className='legacy-title desktop'>
                            <a href="https://www.play-asia.com/23/?affiliate_id=2013387">
                            <img src="https://www.play-asia.com/1e/742gt.gif" border="0" alt="Playasia - Your One-Stop-Shop for Asian Entertainment" width="728" height="90" /></a>
                        </div>

                        <div className='legacy-title mobile'>
                            <a href="https://www.play-asia.com/23/?affiliate_id=2013387">
                            <img src="https://www.play-asia.com/1e/742o7.gif" border="0" alt="Playasia - Your One-Stop-Shop for Asian Entertainment" width="468" height="60" /></a>
                        </div>  
                
                    </div>
                </div>

                <h3>Support World of Anime</h3>

                The best way to support World of Anime is by shopping at <a href="https://www.play-asia.com/?tagid=2013387">Play-Asia</a> using either this link, or through the links below.
                This is an awesome site for buying import video games and other anime related merchandise.  I have bought from them many times, and have always had a great experience.

                <p />

                <iframe id="id01_767567" src="https://www.play-asia.com/38/190%2C000000%2Cnone%2C0%2C0%2C0%2C0%2CFFFFFF%2C000000%2Cleft%2C0%2C0-765-70g8rj-062-782i-90175jf-33iframe_banner-44140"
                style={{PlayAsiaStyle}}
                scrolling="no" frameborder="0" width="140" height="718"></iframe>
                <script type="text/javascript">
                    {PlayAsiaJavascript}
                </script>
        </Layout>
    )
};

export default Support;