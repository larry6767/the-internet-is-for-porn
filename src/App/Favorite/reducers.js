import {handleActions} from 'redux-actions'
import {fromJS, List, OrderedMap, Map} from 'immutable'
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
        [actions.setNewSort]: (state, {payload}) => state.set('currentSort', payload.newSortValue),
        [actions.addVideo]: (state, {payload: video}) => {
            const
                currentVideoList = state.get('videoList')

            if (!currentVideoList.size)
                return state.set('isLoaded', false)

            return state.set('videoList', currentVideoList.push(video))
        },
        [actions.removeVideo]: (state, {payload: id}) => {
            const
                currentVideoList = state.get('videoList')

            if (!currentVideoList.size)
            return state

            const
                targetPosition = currentVideoList.findIndex(x => x.get('id') === id)

            return targetPosition !== -1
                ? state.set('videoList', currentVideoList.delete(targetPosition))
                : state.set('videoList', currentVideoList)
        },
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
