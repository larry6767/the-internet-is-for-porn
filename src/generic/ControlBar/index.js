import React, {Fragment} from 'react'
import {compose, onlyUpdateForKeys, withPropsOnChange} from 'recompose'
import {withStyles} from '@material-ui/core/styles'

import {
    Typography,
    Select,
    MenuItem,
    OutlinedInput,
} from '@material-ui/core'

import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    setPropTypes,
    compareCurrentBreakpoint as ccb,
    breakpointSM as sm,
    breakpoints,
} from '../../App/helpers'

import {
    immutableSortListModel,
    immutableTagArchiveListOlderOrNewerModel,
    immutableI18nOrderingModel,
    immutableI18nButtonsModel,
    immutableArchiveFilmsModel,
} from '../../App/models'

import Pagination from '../Pagination'
import WrappedButton from '../WrappedButton'

import {muiStyles} from './assets/muiStyles'

import {
    Wrapper,
    ControlButtons,
    SortWrapper,
    InlinedSelectionWrap,
    InlinedSelectionList,
    InlinedSelectionItem,
} from './assets'

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
        <Pagination
            cb={cb}
            pageNumber={pageNumber}
            pagesCount={pagesCount}
            linkBuilder={linkBuilder}
            i18nButtons={i18nButtons}
        />

        {archiveFilms === null ? null : <WrappedButton
            link={archiveLinkBuilder(ig(archiveFilms, 'year'), ig(archiveFilms, 'month'))}
            text={ig(i18nButtons, 'archive')}
        />}
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
        {tagArchiveListOlder === null ? null : <WrappedButton
            link={archiveLinkBuilder(
                ig(tagArchiveListOlder, 'year'),
                ig(tagArchiveListOlder, 'month')
            )}
            text={ig(i18nButtons, 'previousMonth')}
        />}

        <Pagination
            cb={cb}
            pageNumber={pageNumber}
            pagesCount={pagesCount}
            linkBuilder={linkBuilder}
            i18nButtons={i18nButtons}
        />

        {tagArchiveListNewer === null ? null : <WrappedButton
            link={archiveLinkBuilder(
                ig(tagArchiveListNewer, 'year'),
                ig(tagArchiveListNewer, 'month')
            )}
            text={ig(i18nButtons, 'nextMonth')}
        />}
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
        {pagesCount === 1 || pagesCount === 0 ? null :
            <Pagination
                cb={cb}
                pageNumber={pageNumber}
                pagesCount={pagesCount}
                linkBuilder={linkBuilder}
                i18nButtons={i18nButtons}
            />}

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

    ShowedElements = ({
        itemsCount, pageNumber, i18nLabelShowing
    }) => <Typography variant="body1" gutterBottom>
        {`${i18nLabelShowing
            } ${itemsCount * pageNumber - (itemsCount - 1)} - ${itemsCount * pageNumber}`}
    </Typography>,

    ControlBar = ({
        classedBounds,
        isSSR,
        cb,

        i18nOrdering,
        i18nButtons,
        i18nLabelShowing,

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
    }) => <Wrapper>
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
        <ShowedElements
            itemsCount={itemsCount}
            pageNumber={pageNumber}
            i18nLabelShowing={i18nLabelShowing}
        />
    </Wrapper>

export default compose(
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
        isSSR: PropTypes.bool,
        cb: PropTypes.oneOf(breakpoints).isOptional,

        i18nOrdering: immutableI18nOrderingModel.isOptional,
        i18nButtons: immutableI18nButtonsModel,
        i18nLabelShowing: PropTypes.string,

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
    }),
)(ControlBar)
