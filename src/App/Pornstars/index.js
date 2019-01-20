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
    setPropTypes,
    PropTypes,
} from '../helpers'

import {
    orientationCodes,
    PageTextRecord,
    routerContextModel,
} from '../models'

import {dataModel} from './models'
import {routerGetters} from '../../router-builder'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import ErrorContent from '../../generic/ErrorContent'
import PornstarList from '../../generic/PornstarList'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import {Page, Content, PageWrapper} from './assets'

const
    Pornstars = ({data, linkBuilder}) => <Page>
        { ig(data, 'isFailed')
            ? <ErrorContent/>
            : ig(data, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        Top Rated Straight Pornstars
                    </Typography>
                    <PornstarList
                        linkBuilder={linkBuilder}
                        pornstarList={ig(data, 'modelsList')}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    DataRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        lastOrientationCode: '',

        modelsList: List(),
        pageText: PageTextRecord(),
    }),

    loadPageFlow = ({data, loadPage, setHeaderText, currentOrientation}) => {
        if (!(
            ig(data, 'isLoading') ||
            (
                (ig(data, 'isLoaded') || ig(data, 'isFailed')) &&
                g(currentOrientation, []) === ig(data, 'lastOrientationCode')
            )
        ))
            loadPage()
        else if (ig(data, 'isLoaded'))
            setHeaderText(getHeaderText(g(data, []), true))
    }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
            data: DataRecord(ig(state, 'app', 'pornstars', 'all')),
            routerContext: getRouterContext(state),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => () => props.loadPageRequest({
            orientationCode: g(props, 'currentOrientation'),
        }),

        setHeaderText: props => headerText => props.setNewText(headerText),

        linkBuilder: props => child =>
            routerGetters.pornstar.link(g(props, 'routerContext'), g(child, []), null),
    }),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
        },
    }),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        currentOrientation: PropTypes.oneOf(orientationCodes),
        data: dataModel,
        routerContext: routerContextModel,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
        setHeaderText: PropTypes.func,
        linkBuilder: PropTypes.func,
    }),
)(Pornstars)
