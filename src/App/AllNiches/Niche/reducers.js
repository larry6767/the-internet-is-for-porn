import {fromJS, List, Map} from 'immutable'

import {
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
    plainProvedGet as g,
} from '../../helpers'

import {
    immutableArchiveFilmsModel,
    immutablePageTextModel,
    PageTextRecord,
    orientationCodes,
    defaultOrientationCode,
} from '../../models'

import {immutableVideoItemModel} from '../../../generic/VideoItem/models'
import actions from './actions'

const
    stateModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,

        currentPage: PropTypes.string,
        currentSubPage: PropTypes.string,
        lastOrientationCode: PropTypes.oneOf(orientationCodes),
        lastSubPageForRequest: PropTypes.string,

        pageNumber: PropTypes.number,
        pagesCount: PropTypes.number,

        pageText: immutablePageTextModel,

        tagList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
            id: PropTypes.number,
            name: PropTypes.string,
            subPage: PropTypes.string,
            itemsCount: PropTypes.number,
        })),

        tagArchiveList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
            archiveDate: PropTypes.number,
            year: PropTypes.number,
            month: PropTypes.string,
            monthNumber: PropTypes.number,
            itemsCount: PropTypes.number,
            url: PropTypes.string,
        })),

        sortList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
            isActive: PropTypes.bool,
            code: PropTypes.string,
        })),

        currentSort: PropTypes.nullable(PropTypes.string),

        archiveFilms: PropTypes.nullable(immutableArchiveFilmsModel),
        tagArchiveListOlder: PropTypes.nullable(ImmutablePropTypes.exact({
            month: PropTypes.string,
            year: PropTypes.string,
        })),
        tagArchiveListNewer: PropTypes.nullable(ImmutablePropTypes.exact({
            month: PropTypes.string,
            year: PropTypes.string,
        })),

        itemsCount: PropTypes.number,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    })

export default
    provedHandleActions(stateModel, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            currentPage: '',
            currentSubPage: '',
            lastOrientationCode: g(payload, 'orientationCode'),
            lastSubPageForRequest: g(payload, 'subPageForRequest'),
            pageNumber: 1,
            pagesCount: 1,
            pageText: PageTextRecord(),
            tagList: List(),
            tagArchiveList: List(),
            sortList: List(),
            currentSort: null,
            archiveFilms: null,
            tagArchiveListOlder: null,
            tagArchiveListNewer: null,
            itemsCount: 0,
            videoList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => {
            const
                archiveFilms = g(payload, 'data', 'archiveFilms'),
                tagArchiveListOlder = g(payload, 'data', 'tagArchiveListOlder'),
                tagArchiveListNewer = g(payload, 'data', 'tagArchiveListNewer')

            return state.merge({
                isLoading: false,
                isLoaded: true,
                isFailed: false,
                currentPage: g(payload, 'data', 'currentPage'),
                currentSubPage: g(payload, 'data', 'currentSubPage'),
                lastOrientationCode: g(payload, 'orientationCode'),
                lastSubPageForRequest: g(payload, 'subPageForRequest'),
                pageNumber: g(payload, 'data', 'pageNumber'),
                pagesCount: g(payload, 'data', 'pagesCount'),
                pageText: PageTextRecord(g(payload, 'data', 'pageText')),
                tagList: List(fromJS(g(payload, 'data', 'tagList'))),
                tagArchiveList: List(fromJS(g(payload, 'data', 'tagArchiveList'))),
                sortList: List(fromJS(g(payload, 'data', 'sortList'))),
                currentSort: g(payload, 'data', 'currentSort'),
                archiveFilms: archiveFilms && Map(fromJS(archiveFilms)),
                tagArchiveListOlder: tagArchiveListOlder && Map(fromJS(tagArchiveListOlder)),
                tagArchiveListNewer: tagArchiveListNewer && Map(fromJS(tagArchiveListNewer)),
                itemsCount: g(payload, 'data', 'itemsCount'),
                videoList: List(fromJS(g(payload, 'data', 'videoList'))),
            })
        },
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            currentPage: '',
            currentSubPage: '',
            pageNumber: 1,
            pagesCount: 1,
            pageText: PageTextRecord(),
            tagList: List(),
            tagArchiveList: List(),
            sortList: List(),
            currentSort: null,
            archiveFilms: null,
            tagArchiveListOlder: null,
            tagArchiveListNewer: null,
            itemsCount: 0,
            videoList: List(),
        }),
        [g(actions, 'setNewSort')]: (state, {payload}) =>
            state.set('currentSort', g(payload, 'newSortValue')),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        currentPage: '',
        currentSubPage: '',
        lastOrientationCode: defaultOrientationCode,
        lastSubPageForRequest: '',
        pageNumber: 1,
        pagesCount: 1,
        pageText: PageTextRecord(),
        tagList: [],
        tagArchiveList: [],
        sortList: [],
        currentSort: null,
        archiveFilms: null,
        tagArchiveListOlder: null,
        tagArchiveListNewer: null,
        itemsCount: 0,
        videoList: [],
    }))
