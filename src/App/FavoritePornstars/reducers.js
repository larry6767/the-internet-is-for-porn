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
        [actions.addToList]: (state, {payload: item}) => addToList(state, 'pornstarList', item),
        [actions.removeFromList]: (state, {payload: id}) => removeFromList(state, 'pornstarList', id),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        currentPage: '',
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
