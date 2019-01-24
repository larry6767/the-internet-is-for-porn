import React from 'react'
import Helmet from 'react-helmet'
import {getPageTextToHeadTags} from '../../App/helpers'

const
    PageTextHelmet = ({pageText}) => React.createElement(
        Helmet, null, ...getPageTextToHeadTags(pageText)
    )

export default (PageTextHelmet)
