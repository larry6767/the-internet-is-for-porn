import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {withStyles} from '@material-ui/core'
import {
    CircularProgress,
    Typography
} from '@material-ui/core'
import {
    Record,
    Map,
    List,
} from 'immutable'
import ErrorContent from '../../generic/ErrorContent'
import VideoList from '../../generic/VideoList'
import {
    Page,
    Content,
    PageWrapper,
} from './assets'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

const
    VideoPageRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        pageText: Map(),
        videoList: List(),
    }),

    VideoPage = ({classes, data}) => <Page>
        { data.get('isFailed')
            ? <ErrorContent/>
            : data.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageWrapper>
                    <Typography
                        variant="h4"
                        gutterBottom
                        classes={{
                            root: classes.typographyTitle
                        }}
                    >
                        {data.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <VideoList
                        data={allMovies.get('videoList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>

export default compose(
    connect(
        state => ({
            data: VideoPageRecord(state.getIn(['app', 'niches', 'all'])),
        }),
        dispatch => ({
            loadPage: (event, value) => dispatch(actions.loadPageRequest())
        })
    ),
    lifecycle({
        componentDidMount() {
            if (!this.props.data.get('isLoading') && !this.props.data.get('isLoaded')) {
                this.props.loadPage()
            }
        }
    }),
    withStyles(muiStyles)
)(VideoPage)
