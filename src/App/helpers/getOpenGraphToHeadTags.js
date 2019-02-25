import React from 'react'

import ig from './immutable/provedGet'
import routerGetters from '../routerGetters'

export default (openGraphData, routerContext, domain) => {
    const
        link = routerGetters.video.link(
            routerContext,
            ig(openGraphData, 'id'),
            ig(openGraphData, 'title')
        ),
        url = `https://${domain}${link}`,
        swfPlugUrl = `https://${domain}/clip/player.swf?flv=${
            ig(openGraphData, 'swfPlugUrl')}.flv&startimage=${ig(openGraphData, 'thumb')}`

    return [
        <meta property="og:title" content={ig(openGraphData, 'title')}/>,
    ].concat(
        <meta property="og:type" content="video"/>
    ).concat(
        <meta property="og:url" content={url}/>
    ).concat(
        <meta property="og:image" content={ig(openGraphData, 'thumb')}/>
    ).concat(
        <meta property="og:image:width" content="240"/>
    ).concat(
        <meta property="og:image:height" content="180"/>
    ).concat(
        <meta property="og:video" content={swfPlugUrl}/>
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
}
