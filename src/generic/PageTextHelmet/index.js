import React from 'react'
import Helmet from 'react-helmet'

import {getPageTextToHeadTags, getOpenGraphToHeadTags} from '../../App/helpers'

const
    PageTextHelmet = ({
        pageText,
        openGraphData = null,
        routerContext = null,
        domain = null,
    }) => React.createElement(Helmet, null, ...(
        [
            // TODO FIXME implement localized "lang" attribute
            <html lang="en"/>,
        ].concat(
            getPageTextToHeadTags(pageText)
        ).concat(
            openGraphData && routerContext && domain
                ? getOpenGraphToHeadTags(openGraphData, routerContext, domain)
                : []
        )
    ))

export default PageTextHelmet
