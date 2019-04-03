import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, onlyUpdateForKeys, withPropsOnChange} from 'recompose'
import {withStyles} from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'

// local libs
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    setPropTypes,
    compareCurrentBreakpoint as ccb,
    breakpointSM as sm,
    breakpoints,
} from 'src/App/helpers'

import {
    immutableSortListModel,
    immutableTagArchiveListOlderOrNewerModel,
    immutableI18nOrderingModel,
    immutableI18nButtonsModel,
    immutableArchiveFilmsModel,
    immutableSponsorsListModel,
} from 'src/App/models'

import WrappedButton from 'src/generic/WrappedButton'
import {muiStyles} from 'src/generic/ControlBar/assets/muiStyles'

import {
    Wrapper,
    ControlButtons,
    SortWrapper,
    InlinedSelectionWrap,
    InlinedSelectionList,
    InlinedSelectionItem,
} from 'src/generic/ControlBar/assets'

const
    SortSelectMaterial = setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classedBounds: PropTypes.shape({select: PropTypes.object}),
        i18nOrdering: immutableI18nOrderingModel,
        sortList: immutableSortListModel,
        chooseSort: PropTypes.func,
        currentSort: PropTypes.nullable(PropTypes.string),
    })(({classedBounds, i18nOrdering, sortList, chooseSort, currentSort}) => <Select
        classes={g(classedBounds, 'select')}
        value={currentSort || ''}
        input={<OutlinedInput onChange={chooseSort} labelWidth={0}/>}
    >
        {sortList.map(x =>
            <MenuItem key={ig(x, 'code')} value={ig(x, 'code')}>
                {ig(i18nOrdering, ig(x, 'code'))}
            </MenuItem>
        )}
    </Select>),

    SortSelectInlined = setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        sortList: immutableSortListModel,
        linkBuilder: PropTypes.func,
        i18nOrdering: immutableI18nOrderingModel,
    })(({sortList, linkBuilder, i18nOrdering}) => <InlinedSelectionWrap>
        <InlinedSelectionList>
            {sortList.map(x =>
                <InlinedSelectionItem
                    key={ig(x, 'code')}
                    href={linkBuilder({ordering: ig(x, 'code'), pagination: null})}
                    isActive={ig(x, 'isActive')}
                >
                    {ig(i18nOrdering, ig(x, 'code'))}
                </InlinedSelectionItem>
            )}
        </InlinedSelectionList>
    </InlinedSelectionWrap>),

    NicheControlBar = setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classedBounds: PropTypes.shape({typography: PropTypes.object}),
        cb: PropTypes.oneOf(breakpoints).isOptional,
        pageNumber: PropTypes.number,
        pagesCount: PropTypes.number,
        linkBuilder: PropTypes.func,
        archiveLinkBuilder: PropTypes.nullable(PropTypes.func),
        i18nOrdering: immutableI18nOrderingModel,
        i18nButtons: immutableI18nButtonsModel,
        isSSR: PropTypes.bool,
        chooseSort: PropTypes.func,
        sortList: immutableSortListModel,
        currentSort: PropTypes.nullable(PropTypes.string),
        archiveFilms: PropTypes.nullable(immutableArchiveFilmsModel),
    })(({
        classedBounds,
        cb,
        pageNumber,
        pagesCount,
        linkBuilder,
        archiveLinkBuilder,
        i18nOrdering,
        i18nButtons,
        isSSR,
        chooseSort,
        sortList,
        currentSort,
        archiveFilms,
    }) => <Fragment>
        <SortWrapper>
            {ccb(cb, sm) === -1 ? null : <Typography
                variant="body1"
                classes={g(classedBounds, 'typography')}
            >
                {`${ig(i18nOrdering, 'label')}:`}
            </Typography>}

            {isSSR
                ? <SortSelectInlined
                    sortList={sortList}
                    linkBuilder={linkBuilder}
                    i18nOrdering={i18nOrdering}
                />
                : <SortSelectMaterial
                    classedBounds={classedBounds}
                    i18nOrdering={i18nOrdering}
                    sortList={sortList}
                    chooseSort={chooseSort}
                    currentSort={currentSort}
                />
            }
        </SortWrapper>
    </Fragment>),

    ArchiveControlBar = setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        cb: PropTypes.oneOf(breakpoints).isOptional,
        pageNumber: PropTypes.number,
        pagesCount: PropTypes.number,
        linkBuilder: PropTypes.func,

        i18nButtons: immutableI18nButtonsModel,

        tagArchiveListOlder: immutableTagArchiveListOlderOrNewerModel,
        tagArchiveListNewer: immutableTagArchiveListOlderOrNewerModel,

        archiveLinkBuilder: PropTypes.func,
        backFromArchiveLinkBuilder: PropTypes.func,
    })(({
        cb,
        pageNumber,
        pagesCount,
        linkBuilder,
        i18nButtons,
        tagArchiveListOlder,
        tagArchiveListNewer,
        archiveLinkBuilder,
        backFromArchiveLinkBuilder,
    }) => <Fragment>
        <WrappedButton
            link={backFromArchiveLinkBuilder()}
            text={ig(i18nButtons, 'topFilms')}
        />
    </Fragment>),

    FavoriteControlBar = setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        cb: PropTypes.oneOf(breakpoints).isOptional,
        pageNumber: PropTypes.number,
        pagesCount: PropTypes.number,
        linkBuilder: PropTypes.func,
        i18nButtons: immutableI18nButtonsModel,
        favoriteButtons: PropTypes.exact({
            movies: PropTypes.bool,
            pornstars: PropTypes.bool,
        }),
    })(({
        cb,
        pageNumber,
        pagesCount,
        linkBuilder,
        favoriteLinkBuilder,
        i18nButtons,
        favoriteButtons,
    }) => <Fragment>
        <WrappedButton
            link={favoriteLinkBuilder('favorite')}
            text={ig(i18nButtons, 'favoriteMovies')}
            variant={g(favoriteButtons, 'movies') ? 'contained' : 'outlined'}
        />

        <WrappedButton
            link={favoriteLinkBuilder('favoritePornstars')}
            text={ig(i18nButtons, 'favoritePornstars')}
            variant={g(favoriteButtons, 'pornstars') ? 'contained' : 'outlined'}
        />
    </Fragment>),

    ControlBar = ({
        classedBounds,
        cb,
        isSSR,
        i18nOrdering,
        i18nButtons,
        i18nLabelShowing,

        isDownBelow = false,

        linkBuilder,
        backFromArchiveLinkBuilder,
        archiveLinkBuilder,
        favoriteLinkBuilder,

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
    }) => <Wrapper isDownBelow={isDownBelow}>
        <ControlButtons>
            {archiveFilms && ig(archiveFilms, 'currentlyActiveId') !== null
                ? <ArchiveControlBar
                    classedBounds={classedBounds}
                    cb={cb}
                    pageNumber={pageNumber}
                    pagesCount={pagesCount}
                    i18nButtons={i18nButtons}
                    tagArchiveListOlder={tagArchiveListOlder}
                    tagArchiveListNewer={tagArchiveListNewer}
                    linkBuilder={linkBuilder}
                    archiveLinkBuilder={archiveLinkBuilder}
                    backFromArchiveLinkBuilder={backFromArchiveLinkBuilder}
                />
                : favoriteButtons
                ? <FavoriteControlBar
                    classedBounds={classedBounds}
                    cb={cb}
                    pageNumber={pageNumber}
                    pagesCount={pagesCount}
                    linkBuilder={linkBuilder}
                    favoriteLinkBuilder={favoriteLinkBuilder}
                    i18nButtons={i18nButtons}
                    favoriteButtons={favoriteButtons}
                />
                : <NicheControlBar
                    classedBounds={classedBounds}
                    cb={cb}
                    pageNumber={pageNumber}
                    pagesCount={pagesCount}
                    linkBuilder={linkBuilder}
                    archiveLinkBuilder={archiveLinkBuilder}
                    i18nOrdering={i18nOrdering}
                    i18nButtons={i18nButtons}
                    isSSR={isSSR}
                    chooseSort={chooseSort}
                    sortList={sortList}
                    currentSort={currentSort}
                    archiveFilms={archiveFilms}
                />
            }
        </ControlButtons>
    </Wrapper>

