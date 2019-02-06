import {flatten} from 'lodash'
import React from 'react'
import Helmet from 'react-helmet'
import {getPageTextToHeadTags} from '../../App/helpers'
import {getOpenGraphToHeadTags} from '../../App/helpers'

const
    PageTextHelmet = ({pageText, openGraphData = null}) => {
        let
            tags = getPageTextToHeadTags(pageText)

        if (openGraphData) {
            tags = flatten([tags, getOpenGraphToHeadTags(openGraphData)])
        }

        return React.createElement(Helmet, null, ...tags)
    }

export default (PageTextHelmet)
