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
            nichesListWithLetter: List(),
            tagArchiveList: List(),
            sortList: List(),
            archiveFilms: null,
            tagArchiveListOlder: null,
            tagArchiveListNewer: null,
            itemsCount: 0,
            videoList: List(),
            randomWidthList: null,
            sponsorsList: List(),
            durationList: List(),
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
                nichesListWithLetter: List(fromJS(g(payload, 'data', 'nichesListWithLetter'))),
                tagArchiveList: List(fromJS(g(payload, 'data', 'tagArchiveList'))),
                sortList: List(fromJS(g(payload, 'data', 'sortList'))),
                archiveFilms: archiveFilms && Map(fromJS(archiveFilms)),
                tagArchiveListOlder: tagArchiveListOlder && Map(fromJS(tagArchiveListOlder)),
                tagArchiveListNewer: tagArchiveListNewer && Map(fromJS(tagArchiveListNewer)),
                itemsCount: g(payload, 'data', 'itemsCount'),
                videoList: List(fromJS(g(payload, 'data', 'videoList'))),
                sponsorsList: List(fromJS(g(payload, 'data', 'sponsorsList'))),
                durationList: List(fromJS(g(payload, 'data', 'durationList'))),
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
            nichesListWithLetter: List(),
            tagArchiveList: List(),
            sortList: List(),
            archiveFilms: null,
            tagArchiveListOlder: null,
            tagArchiveListNewer: null,
            itemsCount: 0,
            videoList: List(),
            randomWidthList: null,
            sponsorsList: List(),
            durationList: List(),
        }),
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
        nichesListWithLetter: [],
        tagArchiveList: [],
        sortList: [],
        archiveFilms: null,
        tagArchiveListOlder: null,
        tagArchiveListNewer: null,
        itemsCount: 0,
        videoList: [],
        randomWidthList: null,
        sponsorsList: [],
        durationList: [],
    }))
