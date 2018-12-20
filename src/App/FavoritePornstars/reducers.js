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
            pornstarList: List(),
        }),
        [actions.loadPageSuccess]: (state, {payload: {data}}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            pageNumber: data.pageNumber,
            pageText: Map(fromJS(data.pageText)),
            pagesCount: data.pagesCount,
            itemsCount: data.itemsCount,
            pornstarList: List(fromJS(data.pornstarList)),
        }),
        [actions.loadPageFailure]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageNumber: 1,
            pageText: OrderedMap(),
            pagesCount: 1,
            itemsCount: 0,
            pornstarList: List(),
        }),
        [actions.setNewSort]: (state, {payload}) => state.set('currentSort', payload.newSortValue),
        [actions.addPornstar]: (state, {payload: video}) => {
            const
                currentPornstarList = state.get('pornstarList')

            if (!currentPornstarList.size)
                return state.set('isLoaded', false)

            return state.set('pornstarList', currentPornstarList.push(video))
        },
        [actions.removePornstar]: (state, {payload: id}) => {
            const
                currentPornstarList = state.get('pornstarList')

            if (!currentPornstarList.size)
            return state

            const
                targetPosition = currentPornstarList.findIndex(x => x.get('id') === id)

            return targetPosition !== -1
                ? state.set('pornstarList', currentPornstarList.delete(targetPosition))
                : state.set('pornstarList', currentPornstarList)
        },
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        currentPage: '',
        lastSubPageForRequest: '',
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
        pornstarList: [
            /*
            {
                id: 0,
                name: '',
                subPage: '',
                itemsCount: 0,
                thumb: '',
                sort: '',
            }
            */
        ],
    }))
