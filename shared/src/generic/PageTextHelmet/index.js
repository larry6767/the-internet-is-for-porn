import React from 'react'
import Helmet from 'react-helmet'

// local libs
import {getPageTextToHeadTags, getOpenGraphToHeadTags, plainProvedGet as g} from 'src/App/helpers'

const
    PageTextHelmet = ({
        htmlLang,
        pageText,
        openGraphData = null,
        routerContext = null,
        domain = null,
    }) => React.createElement(Helmet, null, ...(
        [
            <html lang={g(htmlLang, [])}/>,
        ].concat(
            getPageTextToHeadTags(pageText)
        ).concat(
            openGraphData && routerContext && domain
                ? getOpenGraphToHeadTags(openGraphData, routerContext, domain)
                : []
        )
    ))

export default PageTextHelmet
