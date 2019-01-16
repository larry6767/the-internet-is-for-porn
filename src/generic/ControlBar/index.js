import queryString from 'query-string'
import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {compose, setPropTypes} from 'recompose'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'

import {
    Typography,
    Button,
    Select,
    MenuItem,
    OutlinedInput,
} from '@material-ui/core'

import {
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    ImmutablePropTypes,
} from '../../App/helpers'

import {routerGetters} from '../../router-builder'
import {
    immutableI18nOrderingModel,
    immutableI18nButtonsModel,
    routerContextModel
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
        i18nOrdering: immutableI18nOrderingModel,
        sortList: sortListModel,
        chooseSort: PropTypes.func,
        currentSort: PropTypes.string.isOptional, // could be `null`
    })(({classes, i18nOrdering, sortList, chooseSort, currentSort}) => <Select
        classes={{
            select: g(classes, 'selectRoot'),
        }}
        value={currentSort || ''}
        input={
            <OutlinedInput
                onChange={event => {
                    chooseSort(event.target.value)
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
        linkBuilder: PropTypes.func,
        i18nOrdering: immutableI18nOrderingModel,
    })(({sortList, linkBuilder, i18nOrdering}) => <InlinedSelectionWrap>
        <InlinedSelectionList>
            {sortList.map(x =>
                <InlinedSelectionItem
                    key={ig(x, 'code')}
                    href={linkBuilder({ordering: ig(x, 'code')})}
                    isActive={ig(x, 'isActive')}
                >
                    {ig(i18nOrdering, ig(x, 'code'))}
                </InlinedSelectionItem>
            )}
        </InlinedSelectionList>
    </InlinedSelectionWrap>),

    WrappedButton = ({
        classes,
        link,
        text
    }) => <Link
        to={link}
        className={g(classes, 'link')}
    >
        <Button
            variant="outlined"
            color="primary"
            classes={{
                root: g(classes, 'buttonRoot'),
            }}
        >
            {text}
        </Button>
    </Link>,

    NicheControlBar = ({
        classes,

        pageUrl,
        linkBuilder,
        i18nOrdering,
        i18nButtons,

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
                text={ig(i18nButtons, 'archive')}
            /> : null
        }
        <SortWrapper>
            <Typography
                variant="body1"
                gutterBottom
                classes={{
                    root: g(classes, 'typographyRoot')
                }}
            >
                {`${ig(i18nOrdering, 'label')}:`}
            </Typography>
            {isSSR
                ? <SortSelectInlined
                    sortList={sortList}
                    linkBuilder={linkBuilder}
                    i18nOrdering={i18nOrdering}
                />
                : <SortSelectMaterial
                    classes={classes}
                    i18nOrdering={i18nOrdering}
                    sortList={sortList}
                    chooseSort={chooseSort}
                    currentSort={currentSort}
                />
            }
        </SortWrapper>
    </Fragment>,

    ArchiveControlBar = ({
        classes,
        i18nButtons,
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
                text={ig(i18nButtons, 'previousMonth')}
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
                text={ig(i18nButtons, 'nextMonth')}
            />
            : null
        }

        <WrappedButton
            classes={classes}
            link={`/${page}${subPage ? `/${subPage}` : ''}`}
            text={ig(i18nButtons, 'topFilms')}
        />
    </Fragment>,

    FavoriteControlBar = ({classes, buttonsElements, i18nButtons, routerContext}) => <Fragment>
        {buttonsElements.length
            ? <ButtonsList>
            {buttonsElements}
        </ButtonsList> : null}

        <WrappedButton
            classes={classes}
            link={g(routerGetters, 'favorite', 'link')(routerContext)}
            text={ig(i18nButtons, 'favoriteMovies')}
        />

        <WrappedButton
            classes={classes}
            link={g(routerGetters, 'favoritePornstars', 'link')(routerContext)}
            text={ig(i18nButtons, 'favoritePornstars')}
        />
    </Fragment>,

    ShowedElements = ({itemsCount, pageNumber}) => <Typography variant="body1" gutterBottom>
        {`Showing ${itemsCount * pageNumber - (itemsCount - 1)} - ${itemsCount * pageNumber}`}
    </Typography>,

    ControlBar = ({
        classes,
        isSSR,
        routerContext,
        i18nButtons,

        pageUrl, // TODO get rid of it
        search, // TODO get rid of it
        linkBuilder,
        i18nOrdering,

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
                    className={g(classes, 'paginationLink')}
                >
                    <Button
                        classes={{
                            root: g(classes, 'paginationButtonRoot'),
                        }}
                        variant={(idx + 1 === pageNumber) ? 'contained' : 'outlined'}
                        color="primary"
                    >
                        {idx + 1}
                    </Button>
                </Link>})

        return <Wrapper>
            <ControlButtons>
                {archiveFilms && ig(archiveFilms, 'current') !== 0
                    ? <ArchiveControlBar
                        classes={classes}
                        i18nButtons={i18nButtons}
                        page={page}
                        subPage={subPage}
                        buttonsElements={buttonsElements}
                        tagArchiveListOlder={tagArchiveListOlder}
                        tagArchiveListNewer={tagArchiveListNewer}
                    />
                    : favoriteButtons
                    ? <FavoriteControlBar
                        classes={classes}
                        routerContext={routerContext}
                        i18nButtons={i18nButtons}
                        buttonsElements={buttonsElements}
                    />
                    : <NicheControlBar
                        classes={classes}

                        pageUrl={pageUrl}
                        linkBuilder={linkBuilder}
                        i18nOrdering={i18nOrdering}
                        i18nButtons={i18nButtons}

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
    connect(
        state => ({
            routerContext: getRouterContext(state),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
        })
    ),
    withStyles(muiStyles),
    setPropTypes({
        classes: PropTypes.object,
        isSSR: PropTypes.bool,
        routerContext: routerContextModel,
        i18nButtons: immutableI18nButtonsModel,

        pageUrl: PropTypes.string, // TODO get rid of it
        search: PropTypes.string.isOptional, // TODO get rid of it
        linkBuilder: PropTypes.func,
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
