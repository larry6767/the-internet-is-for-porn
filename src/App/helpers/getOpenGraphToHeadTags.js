import React from 'react'

import ig from './immutable/provedGet'

export default (openGraphData) => [
    <meta property="og:title" content={ig(openGraphData, 'title')}/>,
].concat(
    <meta property="og:type" content="video"/>
).concat(
    <meta property="og:url" content="http://videosection.com/vid-8517611/On-a-Bus.htm"/>
).concat(
    <meta property="og:image" content={ig(openGraphData, 'thumb')}/>
).concat(
    <meta property="og:image:width" content="240"/>
).concat(
    <meta property="og:image:height" content="180"/>
).concat(
    <meta property="og:video" content="http://videosection.com/clip/player.swf?flv=%2Fvid-8517611%2FOn-a-Bus.htm.flv&amp;startimage=%2F%2Fimg.videosection.com%2Ftmb%2F47%2F65%2F8516066%2F240x180-11.jpg"/>
).concat(
    <meta property="og:video:type" content="application/x-shockwave-flash"/>
).concat(
    <meta property="og:video:duration" content={ig(openGraphData, 'duration')}/>
).concat(
    <meta property="og:video:tag" content={ig(openGraphData, 'tags').join(', ')}/>
).concat(
    <meta property="og:video:width" content="900"/>
).concat(
    <meta property="og:video:height" content="717"/>
)
