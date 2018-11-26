import React from 'react'
import queryString from 'query-string'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import {
    ListSubheader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Typography
} from '@material-ui/core'
import ArrowRight from '@material-ui/icons/ChevronRight'
import Immutable, { fromJS } from 'immutable'

import getSubPage from '../../../shared-src/routes/niche/get-subpage'
import ErrorMessage from '../../../generic/ErrorMessage'
import VideoItem from '../../../generic/VideoItem'
import ControlBar from '../../../generic/ControlBar'

import {
    Page,
    Content,
    ListsWrapper,
    PageWrapper,
    VideoList,
} from './assets'
import actions from './actions'

const
    styles = theme => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper
        },
        listSubheader: {
            backgroundColor: '#fff',
            paddingRight: 5,
            paddingLeft: 15,
        },
        itemRoot: {
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 0,
            paddingLeft: 5,
        },
        iconRoot: {
            marginRight: 5,
        },
        itemTextRoot: {
            padding: 0,
            width: 185,
            display: 'flex',
            alignItems: 'center',
        },
        primaryTypography: {
            marginRight: 5,
            maxWidth: 150,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        }
    }),

    ErrorContent = () => <div>
        <Typography variant="body1" gutterBottom>Some shit is happened 8==э</Typography>
        <Typography variant="body1" gutterBottom>Please try again</Typography>
        <ErrorMessage/>
    </div>,

    // Generic list item component generator
    renderListItem = (idKey, titleKey, countKey) => (x, classes) => <ListItem
        button
        key={x.get(idKey)}
        classes={{
            root: classes.itemRoot
        }}
    >
        <ListItemIcon classes={{
            root: classes.iconRoot
        }}>
            <ArrowRight/>
        </ListItemIcon>
        <ListItemText
            inset
            primary={x.get(titleKey)}
            secondary={x.get(countKey)}
            classes={{
                root: classes.itemTextRoot,
                primary: classes.primaryTypography
            }}
        />
    </ListItem>,

    NichesListItem = renderListItem('id', 'name', 'itemsCount'),
    ArchiveYearListItem = renderListItem('archiveDate', 'month', 'itemsCount'),

    ArchiveList = ({classes, tagArchiveList}) => {
        const
            years = tagArchiveList
                .groupBy(x => x.get('year'))
                .sortBy((v, year) => year, (a, b) => a < b ? 1 : -1)
                .map(x => x.sortBy(y => y.get('archiveDate')))

        return <List component="nav" subheader={<li/>}>
            {years.map((listByYear, year) =>
                <li
                    key={`section-${year}`}
                    className={classes.listSection}
                >
                    <ul className={classes.ul}>
                        <ListSubheader classes={{
                            root: classes.listSubheader
                        }}>
                            {`Archives ${year}`}
                        </ListSubheader>
                        {listByYear.map(x => ArchiveYearListItem(x, classes))}
                    </ul>
                </li>
            ).toList()}
        </List>
    },

    Niche = ({classes, pageUrl, search, match, niche, chooseSort, isSSR}) => <Page>
        { niche.get('isFailed')
            ? <ErrorContent/>
            : niche.get('isLoading')
            ? <CircularProgress/>
            : <Content>
                <ListsWrapper>
                    <List
                        component="nav"
                        subheader={
                            <ListSubheader classes={{
                                root: classes.listSubheader
                            }}>
                                All straight films
                            </ListSubheader>
                        }
                    >
                        {niche.get('tagList').map(x => NichesListItem(x, classes))}
                    </List>
                    <ArchiveList classes={classes} tagArchiveList={niche.get('tagArchiveList')}/>
                </ListsWrapper>
                <PageWrapper>
                    <Typography variant="h4" gutterBottom>
                        {niche.getIn(['pageText', 'listHeader'])}
                    </Typography>
                    <ControlBar
                        pageUrl={pageUrl}
                        search={search}
                        match={match}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                        pagesCount={niche.get('pagesCount')}
                        pageNumber={niche.get('pageNumber')}
                        sortList={niche.get('sortList')}
                        currentSort={niche.get('currentSort')}
                        archiveFilms={niche.get('archiveFilms')}
                        tagArchiveListOlder={niche.get('tagArchiveListOlder')}
                        tagArchiveListNewer={niche.get('tagArchiveListNewer')}
                    />
                    <Typography variant="body1" gutterBottom>
                        {`Showing 1 - ${niche.get('itemsCount')}`}
                    </Typography>
                    <VideoList>
                        <VideoItem/>
                        <VideoItem/>
                        <VideoItem/>
                        <VideoItem/>
                        <VideoItem/>
                    </VideoList>
                </PageWrapper>
            </Content>
        }
    </Page>,

    // `Record` for filtering taken data from store
    NicheRecord = Immutable.Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        pageUrl: '',
        pageNumber: 1,
        pageText: Immutable.Map(),
        pagesCount: 1,

        tagList: Immutable.List(),
        tagArchiveList: Immutable.List(),
        sortList: Immutable.List(),
        currentSort: '',
        archiveFilms: Immutable.Map(),
        tagArchiveListOlder: Immutable.fromJS(),
        tagArchiveListNewer: Immutable.fromJS(),
        itemsCount: 0,

        lastSubPage: '',
    }),

    loadPageFlow = ({search, match, niche, loadPage}) => {
        const
            path = match.params[0] && match.params[1]
                ? `${match.params.child}/${match.params[0]}-${match.params[1]}-archive`
                : match.params.child,
            {sort, page} = queryString.parse(search),
            subPage = getSubPage(path, sort, page)

        if (typeof subPage !== 'string')
            throw new Error(
                `Something went wront, unexpected "subPage" type: "${typeof subPage}"` +
                ' (this is supposed to be provided by router via props to the component)'
            )

        // "unless" condition.
        // when data is already loaded for a specified `subPage` or failed (for that `subPage`).
        if (!(
            niche.get('isLoading') ||
            (
                (niche.get('isLoaded') || niche.get('isFailed')) &&
                subPage === niche.get('lastSubPage')
            )
        ))
            loadPage(subPage)
    }

export default compose(
    connect(
        state => ({
            niche: NicheRecord(state.getIn(['app', 'niches', 'niche'])),
            isSSR: state.getIn(['app', 'ssr', 'isSSR']),
            pageUrl: state.getIn(['router', 'location', 'pathname']),
            search: state.getIn(['router', 'location', 'search']),
        }),
        dispatch => ({
            loadPage: subPage => dispatch(actions.loadPageRequest(subPage)),
            chooseSort: (newSortValue, stringifiedQS) => dispatch(actions.setNewSort({
                newSortValue: newSortValue,
                stringifiedQS: stringifiedQS
            }))
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
    withStyles(styles)
)(Niche)