import {handleActions} from 'redux-actions'
import {fromJS, List, OrderedMap, Map} from 'immutable'
import {addToList, removeFromList} from '../helpers'
import actions from './actions'

export default
    handleActions({
        [actions.loadPageRequest]: state => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            pageNumber: 1,
            pageText: Map(),
            pagesCount: 1,
            itemsCount: 0,
            videoList: List(),
        }),
        [actions.loadPageSuccess]: (state, {payload: {data, subPageForRequest}}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            pageNumber: data.pageNumber,
            pageText: Map(fromJS(data.pageText)),
            pagesCount: data.pagesCount,
            itemsCount: data.itemsCount,
            videoList: List(fromJS(data.videoList)),
        }),
        [actions.loadPageFailure]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageNumber: 1,
            pageText: OrderedMap(),
            pagesCount: 1,
            itemsCount: 0,
            videoList: List(),
        }),
        [actions.addVideo]: (state, {payload: item}) => addToList(state, 'videoList', item),
        [actions.removeVideo]: (state, {payload: id}) => removeFromList(state, 'videoList', id),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        currentNiche: '',
        pageNumber: 1,
        pageText: {
            /*
            description: '',
            headerDescription: '',
            headerTitle: '',
            keywords: '',
            listHeader: '',
            listHeaderEmpty: '',
            title: '',
            */
        },
        pagesCount: 1,
        itemsCount: 0,
        videoList: [
            /*
            {
                id: 0,
                thumb,
                title: '',
                sponsorId: 0,
                tags: '',
                tagsShort: '',
                urlRegular: '',
                favorite: 0,
                duration: 0,
            }
            */
        ],
    }))
