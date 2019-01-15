import {Record, List} from 'immutable'
import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, setPropTypes} from 'recompose'
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
    withStylesProps,
    getRouterContext,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
    ImmutablePropTypes,
} from '../helpers'

import ErrorContent from '../../generic/ErrorContent'
import {routerGetters} from '../../router-builder'
import {immutableI18nAllNichesModel} from '../models'
import {nicheItemModel} from './models'
import actions from './actions'
import {AllNichesPage, Content, PageWrapper} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    NichesRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        nichesList: List(),
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
                    root: classes.listItemTextRoot,
                    primary: classes.primaryTypography,
                    secondary: classes.secondaryTypography
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
                            root: classes.root
                        }}
                    >
                        {ig(niches, 'nichesList').map(x =>
                            renderListItemLink(x, classes, getChildLink)
                        )}
                    </ListComponent>
                </PageWrapper>
            </Content>
        }
    </AllNichesPage>

export default compose(
    connect(
        state => ({
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            niches: NichesRecord(ig(state, 'app', 'niches', 'all')),
            i18nAllNiches: ig(state, 'app', 'locale', 'i18n', 'allNiches'),
            routerContext: getRouterContext(state),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
        }
    ),
    withHandlers({
        loadPage: props => () => props.loadPageRequest(),
        getChildLink: props => child => routerGetters.niche.link(g(props, 'routerContext'), child),
    }),
    lifecycle({
        componentDidMount() {
            const
                niches = g(this, 'props', 'niches')

            if (!ig(niches, 'isLoading') && !ig(niches, 'isLoaded')) {
                this.props.loadPage()
            }
        }
    }),
    withStylesProps(muiStyles),
    setPropTypes({
        currentBreakpoint: PropTypes.string,
        niches: ImmutablePropTypes.exactRecordOf({
            isLoading: PropTypes.bool,
            isLoaded: PropTypes.bool,
            isFailed: PropTypes.bool,

            nichesList: ImmutablePropTypes.listOf(nicheItemModel),
        }),
        i18nAllNiches: immutableI18nAllNichesModel,
        getChildLink: PropTypes.func,
    })
)(AllNiches)
