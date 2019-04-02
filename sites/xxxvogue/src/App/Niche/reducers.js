import {fromJS, List, Map} from 'immutable'

// local libs
import {provedHandleActions, plainProvedGet as g} from 'src/App/helpers'
import {model} from 'src/App/Niche/models'
import actions from 'src/App/Niche/actions'

export default
    provedHandleActions(model, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            tagId: 0,
            currentPage: '',
            currentSubPage: '',
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageNumber: 1,
            pagesCount: 1,
            pageText: null,
            sponsorsList: List(),
            nichesListWithLetter: List(),
            tagArchiveList: List(),
            sortList: List(),
            currentSort: null,
            archiveFilms: null,
            tagArchiveListOlder: null,
            tagArchiveListNewer: null,
            itemsCount: 0,
            videoList: List(),
            randomWidthList: null,
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
                tagId: g(payload, 'data', 'tagId'),
                currentPage: g(payload, 'data', 'currentPage'),
                currentSubPage: g(payload, 'data', 'currentSubPage'),
                lastPageRequestParams: g(payload, 'pageRequestParams'),
                pageNumber: g(payload, 'data', 'pageNumber'),
                pagesCount: g(payload, 'data', 'pagesCount'),
                pageText: Map(g(payload, 'data', 'pageText')),
                sponsorsList: List(fromJS(g(payload, 'data', 'sponsorsList'))),
                nichesListWithLetter: List(fromJS(g(payload, 'data', 'nichesListWithLetter'))),
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
            tagId: 0,
            currentPage: '',
            currentSubPage: '',
            pageNumber: 1,
            pagesCount: 1,
            pageText: null,
            sponsorsList: List(),
            nichesListWithLetter: List(),
            tagArchiveList: List(),
            sortList: List(),
            currentSort: null,
            archiveFilms: null,
            tagArchiveListOlder: null,
            tagArchiveListNewer: null,
            itemsCount: 0,
            videoList: List(),
            randomWidthList: null,
        }),
        [g(actions, 'setNewSort')]: (state, {payload}) =>
            state.set('currentSort', g(payload, 'newSortValue')),

        [g(actions, 'setRandomWidthList')]: (state, {payload}) =>
            state.set('randomWidthList', List(g(payload, 'randomWidthList')))
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        tagId: 0,
        currentPage: '',
        currentSubPage: '',
        lastPageRequestParams: null,
        pageNumber: 1,
        pagesCount: 1,
        pageText: null,
        sponsorsList: List(),
        nichesListWithLetter: [],
        tagArchiveList: [],
        sortList: [],
        currentSort: null,
        archiveFilms: null,
        tagArchiveListOlder: null,
        tagArchiveListNewer: null,
        itemsCount: 0,
        videoList: [],
        randomWidthList: null,
    }))
