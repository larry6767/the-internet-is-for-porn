import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, onlyUpdateForKeys, withPropsOnChange} from 'recompose'
import {withStyles} from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

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
    immutableI18nSponsorModel,
    immutableI18nDurationModel,
} from 'src/App/models'

import WrappedButton from 'src/generic/WrappedButton'
import SortSelect from 'src/generic/SortSelect'
import {muiStyles} from 'src/generic/ControlBar/assets/muiStyles'

import {
    Wrapper,
    ControlButtons,
    SortWrapper,
} from 'src/generic/ControlBar/assets'

const
    NicheControlBar = setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classedBounds: PropTypes.shape({typography: PropTypes.object}),
        cb: PropTypes.oneOf(breakpoints).isOptional,
        pageNumber: PropTypes.number,
        pagesCount: PropTypes.number,
        archiveLinkBuilder: PropTypes.nullable(PropTypes.func),
        i18nButtons: immutableI18nButtonsModel,
        isSSR: PropTypes.bool,
        archiveFilms: PropTypes.nullable(immutableArchiveFilmsModel),

        linkBuilder: PropTypes.func,
        chooseSort: PropTypes.func,
        i18nOrdering: immutableI18nOrderingModel,
        i18nDuration: immutableI18nDurationModel,
        i18nSponsor: immutableI18nSponsorModel,
        sortList: immutableSortListModel,
        durationList: immutableSortListModel,
        sponsorsList: immutableSortListModel,
    })(({
        classedBounds,
        cb,
        pageNumber,
        pagesCount,
        linkBuilder,
        archiveLinkBuilder,
        i18nButtons,
        isSSR,
        chooseSort,
        archiveFilms,

        i18nOrdering,
        i18nDuration,
        i18nSponsor,
        sortList,
        durationList,
        sponsorsList,
    }) => <Fragment>
        { ! g(sortList, 'size') ? null : <SortSelect
            isInlined={true}
                isSSR={isSSR}
            classedBounds={classedBounds}
            chooseSort={chooseSort}
            name={'ordering'}
            sortList={sortList}
            linkBuilder={linkBuilder}
            i18n={i18nOrdering}
        />}

        { ! g(durationList, 'size') ? null : <SortSelect
            isSSR={isSSR}
            classedBounds={classedBounds}
            chooseSort={chooseSort}
            name={'duration'}
            sortList={durationList}
            linkBuilder={linkBuilder}
            i18n={i18nDuration}
        />}
        { ! g(sponsorsList, 'size') ? null : <SortSelect
            isSSR={isSSR}
            classedBounds={classedBounds}
            chooseSort={chooseSort}
            name={'sponsor'}
            sortList={sponsorsList}
            linkBuilder={linkBuilder}
            i18n={i18nSponsor}
        />}
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
        classedBounds,
        cb,
        isSSR,
        pageNumber,
        pagesCount,
        linkBuilder,
        i18nButtons,
        i18nSponsor,
        i18nDuration,
        tagArchiveListOlder,
        tagArchiveListNewer,
        archiveLinkBuilder,
        backFromArchiveLinkBuilder,
        sponsorsList,
        chooseSort,
    }) => <Fragment>
        <WrappedButton
            link={backFromArchiveLinkBuilder()}
            text={ig(i18nButtons, 'topFilms')}
        />
        <SortWrapper>
            {ccb(cb, sm) === -1 ? null : <Typography
                variant="body1"
                classes={g(classedBounds, 'typography')}
            >
                {`${ig(i18nSponsor, 'label')}:`}
            </Typography>}

            {/* {isSSR
                ? <SponsorsSelectInlined
                    sponsorsList={sponsorsList}
                    linkBuilder={linkBuilder}
                    currentSponsor={currentSponsor}
                    all={ig(i18nSponsor, 'all')}
                />
                : <SponsorsSelectMaterial
                    classedBounds={classedBounds}
                    sponsorsList={sponsorsList}
                    chooseSort={chooseSort}
                    currentSponsor={currentSponsor}
                    all={ig(i18nSponsor, 'all')}
                />
            } */}
        </SortWrapper>
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
        i18nSponsor,
        i18nDuration,
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

        archiveFilms,
        tagArchiveListOlder,
        tagArchiveListNewer,
        favoriteButtons,

        sortList,
        durationList,
        sponsorsList,
    }) => <Wrapper isDownBelow={isDownBelow}>
        <ControlButtons>
            {archiveFilms && ig(archiveFilms, 'currentlyActiveId') !== null
                ? <ArchiveControlBar
                    classedBounds={classedBounds}
                    cb={cb}
                    isSSR={isSSR}
                    pageNumber={pageNumber}
                    pagesCount={pagesCount}
                    i18nButtons={i18nButtons}
                    i18nSponsor={i18nSponsor}
                    i18nDuration={i18nDuration}
                    tagArchiveListOlder={tagArchiveListOlder}
                    tagArchiveListNewer={tagArchiveListNewer}
                    linkBuilder={linkBuilder}
                    archiveLinkBuilder={archiveLinkBuilder}
                    backFromArchiveLinkBuilder={backFromArchiveLinkBuilder}
                    chooseSort={chooseSort}

                    durationList={durationList}
                    sponsorsList={sponsorsList}
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
                    i18nSponsor={i18nSponsor}
                    i18nDuration={i18nDuration}
                    i18nButtons={i18nButtons}
                    isSSR={isSSR}
                    chooseSort={chooseSort}
                    archiveFilms={archiveFilms}

                    sortList={sortList}
                    durationList={durationList}
                    sponsorsList={sponsorsList}
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
            i18nSponsor: ig(state, 'app', 'locale', 'i18n', 'sponsor'),
            i18nDuration: ig(state, 'app', 'locale', 'i18n', 'duration'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
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
        i18nSponsor: immutableI18nSponsorModel,
        i18nDuration: immutableI18nDurationModel,
        i18nButtons: immutableI18nButtonsModel,

        isDownBelow: PropTypes.bool.isOptional,

        linkBuilder: PropTypes.func,
        archiveLinkBuilder: PropTypes.func.isOptional,
        backFromArchiveLinkBuilder: PropTypes.func.isOptional,
        favoriteLinkBuilder: PropTypes.func.isOptional,

        chooseSort: PropTypes.func.isOptional,
        pagesCount: PropTypes.number,
        pageNumber: PropTypes.number,
        itemsCount: PropTypes.number,

        archiveFilms: immutableArchiveFilmsModel.isOptional, // could be not presented at all

        // could be not presented at all
        tagArchiveListOlder: immutableTagArchiveListOlderOrNewerModel,

        // could be not presented at all
        tagArchiveListNewer: immutableTagArchiveListOlderOrNewerModel,

        favoriteButtons: PropTypes.exact({
            movies: PropTypes.bool,
            pornstars: PropTypes.bool,
        }).isOptional, // could be not presented at all

        sortList: immutableSortListModel.isOptional, // could be not presented at all
        durationList: immutableSortListModel.isOptional,
        sponsorsList: immutableSortListModel.isOptional,
    }),
)(ControlBar)
