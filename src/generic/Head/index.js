import React from 'react'
import Helmet from 'react-helmet'
import {setPropTypes, PropTypes} from '../../App/helpers'

const
    Head = ({title, description, keywords}) => <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
    </Helmet>

export default setPropTypes({
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
})(Head)
