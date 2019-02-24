import {flatten} from 'lodash'
import React from 'react'
import Helmet from 'react-helmet'
import {getPageTextToHeadTags} from '../../App/helpers'
import {getOpenGraphToHeadTags} from '../../App/helpers'

const
    PageTextHelmet = ({pageText, openGraphData = null, routerContext = null, domain = null}) => {
        let
            tags = getPageTextToHeadTags(pageText)

        if (openGraphData && routerContext && domain) {
            tags = flatten([tags, getOpenGraphToHeadTags(openGraphData, routerContext, domain)])
        }

        return React.createElement(Helmet, null, ...tags)
    }

export default (PageTextHelmet)
