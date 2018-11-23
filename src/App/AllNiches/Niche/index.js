import React from 'react'
import _, {chain, partial, split} from 'lodash'
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
import Immutable from 'immutable'

import ErrorMessage from '../../../generic/ErrorMessage'
import ControlBar from '../../../generic/ControlBar'

import {
    Page,
    Content,
    ListsWrapper,
    PageWrapper
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
            backgroundColor: '#fff'
        },
        itemRoot: {
            paddingTop: 5,
            paddingBottom: 5
        },
        itemTextRoot: {
            padding: 0,
            width: 210,
            display: 'flex',
            alignItems: 'center'
        },
        primaryTypography: {
            marginRight: 10
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
        <ListItemIcon>
            <ArrowRight />
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

    Niche = ({classes, niche, chooseSort, isSSR}) => <Page>
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
                        pagesCount={niche.get('pagesCount')}
                        pageUrl={niche.get('pageUrl')}
                        pageNumber={niche.get('pageNumber')}
                        sortList={niche.get('sortList')}
                        currentSort={niche.get('currentSort')}
                        chooseSort={chooseSort}
                        isSSR={isSSR}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>,

    // `Record` for filtering taken data from store
    NicheRecord = Immutable.Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        tagList: Immutable.List(),
        tagArchiveList: Immutable.List(),
        sortList: Immutable.List(),
        currentSort: '',

        pageText: Immutable.Map(),
        pagesCount: 1,
        pageUrl: '',
        pageNumber: 1,

        lastSubPage: '',
    })

export default compose(
    connect(
        state => ({
            niche: NicheRecord(state.getIn(['app', 'niches', 'niche'])),
            isSSR: state.getIn(['app', 'ssr', 'isSSR']),
            search: state.getIn(['router', 'location', 'search']),
        }),
        dispatch => ({
            loadPage: subPage => dispatch(actions.loadPageRequest(subPage)),
            chooseSort: event => dispatch(actions.setNewSort(event.target.value))
        })
    ),
    lifecycle({
        componentDidMount() {
            const
                sort = chain(this.props.search)
                    .replace('?', '')
                    .split('&')
                    .map(partial(split, _, '=', 2))
                    .fromPairs()
                    .value()
                    .sort,
                subPage = sort && sort !== 'popular'
                    ? this.props.match.params.child + '-' + sort
                    : this.props.match.params.child

            if (typeof subPage !== 'string')
                throw new Error(
                    `Something went wront, unexpected "subPage" type: "${typeof subPage}"` +
                    ' (this is supposed to be provided by router via props to the component)'
                )

            if (
                !this.props.niche.get('isLoading') &&
                (
                    !this.props.niche.get('isLoaded') ||
                    subPage !== this.props.niche.get('lastSubPage')
                )
            )
                this.props.loadPage(subPage)
        }
    }),
    withStyles(styles)
)(Niche)
