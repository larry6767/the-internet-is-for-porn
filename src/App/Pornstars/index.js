import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {Record, List} from 'immutable'
import {CircularProgress, Typography} from '@material-ui/core'

import {getRouterContext, plainProvedGet as g} from '../helpers'
import {routerGetters} from '../../router-builder'
import ErrorContent from '../../generic/ErrorContent'
import PornstarList from '../../generic/PornstarList'
import actions from './actions'
import {Page, Content, PageWrapper} from './assets'

const
    PornstarsRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        pornstarList: List(),
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
                        pornstarList={pornstars.get('pornstarList')}
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
        }
    ),
    withHandlers({
        loadPage: props => () => props.loadPageRequest(),

        linkBuilder: props => child =>
            routerGetters.pornstar.link(g(props, 'routerContext'), child, null),
    }),
    lifecycle({
        componentDidMount() {
            if (!this.props.pornstars.get('isLoading') && !this.props.pornstars.get('isLoaded')) {
                this.props.loadPage()
            }
        }
    })
)(Pornstars)
