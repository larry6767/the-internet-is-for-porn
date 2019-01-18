import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {Record, List} from 'immutable'
import {CircularProgress, Typography} from '@material-ui/core'

import {
    getHeaderText,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
} from '../helpers'
import {PageTextRecord} from '../models'
import {routerGetters} from '../../router-builder'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import ErrorContent from '../../generic/ErrorContent'
import PornstarList from '../../generic/PornstarList'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import {Page, Content, PageWrapper} from './assets'

const
    PornstarsRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        modelsList: List(),
        pageText: PageTextRecord(),
    }),

    Pornstars = ({pornstars, linkBuilder}) => <Page>
        { ig(pornstars, 'isFailed')
            ? <ErrorContent/>
            : ig(pornstars, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        Top Rated Straight Pornstars
                    </Typography>
                    <PornstarList
                        linkBuilder={linkBuilder}
                        pornstarList={ig(pornstars, 'modelsList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>

export default compose(
    sectionPortal,
    connect(
        state => ({
            pornstars: PornstarsRecord(ig(state, 'app', 'pornstars', 'all')),
            routerContext: getRouterContext(state),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => () => props.loadPageRequest(),

        setHeaderText: props => headerText => props.setNewText(headerText),

        linkBuilder: props => child =>
            routerGetters.pornstar.link(g(props, 'routerContext'), g(child, []), null),
    }),
    lifecycle({
        componentDidMount() {
            if (!ig(this.props.pornstars, 'isLoading') && !ig(this.props.pornstars, 'isLoaded'))
                this.props.loadPage()
            else if (ig(this.props.pornstars, 'isLoaded'))
                this.props.setHeaderText(getHeaderText(g(this, 'props', 'pornstars'), true))
        }
    })
)(Pornstars)
