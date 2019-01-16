import {range} from 'lodash'
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
    immutableI18nButtonsModel,
    routerContextModel,
    immutableArchiveFilmsModel,
} from '../../App/models'

import {routerGetters} from '../../router-builder'
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
        currentSort: PropTypes.nullable(PropTypes.string),
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

    WrappedButton = setPropTypes({
        classes: PropTypes.shape({
            link: PropTypes.string,
            buttonRoot: PropTypes.string,
        }),
        link: PropTypes.string,
        text: PropTypes.string,
    })(({
        classes,
        link,
        text,
    }) => <Link to={link} className={g(classes, 'link')}>
        <Button
            variant="outlined"
            color="primary"
            classes={{
                root: g(classes, 'buttonRoot'),
            }}
        >
            {text}
        </Button>
    </Link>),

    NicheControlBar = setPropTypes({
        classes: PropTypes.shape({typographyRoot: PropTypes.string}),
        linkBuilder: PropTypes.func,
        archiveLinkBuilder: PropTypes.func,
        i18nOrdering: immutableI18nOrderingModel,
        i18nButtons: immutableI18nButtonsModel,
        isSSR: PropTypes.bool,
        chooseSort: PropTypes.func,
        buttonsElements: PropTypes.node,
        sortList: sortListModel,
        currentSort: PropTypes.nullable(PropTypes.string),
        archiveFilms: PropTypes.nullable(immutableArchiveFilmsModel),
    })(({
        classes,
        linkBuilder,
        archiveLinkBuilder,
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
        {archiveFilms === null ? null : <WrappedButton
            classes={classes}
            link={archiveLinkBuilder(ig(archiveFilms, 'year'), ig(archiveFilms, 'month'))}
            text={ig(i18nButtons, 'archive')}
        />}
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
    </Fragment>),

    ArchiveControlBar = setPropTypes({
        classes: PropTypes.object,
        i18nButtons: immutableI18nButtonsModel,
        buttonsElements: PropTypes.node,

        tagArchiveListOlder: PropTypes.nullable(ImmutablePropTypes.exact({
            month: PropTypes.string,
            year: PropTypes.string,
        })),

        tagArchiveListNewer: PropTypes.nullable(ImmutablePropTypes.exact({
            month: PropTypes.string,
            year: PropTypes.string,
        })),

        archiveLinkBuilder: PropTypes.func,
        backFromArchiveLinkBuilder: PropTypes.func,
    })(({
        classes,
        i18nButtons,
        buttonsElements,
        tagArchiveListOlder,
        tagArchiveListNewer,
        archiveLinkBuilder,
        backFromArchiveLinkBuilder,
    }) => <Fragment>
        {tagArchiveListOlder === null ? null : <WrappedButton
            classes={classes}
            link={archiveLinkBuilder(
                ig(tagArchiveListOlder, 'year'),
                ig(tagArchiveListOlder, 'month')
            )}
            text={ig(i18nButtons, 'previousMonth')}
        />}
        <ButtonsList>
            {buttonsElements}
        </ButtonsList>
        {tagArchiveListNewer === null ? null : <WrappedButton
            classes={classes}
            link={archiveLinkBuilder(
                ig(tagArchiveListNewer, 'year'),
                ig(tagArchiveListNewer, 'month')
            )}
            text={ig(i18nButtons, 'nextMonth')}
        />}
        <WrappedButton
            classes={classes}
            link={backFromArchiveLinkBuilder()}
            text={ig(i18nButtons, 'topFilms')}
        />
    </Fragment>),

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
        linkBuilder,
        backFromArchiveLinkBuilder,
        archiveLinkBuilder,
        i18nOrdering,
        chooseSort,
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
            // pagination
            buttonsElements = range(1, pagesCount + 1).map(n =>
                <Link
                    key={n}
                    to={linkBuilder({pagination: n})}
                    className={g(classes, 'paginationLink')}
                >
                    <Button
                        classes={{
                            root: g(classes, 'paginationButtonRoot'),
                        }}
                        variant={n === pageNumber ? 'contained' : 'outlined'}
                        color="primary"
                    >
                        {n}
                    </Button>
                </Link>
            )

        return <Wrapper>
            <ControlButtons>
                {archiveFilms && ig(archiveFilms, 'currentlyActiveId') !== null
                    ? <ArchiveControlBar
                        classes={classes}
                        i18nButtons={i18nButtons}
                        buttonsElements={buttonsElements}
                        tagArchiveListOlder={tagArchiveListOlder}
                        tagArchiveListNewer={tagArchiveListNewer}
                        archiveLinkBuilder={archiveLinkBuilder}
                        backFromArchiveLinkBuilder={backFromArchiveLinkBuilder}
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
                        linkBuilder={linkBuilder}
                        archiveLinkBuilder={archiveLinkBuilder}
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
    withStyles(muiStyles),
    setPropTypes({
        classes: PropTypes.object,
        isSSR: PropTypes.bool,
        routerContext: routerContextModel.isOptional,
        i18nButtons: immutableI18nButtonsModel.isOptional,
        linkBuilder: PropTypes.func,
        archiveLinkBuilder: PropTypes.func,
        backFromArchiveLinkBuilder: PropTypes.func,
        i18nOrdering: immutableI18nOrderingModel.isOptional,
        chooseSort: PropTypes.func.isOptional,
        pagesCount: PropTypes.number,
        pageNumber: PropTypes.number,
        itemsCount: PropTypes.number,
        sortList: sortListModel,
        currentSort: PropTypes.string.isOptional, // could be not presented at all

        archiveFilms: immutableArchiveFilmsModel.isOptional, // could be not presented at all

        // could be not presented at all
        tagArchiveListOlder: ImmutablePropTypes.exact({
            month: PropTypes.string,
            year: PropTypes.string,
        }).isOptional,

        // could be not presented at all
        tagArchiveListNewer: ImmutablePropTypes.exact({
            month: PropTypes.string,
            year: PropTypes.string,
        }).isOptional,

        favoriteButtons: PropTypes.bool.isOptional, // could be not presented at all
    })
)(ControlBar)
