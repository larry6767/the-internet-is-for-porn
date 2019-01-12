import {fromJS, List, Map} from 'immutable'

import {ImmutablePropTypes, PropTypes, provedHandleActions, plainProvedGet as g} from '../helpers'
import {immutableVideoItemModel} from '../../generic/VideoItem/models'
import actions from './actions'

const
    model = ImmutablePropTypes.exact({
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        isFailed: PropTypes.bool,
        currentPage: PropTypes.string,
        lastSubPageForRequest: PropTypes.string,
        pageNumber: PropTypes.number,
        pageText: ImmutablePropTypes.exact({
            description: PropTypes.string,
            headerDescription: PropTypes.string,
            headerTitle: PropTypes.string,
            keywords: PropTypes.string,
            listHeader: PropTypes.string,
            listHeaderEmpty: PropTypes.string,
            title: PropTypes.string,
            galleryTitle: PropTypes.string.isOptional,
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
            active: PropTypes.bool,
            value: PropTypes.string,

            // TODO FIXME it's optional only because of lack of localized titles mapping
            localText: PropTypes.string.isOptional,
        })),
        currentSort: PropTypes.string,
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
        headerTitle: '',
        keywords: '',
        listHeader: '',
        listHeaderEmpty: '',
        title: '',
        galleryTitle: null,
    })

export default
    provedHandleActions(model, {
        [actions.loadPageRequest]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            currentPage: '',
            lastSubPageForRequest: payload,
            pageNumber: 1,
            pageText: emptyPageText,
            pagesCount: 1,
            tagList: List(),
            tagArchiveList: List(),
            sortList: List(),
            currentSort: '',
            archiveFilms: null,
            tagArchiveListOlder: null,
            tagArchiveListNewer: null,
            itemsCount: 0,
            videoList: List(),
        }),
        [actions.loadPageSuccess]: (state, {payload: {data, subPageForRequest}}) => {
            const
                archiveFilms = g(data, 'archiveFilms'),
                tagArchiveListOlder = g(data, 'tagArchiveListOlder'),
                tagArchiveListNewer = g(data, 'tagArchiveListNewer')

            return state.merge({
                isLoading: false,
                isLoaded: true,
                isFailed: false,
                currentPage: data.currentPage,
                lastSubPageForRequest: subPageForRequest,
                pageNumber: data.pageNumber,
                pageText: Map(fromJS(g(data, 'pageText'))),
                pagesCount: data.pagesCount,
                tagList: List(fromJS(g(data, 'tagList'))),
                tagArchiveList: List(fromJS(g(data, 'tagArchiveList'))),
                sortList: List(fromJS(g(data, 'sortList'))),
                currentSort: data.currentSort,
                archiveFilms: archiveFilms && Map(fromJS(archiveFilms)),
                tagArchiveListOlder: tagArchiveListOlder && Map(fromJS(tagArchiveListOlder)),
                tagArchiveListNewer: tagArchiveListNewer && Map(fromJS(tagArchiveListNewer)),
                itemsCount: data.itemsCount,
                videoList: List(fromJS(g(data, 'videoList'))),
            })
        },
        [actions.loadPageFailure]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            currentPage: '',
            pageNumber: 1,
            pageText: emptyPageText,
            pagesCount: 1,
            tagList: List(),
            tagArchiveList: List(),
            sortList: List(),
            currentSort: '',
            archiveFilms: null,
            tagArchiveListOlder: null,
            tagArchiveListNewer: null,
            itemsCount: 0,
            videoList: List(),
        }),
        [actions.setNewSort]: (state, {payload}) => state.set('currentSort', payload.newSortValue),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        currentPage: '',
        lastSubPageForRequest: '',
        pageNumber: 1,
        pageText: emptyPageText,
        pagesCount: 1,
        tagList: [],
        tagArchiveList: [],
        sortList: [],
        currentSort: '',
        archiveFilms: null,
        tagArchiveListOlder: null,
        tagArchiveListNewer: null,
        itemsCount: 0,
        videoList: [],
    }))
