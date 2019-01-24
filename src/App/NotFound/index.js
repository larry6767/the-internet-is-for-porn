import React from 'react'
import {compose} from 'recompose'

import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import PageTextHelmet from '../../generic/PageTextHelmet'
import {Page} from './assets'
import {get404PageText} from '../helpers'
// TODO: this page needs video list from backend
const
    NotFound = () => <Page>
        <PageTextHelmet pageText={get404PageText()}/>
        <h1>NotFound</h1>
    </Page>

export default compose(
    sectionPortal
)(NotFound)
