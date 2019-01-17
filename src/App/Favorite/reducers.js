import {handleActions} from 'redux-actions'
import {fromJS, List, Record} from 'immutable'

import {addToList, removeFromList, plainProvedGet as g} from '../helpers'
import actions from './actions'

const
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
    handleActions({
        [g(actions, 'loadPageRequest')]: state => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            pageNumber: 1,
            pageText: PageTextRecord(),
            pagesCount: 1,
            itemsCount: 0,
            videoList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            pageNumber: g(payload, 'data', 'pageNumber'),
            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
            pagesCount: g(payload, 'data', 'pagesCount'),
            itemsCount: g(payload, 'data', 'itemsCount'),
            videoList: List(fromJS(g(payload, 'data', 'videoList'))),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageNumber: 1,
            pageText: PageTextRecord(),
            pagesCount: 1,
            itemsCount: 0,
            videoList: List(),
        }),
        [g(actions, 'addToList')]: (state, action) =>
            addToList(state, 'videoList', g(action, 'payload')),
        [g(actions, 'removeFromList')]: (state, action) =>
            removeFromList(state, 'videoList', g(action, 'payload')),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        pageNumber: 1,
        pageText: PageTextRecord(),
        pagesCount: 1,
        itemsCount: 0,
        videoList: [],
    }))
