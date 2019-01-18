import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {Record, List} from 'immutable'
import {CircularProgress, Typography} from '@material-ui/core'

import {getRouterContext, plainProvedGet as g, immutableProvedGet as ig} from '../helpers'
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
                        pornstarList={ig(pornstars, 'pornstarList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>

export default compose(
    connect(
        state => ({
            pornstars: PornstarsRecord(ig(state, 'app', 'pornstars', 'all')),
            routerContext: getRouterContext(state),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
        }
    ),
    withHandlers({
        loadPage: props => () => props.loadPageRequest(),

        linkBuilder: props => child =>
            routerGetters.pornstar.link(g(props, 'routerContext'), g(child, []), null),
    }),
    lifecycle({
        componentDidMount() {
            if (
                !ig(this.props.pornstars, 'isLoading') &&
                !ig(this.props.pornstars, 'isLoaded')
            ) {
                this.props.loadPage()
            }
        }
    })
)(Pornstars)
