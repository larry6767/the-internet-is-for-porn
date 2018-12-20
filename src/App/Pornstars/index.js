import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {
    Record,
    List,
} from 'immutable'
import {
    CircularProgress,
    Typography,
} from '@material-ui/core'
import ErrorContent from '../../generic/ErrorContent'
import PornstarList from '../../generic/PornstarList'
import actions from './actions'
import {
    Page,
    Content,
    PageWrapper,
} from './assets'

const
    PornstarsRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        pornstarList: List(),
    }),

    Pornstars = ({pornstars}) => <Page>
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
        }),
        dispatch => ({
            loadPage: (event, value) => dispatch(actions.loadPageRequest())
        })
    ),
    lifecycle({
        componentDidMount() {
            if (!this.props.pornstars.get('isLoading') && !this.props.pornstars.get('isLoaded')) {
                this.props.loadPage()
            }
        }
    })
)(Pornstars)
