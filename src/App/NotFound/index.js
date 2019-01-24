import React from 'react'
import {compose} from 'recompose'

import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import {Page} from './assets'
import Helmet from 'react-helmet'
// TODO this page needs localization
const
    NotFound = () => <Page>
        <Helmet>
            <title>Not Found</title>
            <meta name="description" content="Not Found"/>
        </Helmet>
        <h1>NotFound</h1>
    </Page>

export default compose(
    sectionPortal
)(NotFound)
