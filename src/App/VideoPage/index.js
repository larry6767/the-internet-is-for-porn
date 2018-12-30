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
import {getSubPage} from '../helpers'
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

        lastSubPageForRequest: '',

        pageText: Map(),
        gallery: Map(),
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
                        {`${data.getIn(['gallery', 'title'])} ${
                            data.getIn(['pageText', 'galleryTitle'])}`}
                    </Typography>
                    <VideoList
                        videoList={data.get('videoList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    loadPageFlow = ({match, data, loadPage}) => {
        const
            subPageForRequest = getSubPage(`${match.params.child}/${match.params.name}`)

        console.log('data: ', data)

        if (typeof subPageForRequest !== 'string')
            throw new Error(
                `Something went wront, unexpected "subPageForRequest" type: "${
                    typeof subPageForRequest}"` +
                ' (this is supposed to be provided by router via props to the component)'
            )

        // "unless" condition.
        // when data is already loaded for a specified `subPage` or failed (for that `subPage`).
        if (!(
            data.get('isLoading') ||
            (
                (data.get('isLoaded') || data.get('isFailed')) &&
                subPageForRequest === data.get('lastSubPageForRequest')
            )
        ))
            loadPage(subPageForRequest)
    }

export default compose(
    connect(
        state => ({
            data: VideoPageRecord(state.getIn(['app', 'videoPage'])),
            isSSR: state.getIn(['app', 'ssr', 'isSSR']),
            pageUrl: state.getIn(['router', 'location', 'pathname']),
        }),
        dispatch => ({
            loadPage: subPageForRequest => dispatch(actions.loadPageRequest(subPageForRequest))
        })
    ),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
        },
    }),
    withStyles(muiStyles)
)(VideoPage)
