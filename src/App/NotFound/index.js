import React from 'react'
import {compose} from 'recompose'

import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import {Page} from './assets'

const
    NotFound = () => <Page>
        <h1>NotFound</h1>
    </Page>

export default compose(
    sectionPortal
)(NotFound)
