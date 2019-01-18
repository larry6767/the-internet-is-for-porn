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
        { pornstars.get('isFailed')
            ? <ErrorContent/>
            : pornstars.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        Top Rated Straight Pornstars
                    </Typography>
                    <PornstarList
                        linkBuilder={linkBuilder}
                        pornstarList={pornstars.get('modelsList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>

export default compose(
    connect(
        state => ({
            pornstars: PornstarsRecord(state.getIn(['app', 'pornstars', 'all'])),
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
            routerGetters.pornstar.link(g(props, 'routerContext'), child, null),
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
