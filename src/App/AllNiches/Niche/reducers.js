import {fromJS, List, Map} from 'immutable'

import {
    ImmutablePropTypes,
    PropTypes,
    provedHandleActions,
    plainProvedGet as g,
} from '../../helpers'

import {immutableVideoItemModel} from '../../../generic/VideoItem/models'
import actions from './actions'

const
    stateModel = ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,

        currentPage: PropTypes.string,
        currentSubPage: PropTypes.string,
        lastSubPageForRequest: PropTypes.string,

        pageNumber: PropTypes.number,
        pagesCount: PropTypes.number,

        pageText: ImmutablePropTypes.exact({
            description: PropTypes.string,
            headerDescription: PropTypes.string,
            headerTitle: PropTypes.string.isOptional,
            keywords: PropTypes.string,
            listHeader: PropTypes.string.isOptional,
            listHeaderEmpty: PropTypes.string.isOptional,
            title: PropTypes.string,
            galleryTitle: PropTypes.string.isOptional,
        }),

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

        currentSort: PropTypes.string.isOptional, // may be `null`

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

        itemsCount: PropTypes.number,
        videoList: ImmutablePropTypes.listOf(immutableVideoItemModel),
    }),

    emptyPageText = fromJS({
        description: '',
        headerDescription: '',
        headerTitle: null,
        keywords: '',
        listHeader: null,
        listHeaderEmpty: null,
        title: '',
        galleryTitle: null,
    })

export default
    provedHandleActions(stateModel, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            currentPage: '',
            currentSubPage: '',
            lastSubPageForRequest: payload,
            pageNumber: 1,
            pagesCount: 1,
            pageText: emptyPageText,
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
                lastSubPageForRequest: g(payload, 'subPageForRequest'),
                pageNumber: g(payload, 'data', 'pageNumber'),
                pagesCount: g(payload, 'data', 'pagesCount'),
                pageText: Map(fromJS(g(payload, 'data', 'pageText'))),
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
            pageText: emptyPageText,
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
        lastSubPageForRequest: '',
        pageNumber: 1,
        pagesCount: 1,
        pageText: emptyPageText,
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
