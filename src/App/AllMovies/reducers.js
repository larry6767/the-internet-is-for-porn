import {fromJS, List, Map} from 'immutable'

import {provedHandleActions, plainProvedGet as g} from '../helpers'
import actions from './actions'

import {model} from './models'

export default
    provedHandleActions(model, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            currentPage: '',
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageNumber: 1,
            pageText: Map(),
            pagesCount: 1,
            sponsorsList: List(),
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
                lastPageRequestParams: g(payload, 'pageRequestParams'),
                pageNumber: g(payload, 'data', 'pageNumber'),
                pageText: Map(g(payload, 'data', 'pageText')),
                pagesCount: g(payload, 'data', 'pagesCount'),
                sponsorsList: List(fromJS(g(payload, 'data', 'sponsorsList'))),
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
            pageText: Map(),
            pagesCount: 1,
            sponsorsList: List(),
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
        lastPageRequestParams: null,
        pageNumber: 1,
        pageText: {},
        pagesCount: 1,
        sponsorsList: List(),
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
