import {fromJS, List, Map, Record} from 'immutable'

import {ImmutablePropTypes, PropTypes, provedHandleActions, plainProvedGet as g} from '../helpers'
import {immutableVideoItemModel} from '../../generic/VideoItem/models'
import {immutableArchiveFilmsModel} from '../models'
import actions from './actions'

const
    model = ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        currentPage: PropTypes.string,
        lastSubPageForRequest: PropTypes.string,
        pageNumber: PropTypes.number,
        pageText: ImmutablePropTypes.exactRecordOf({
            description: PropTypes.string,
            headerDescription: PropTypes.string,
            headerTitle: PropTypes.nullable(PropTypes.string),
            keywords: PropTypes.string,
            listHeader: PropTypes.nullable(PropTypes.string),
            listHeaderEmpty: PropTypes.nullable(PropTypes.string),
            title: PropTypes.string,
        }),
        pagesCount: PropTypes.number,
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
    }),

    PageTextRecord = Record({
        description: '',
        headerDescription: '',
        headerTitle: null,
        keywords: '',
        listHeader: null,
        listHeaderEmpty: null,
        title: '',
    })

export default
    provedHandleActions(model, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            currentPage: '',
            lastSubPageForRequest: payload,
            pageNumber: 1,
            pageText: PageTextRecord(),
            pagesCount: 1,
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
                lastSubPageForRequest: g(payload, 'subPageForRequest'),
                pageNumber: g(payload, 'data', 'pageNumber'),
                pageText: PageTextRecord(g(payload, 'data', 'pageText')),
                pagesCount: g(payload, 'data', 'pagesCount'),
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
            pageNumber: 1,
            pageText: PageTextRecord(),
            pagesCount: 1,
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
        lastSubPageForRequest: '',
        pageNumber: 1,
        pageText: PageTextRecord(),
        pagesCount: 1,
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
