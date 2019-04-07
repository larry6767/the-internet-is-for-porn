import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, onlyUpdateForKeys} from 'recompose'

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
    immutableI18nOrderingModel,
    immutableI18nButtonsModel,
    immutableArchiveFilmsModel,
    immutableI18nSponsorModel,
    immutableI18nDurationModel,
} from 'src/App/models'

import WrappedButton from 'src/generic/WrappedButton'
import SortSelect from 'src/generic/SortSelect'
import {Wrapper, ControlButtons} from 'src/generic/ControlBar/assets'

const
    ControlBar = ({
        cb,
        isSSR,
        i18nButtons,
        i18nOrdering,
        i18nDuration,
        i18nSponsor,
        sortList,
        durationList,
        sponsorsList,
        chooseSort,
        linkBuilder,
        backFromArchiveLinkBuilder,
        favoriteLinkBuilder,
        archiveFilms,
        favoriteButtons,
    }) => <Wrapper>
        <ControlButtons>
            {favoriteButtons ? <Fragment>
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
            </Fragment>
            : <Fragment>
                { ! (archiveFilms && ig(archiveFilms, 'currentlyActiveId') !== null) ? null :
                    <WrappedButton
                        link={backFromArchiveLinkBuilder()}
                        text={ig(i18nButtons, 'topFilms')}
                    />}

                {! g(sortList, 'size') ? null : <SortSelect
                    isInlined={true}
                    cb={cb}
                    isSSR={isSSR}
                    name={'ordering'}
                    i18n={i18nOrdering}
                    sortList={sortList}
                    chooseSort={chooseSort}
                    linkBuilder={linkBuilder}
                />}

                { ! g(durationList, 'size') ? null : <SortSelect
                    isInlined={true}
                    cb={cb}
                    isSSR={isSSR}
                    name={'duration'}
                    i18n={i18nDuration}
                    sortList={durationList}
                    chooseSort={chooseSort}
                    linkBuilder={linkBuilder}
                />}
                { ! g(sponsorsList, 'size') ? null : <SortSelect
                    cb={cb}
                    isSSR={isSSR}
                    name={'sponsor'}
                    i18n={i18nSponsor}
                    sortList={sponsorsList}
                    chooseSort={chooseSort}
                    linkBuilder={linkBuilder}
                />}
            </Fragment>}
        </ControlButtons>
    </Wrapper>

export default compose(
    connect(
        state => ({
            cb: ig(state, 'app', 'ui', 'currentBreakpoint'),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nSponsor: ig(state, 'app', 'locale', 'i18n', 'sponsor'),
            i18nDuration: ig(state, 'app', 'locale', 'i18n', 'duration'),
        }),
    ),
    onlyUpdateForKeys(['cb']),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        cb: PropTypes.oneOf(breakpoints).isOptional,
        isSSR: PropTypes.bool,
        i18nButtons: immutableI18nButtonsModel,
        i18nOrdering: immutableI18nOrderingModel,
        i18nDuration: immutableI18nDurationModel,
        i18nSponsor: immutableI18nSponsorModel,
        sortList: immutableSortListModel.isOptional, // could be not presented at all
        durationList: immutableSortListModel.isOptional,
        sponsorsList: immutableSortListModel.isOptional,
        chooseSort: PropTypes.func.isOptional,
        linkBuilder: PropTypes.func,
        backFromArchiveLinkBuilder: PropTypes.func.isOptional,
        favoriteLinkBuilder: PropTypes.func.isOptional,

        archiveFilms: immutableArchiveFilmsModel.isOptional, // could be not presented at all

        favoriteButtons: PropTypes.exact({
            movies: PropTypes.bool,
            pornstars: PropTypes.bool,
        }).isOptional, // could be not presented at all
    }),
)(ControlBar)
