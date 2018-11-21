import React from 'react'
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
            key={
                x.get('archiveDate') || x.get('id')
            }
            classes={{
                root: classes.itemRoot
            }}
        >
            <ListItemIcon>
                <ArrowRight />
            </ListItemIcon>
            <ListItemText
                inset
                primary={
                    x.get('month') || x.get('name')
                }
                secondary={x.get('itemsCount')}
                classes={{
                    root: classes.itemTextRoot,
                    primary: classes.primaryTypography
                }}
            />
        </ListItem>
    },

    Niche = ({
        classes,
        isLoading,
        isFailed,
        pageUrl,
        pageNumber,
        pageText,
        pagesCount,
        tagList,
        tagArchiveList,
        sortList
    }) => <Page>
        {isFailed
            ? <ErrorContent/>
            : isLoading
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
                        {tagList.map(x => renderListItem(x, classes))}
                    </List>
                    <List
                        component="nav"
                        subheader={<li/>}
                    >
                        {tagArchiveList.map(x => {
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
                                        {tagArchiveList.map(x => renderListItem(x, classes))}
                                    </ul>
                                </li>
                            }
                            return ''
                        })}
                    </List>
                </ListsWrapper>
                <PageWrapper>
                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        {pageText.get('listHeader')}
                    </Typography>
                    <ControlBar
                        pagesCount={pagesCount}
                        pageUrl={pageUrl}
                        pageNumber={pageNumber}
                        sortList={sortList}
                    />
                </PageWrapper>
            </Content>
        }
    </Page>

export default compose(
    connect(
        state => ({
            isLoading: state.getIn(['app', 'niches', 'niche', 'isLoading']),
            isLoaded: state.getIn(['app', 'niches', 'niche', 'isLoaded']),
            isFailed: state.getIn(['app', 'niches', 'niche', 'isFailed']),
            lastSubPage: state.getIn(['app', 'niches', 'niche', 'lastSubPage']),
            pageUrl: state.getIn(['app', 'niches', 'niche', 'pageUrl']),
            pageNumber: state.getIn(['app', 'niches', 'niche', 'pageNumber']),
            pageText: state.getIn(['app', 'niches', 'niche', 'pageText']),
            pagesCount: state.getIn(['app', 'niches', 'niche', 'pagesCount']),
            tagList: state.getIn(['app', 'niches', 'niche', 'tagList']),
            tagArchiveList: state.getIn(['app', 'niches', 'niche', 'tagArchiveList']),
            sortList: state.getIn(['app', 'niches', 'niche', 'sortList']),
        }),
        dispatch => ({
            loadPage: subPage => dispatch(actions.loadPageRequest(subPage)),
        })
    ),
    lifecycle({
        componentDidMount() {
            const
                subPage = this.props.match.params.child

            if (typeof subPage !== 'string')
                throw new Error(
                    `Something went wront, unexpected "subPage" type: "${typeof subPage}"` +
                    ' (this is supposed to be provided by router via props to the component)'
                )

            if (
                !this.props.isLoading &&
                (!this.props.isLoaded || subPage !== this.props.lastSubPage)
            )
                this.props.loadPage(subPage)
        }
    }),
    withStyles(styles)
)(Niche)