export default compose(
    connect(
        state => ({
            cb: ig(state, 'app', 'ui', 'currentBreakpoint'),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nLabelShowing: ig(state, 'app', 'locale', 'i18n', 'labels', 'showing'),
        }),
    ),
    onlyUpdateForKeys(['cb']),
    withStyles(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            select: Object.freeze({select: g(props, 'classes', 'selectRoot')}),
            typography: Object.freeze({root: g(props, 'classes', 'typographyRoot')}),
        }),
    })),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            typographyRoot: PropTypes.string,
            selectRoot: PropTypes.string,
        }),
        classedBounds: PropTypes.exact({
            select: PropTypes.object,
            typography: PropTypes.object,
        }),
        cb: PropTypes.oneOf(breakpoints).isOptional,
        isSSR: PropTypes.bool,
        i18nOrdering: immutableI18nOrderingModel,
        i18nButtons: immutableI18nButtonsModel,
        i18nLabelShowing: PropTypes.string,

        isDownBelow: PropTypes.bool.isOptional,

        linkBuilder: PropTypes.func,
        archiveLinkBuilder: PropTypes.func.isOptional,
        backFromArchiveLinkBuilder: PropTypes.func.isOptional,
        favoriteLinkBuilder: PropTypes.func.isOptional,

        chooseSort: PropTypes.func.isOptional,
        pagesCount: PropTypes.number,
        pageNumber: PropTypes.number,
        itemsCount: PropTypes.number,
        sortList: immutableSortListModel.isOptional, // could be not presented at all
        currentSort: PropTypes.string.isOptional, // could be not presented at all

        archiveFilms: immutableArchiveFilmsModel.isOptional, // could be not presented at all

        // could be not presented at all
        tagArchiveListOlder: immutableTagArchiveListOlderOrNewerModel,

        // could be not presented at all
        tagArchiveListNewer: immutableTagArchiveListOlderOrNewerModel,

        favoriteButtons: PropTypes.exact({
            movies: PropTypes.bool,
            pornstars: PropTypes.bool,
        }).isOptional, // could be not presented at all
        sponsorsList: immutableSponsorsListModel,
    }),
)(ControlBar)
