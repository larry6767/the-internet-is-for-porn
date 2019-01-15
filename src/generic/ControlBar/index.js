import queryString from 'query-string'
import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {compose, setPropTypes} from 'recompose'
import {withStyles} from '@material-ui/core/styles'

import {
    Typography,
    Button,
    Select,
    MenuItem,
    OutlinedInput,
} from '@material-ui/core'

import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    ImmutablePropTypes,
} from '../../App/helpers'

import {
    immutableI18nOrderingModel,
    routerContextModel,
} from '../../App/models'

import {muiStyles} from './assets/muiStyles'

import {
    Wrapper,
    ControlButtons,
    ButtonsList,
    SortWrapper,
    InlinedSelectionWrap,
    InlinedSelectionList,
    InlinedSelectionItem,
} from './assets'

const
    sortListModel = ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
        isActive: PropTypes.bool,
        code: PropTypes.string,
    })),

    SortSelectMaterial = setPropTypes({
        classes: PropTypes.shape({selectRoot: PropTypes.string}),

        search: PropTypes.string, // TODO get rid of it
        routerContext: routerContextModel,
        i18nOrdering: immutableI18nOrderingModel,

        sortList: sortListModel,
        chooseSort: PropTypes.func,
        currentSort: PropTypes.string.isOptional, // could be `null`
    })(({classes, search, i18nOrdering, sortList, chooseSort, currentSort}) => <Select
        classes={{
            select: g(classes, 'selectRoot'),
        }}
        value={currentSort}
        input={
            <OutlinedInput
                onChange={event => {
                    const
                        parsedQS = queryString.parse(search),
                        newSortValue = event.target.value

                    parsedQS.sort = newSortValue
                    // TODO FIXME
                    chooseSort(newSortValue, `?${queryString.stringify(parsedQS)}`)
                }}
                labelWidth={0}
            />
        }
    >
        {sortList.map(x =>
            <MenuItem key={ig(x, 'code')} value={ig(x, 'code')}>
                {ig(i18nOrdering, ig(x, 'code'))}
            </MenuItem>
        )}
    </Select>),

    SortSelectInlined = setPropTypes({
        sortList: sortListModel,

        pageUrl: PropTypes.string, // TODO get rid of it
        search: PropTypes.string, // TODO get rid of it
        routerContext: routerContextModel,
        i18nOrdering: immutableI18nOrderingModel,
    })(({sortList, pageUrl, search, routerContext, i18nOrdering}) => <InlinedSelectionWrap>
        <InlinedSelectionList>
            {sortList.map(x => {
                const parsedQS = queryString.parse(search)
                parsedQS.sort = ig(x, 'code')
                const link = `${pageUrl}?${queryString.stringify(parsedQS)}`

                return <InlinedSelectionItem
                    key={ig(x, 'code')}
                    href={link}
                    isActive={ig(x, 'isActive')}
                >
                    {ig(i18nOrdering, ig(x, 'code'))}
                </InlinedSelectionItem>
            })}
        </InlinedSelectionList>
    </InlinedSelectionWrap>),

    WrappedButton = ({
        classes,
        link,
        text
    }) => <Link
        to={link}
        className={classes.link}
    >
        <Button
            variant="outlined"
            color="primary"
            classes={{
                root: classes.buttonRoot
            }}
        >
            {text}
        </Button>
    </Link>,

    NicheControlBar = ({
        classes,

        pageUrl,
        search,
        routerContext,
        i18nOrdering,

        isSSR,
        chooseSort,
        buttonsElements,
        sortList,
        currentSort,
        archiveFilms,
    }) => <Fragment>
        <ButtonsList>
            {buttonsElements}
        </ButtonsList>
        {archiveFilms
            ? <WrappedButton
                classes={classes}
                link={`${pageUrl}/archive/${archiveFilms.get('monthForLink')}`}
                text="Archive films"
            /> : null
        }
        <SortWrapper>
            <Typography
                variant="body1"
                gutterBottom
                classes={{
                    root: classes.typographyRoot
                }}
            >
                {`${ig(i18nOrdering, 'label')}:`}
            </Typography>
            {isSSR
                ? <SortSelectInlined
                    sortList={sortList}

                    pageUrl={pageUrl}
                    search={search}
                    routerContext={routerContext}
                    i18nOrdering={i18nOrdering}
                />
                : <SortSelectMaterial
                    classes={classes}
                    sortList={sortList}

                    search={search}
                    routerContext={routerContext}
                    i18nOrdering={i18nOrdering}

                    chooseSort={chooseSort}
                    currentSort={currentSort}
                />
            }
        </SortWrapper>
    </Fragment>,

    ArchiveControlBar = ({
        classes,
        page,
        subPage,
        buttonsElements,
        tagArchiveListOlder,
        tagArchiveListNewer,
    }) => <Fragment>
        {tagArchiveListOlder && tagArchiveListOlder.size
            ? <WrappedButton
                classes={classes}
                link={`/${page}${subPage ? `/${subPage}` : ''}/archive/${
                    ig(tagArchiveListOlder, 'year')}-${ig(tagArchiveListOlder, 'month')}`}
                text="previous month"
            /> : null
        }
        <ButtonsList>
            {buttonsElements}
        </ButtonsList>
        {tagArchiveListNewer && tagArchiveListNewer.size
            ? <WrappedButton
                classes={classes}
                link={`/${page}${subPage ? `/${subPage}` : ''}/archive/${
                    ig(tagArchiveListNewer, 'year')}-${ig(tagArchiveListNewer, 'month')}`}
                text="next month"
            />
            : null
        }

        <WrappedButton
            classes={classes}
            link={`/${page}${subPage ? `/${subPage}` : ''}`}
            text="Top Films"
        />
    </Fragment>,

    FavoriteControlBar = ({classes, buttonsElements, favoriteButtons}) => <Fragment>
        {buttonsElements.length
            ? <ButtonsList>
            {buttonsElements}
        </ButtonsList> : null}

        <WrappedButton
            classes={classes}
            link={'/favorite'}
            text={'Films'}
        />

        <WrappedButton
            classes={classes}
            link={'/favorite-porn-stars'}
            text={'Pornstars'}
        />
    </Fragment>,

    ShowedElements = ({itemsCount, pageNumber}) => <Typography variant="body1" gutterBottom>
        {`Showing ${itemsCount * pageNumber - (itemsCount - 1)} - ${itemsCount * pageNumber}`}
    </Typography>,

    ControlBar = ({
        classes,

        pageUrl,
        search, // TODO get rid of it
        routerContext,
        i18nOrdering,

        isSSR,
        chooseSort,
        page,
        subPage,
        pagesCount,
        pageNumber,
        itemsCount,
        sortList,
        currentSort,
        archiveFilms,
        tagArchiveListOlder,
        tagArchiveListNewer,
        favoriteButtons,
    }) => {
        const
            array = Array.from(Array(pagesCount).keys()),
            buttonsElements = array.map((x, idx) => {
                const parsedQS = queryString.parse(search)
                parsedQS.page = idx + 1
                const link = `${pageUrl}?${queryString.stringify(parsedQS)}`

                return <Link
                    key={idx + 1}
                    to={link}
                    className={classes.paginationLink}
                >
                    <Button
                        classes={{
                            root: classes.paginationButtonRoot
                        }}
                        variant={(idx + 1 === pageNumber) ? 'contained' : 'outlined'}
                        color="primary"
                    >
                        {idx + 1}
                    </Button>
                </Link>})

        return <Wrapper>
            <ControlButtons>
                {archiveFilms && archiveFilms.get('current') !== 0
                    ? <ArchiveControlBar
                        classes={classes}
                        page={page}
                        subPage={subPage}
                        buttonsElements={buttonsElements}
                        tagArchiveListOlder={tagArchiveListOlder}
                        tagArchiveListNewer={tagArchiveListNewer}
                    />
                    : favoriteButtons
                    ? <FavoriteControlBar
                        classes={classes}
                        buttonsElements={buttonsElements}
                    />
                    : <NicheControlBar
                        classes={classes}

                        pageUrl={pageUrl}
                        search={search}
                        routerContext={routerContext}
                        i18nOrdering={i18nOrdering}

                        isSSR={isSSR}
                        chooseSort={chooseSort}
                        buttonsElements={buttonsElements}
                        sortList={sortList}
                        currentSort={currentSort}
                        archiveFilms={archiveFilms}
                    />
                }
            </ControlButtons>
            <ShowedElements
                itemsCount={itemsCount}
                pageNumber={pageNumber}
            />
        </Wrapper>
    }

