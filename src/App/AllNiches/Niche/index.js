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

let
    currentYear // TODO FIXME fix this anti-pattern!

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

    renderListItem = (x, classes) => {
        if (x.get('year') === currentYear) // TODO FIXME fix this anti-pattern!
        return <ListItem
            button
            key={x.get('archiveDate') || x.get('id')}
            classes={{
                root: classes.itemRoot
            }}
        >
            <ListItemIcon>
                <ArrowRight />
            </ListItemIcon>
            <ListItemText
                inset
                primary={x.get('month') || x.get('name')}
                secondary={x.get('itemsCount')}
                classes={{
                    root: classes.itemTextRoot,
                    primary: classes.primaryTypography
                }}
            />
        </ListItem>
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
                        {niche.get('tagList').map(x => renderListItem(x, classes))}
                    </List>
                    <List component="nav" subheader={<li/>}>
                        {niche.get('tagArchiveList').map(x => {
                            // TODO FIXME fix this anti-pattern!
                            if (x.get('year') !== currentYear) {
                                currentYear = x.get('year') // TODO FIXME fix this anti-pattern!

                                return <li
                                    key={`section-${x.get('year')}`}
                                    className={classes.listSection}
                                >
                                    <ul className={classes.ul}>
                                        <ListSubheader classes={{
                                            root: classes.listSubheader
                                        }}>
                                            {`Archives ${x.get('year')}`}
                                        </ListSubheader>
                                        {
                                            niche.get('tagArchiveList')
                                                .map(x => renderListItem(x, classes))
                                        }
                                    </ul>
                                </li>
                            }
                            return ''
                        })}
                    </List>
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
