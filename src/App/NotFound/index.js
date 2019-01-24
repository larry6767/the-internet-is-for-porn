import React from 'react'
import {compose} from 'recompose'

import Head from '../../generic/Head'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import {Page} from './assets'
// TODO this page needs localization
const
    NotFound = () => <Page>
        <Head
            title="Not Found"
            description="Not Found"
        />
        <h1>NotFound</h1>
    </Page>

export default compose(
    sectionPortal
)(NotFound)