export default compose(
    withStyles(muiStyles),
    setPropTypes({
        classes: PropTypes.object,
        isSSR: PropTypes.bool,

        pageUrl: PropTypes.string, // TODO get rid of it
        search: PropTypes.string, // TODO get rid of it
        routerContext: routerContextModel.isOptional,
        i18nOrdering: immutableI18nOrderingModel.isOptional,

        chooseSort: PropTypes.func.isOptional,
        page: PropTypes.string,
        subPage: PropTypes.string.isOptional,
        pagesCount: PropTypes.number,
        pageNumber: PropTypes.number,
        itemsCount: PropTypes.number,
        sortList: sortListModel,
        currentSort: PropTypes.string.isOptional, // could be `null`

        archiveFilms: ImmutablePropTypes.exact({
            current: PropTypes.number,
            monthForLink: PropTypes.string,
        }).isOptional,

        tagArchiveListOlder: ImmutablePropTypes.exact({
            month: PropTypes.string,
            year: PropTypes.string,
        }).isOptional,

        tagArchiveListNewer: ImmutablePropTypes.exact({
            month: PropTypes.string,
            year: PropTypes.string,
        }).isOptional,

        favoriteButtons: PropTypes.bool.isOptional, // could be not presented at all
    })
)(ControlBar)
