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
        <meta property="og:type" content="video"/>,
        <meta property="og:url" content={url}/>,
        <meta property="og:image" content={ig(openGraphData, 'thumb')}/>,
        <meta property="og:image:width" content="240"/>,
        <meta property="og:image:height" content="180"/>,
        <meta property="og:video" content={swfPlugUrl}/>,
        <meta property="og:video:type" content="application/x-shockwave-flash"/>,
        <meta property="og:video:duration" content={ig(openGraphData, 'duration')}/>,
        <meta property="og:video:tag" content={ig(openGraphData, 'tags').join(', ')}/>,
        <meta property="og:video:width" content="900"/>,
        <meta property="og:video:height" content="717"/>,
    ]
}
