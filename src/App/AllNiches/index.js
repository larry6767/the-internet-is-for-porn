import {Record, List, Map} from 'immutable'
import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {Link} from 'react-router-dom'
import FolderIcon from '@material-ui/icons/Folder'

import {
    List as ListComponent,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Typography,
} from '@material-ui/core'

import {
    getHeaderText,
    withStylesProps,
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
    ImmutablePropTypes,
    setPropTypes,
} from '../helpers'

import ErrorContent from '../../generic/ErrorContent'
import {routerGetters} from '../../router-builder'
import {immutableI18nAllNichesModel, immutablePageTextModel, orientationCodes} from '../models'
import {nicheItemModel} from './models'
import headerActions from '../MainHeader/actions'
import actions from './actions'
import sectionPortal from '../MainHeader/Navigation/sectionPortal'
import orientationPortal from '../MainHeader/Niche/orientationPortal'
import {AllNichesPage, Content, PageWrapper} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    NichesRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        lastOrientationCode: '',

        nichesList: List(),
        pageText: Map(),
    }),

    renderListItemLink = (x, classes, getChildLink) => <Link to={getChildLink(ig(x, 'subPage'))}
        key={ig(x, 'id')}
        className={g(classes, 'routerLink')}
    >
        <ListItem
            button
            classes={{
                gutters: g(classes, 'itemGutters'),
            }}
        >
            <ListItemIcon>
                <FolderIcon/>
            </ListItemIcon>
            <ListItemText
                classes={{
                    root: g(classes, 'listItemTextRoot'),
                    primary: g(classes, 'primaryTypography'),
                    secondary: g(classes, 'secondaryTypography')
                }}
                primary={ig(x, 'name')}
                secondary={ig(x, 'itemsCount')}
            />
        </ListItem>
    </Link>,

    AllNiches = ({classes, niches, getChildLink, i18nAllNiches}) => <AllNichesPage>
        { ig(niches, 'isFailed')
            ? <ErrorContent/>
            : ig(niches, 'isLoading')
            ? <CircularProgress/>
            : <Content>
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {ig(i18nAllNiches, 'pageHeader')}
                    </Typography>
                    <ListComponent
                        component="div"
                        classes={{
                            root: g(classes, 'root')
                        }}
                    >
                        {ig(niches, 'nichesList').map(x =>
                            renderListItemLink(x, classes, getChildLink)
                        )}
                    </ListComponent>
                </PageWrapper>
            </Content>
        }
    </AllNichesPage>,

    loadPageFlow = ({currentOrientation, niches, loadPage, setHeaderText}) => {
        if (!(
            ig(niches, 'isLoading') ||
            (
                (ig(niches, 'isLoaded') || ig(niches, 'isFailed')) &&
                g(currentOrientation, []) === ig(niches, 'lastOrientationCode')
            )
        ))
            loadPage()
        else if (ig(niches, 'isLoaded'))
            setHeaderText(getHeaderText(g(niches, []), true))
   }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
            niches: NichesRecord(ig(state, 'app', 'niches', 'all')),
            i18nAllNiches: ig(state, 'app', 'locale', 'i18n', 'allNiches'),
            routerContext: getRouterContext(state),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setNewText: g(headerActions, 'setNewText'),
        }
    ),
    withHandlers({
        loadPage: props => () =>
            props.loadPageRequest({orientationCode: g(props, 'currentOrientation')}),

        setHeaderText: props => headerText => props.setNewText(headerText),
        getChildLink: props => child => routerGetters.niche.link(g(props, 'routerContext'), child),
    }),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
        },
    }),
    withStylesProps(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        currentBreakpoint: PropTypes.string,
        currentOrientation: PropTypes.oneOf(orientationCodes),
        niches: ImmutablePropTypes.exactRecordOf({
            isLoading: PropTypes.bool,
            isLoaded: PropTypes.bool,
            isFailed: PropTypes.bool,

            lastOrientationCode: PropTypes.oneOf(orientationCodes),

            nichesList: ImmutablePropTypes.listOf(nicheItemModel),
            pageText: immutablePageTextModel,
        }),
        i18nAllNiches: immutableI18nAllNichesModel,
        getChildLink: PropTypes.func,
    })
)(AllNiches)
