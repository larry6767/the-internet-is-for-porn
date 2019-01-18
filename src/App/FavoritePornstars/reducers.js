import {fromJS, List} from 'immutable'

import {
    addToList,
    removeFromList,
    plainProvedGet as g,
    PropTypes,
    ImmutablePropTypes,
    provedHandleActions,
} from '../helpers'

import {immutablePageTextModel, PageTextRecord} from '../models'
import {modelsListModel} from '../Pornstars/models'
import actions from './actions'

const
    stateModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact({
            isLoading: PropTypes.bool,
            isLoaded: PropTypes.bool,
            isFailed: PropTypes.bool,
            pageText: immutablePageTextModel,
            modelsList: ImmutablePropTypes.listOf(modelsListModel),
            // TODO: get rid of that shit below (pornstars not supposed to have pagination)
            pageNumber: PropTypes.number,
            pagesCount: PropTypes.number,
            itemsCount: PropTypes.number,
        })

export default
    provedHandleActions(stateModel, {
        [g(actions, 'loadPageRequest')]: state => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            pageText: PageTextRecord(),
            pageNumber: 1,
            pagesCount: 1,
            itemsCount: 0,
            modelsList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
            pageNumber: g(payload, 'data', 'pageNumber'),
            pagesCount: g(payload, 'data', 'pagesCount'),
            itemsCount: g(payload, 'data', 'itemsCount'),
            modelsList: List(fromJS(g(payload, 'data', 'modelsList'))),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageText: PageTextRecord(),
            pageNumber: 1,
            pagesCount: 1,
            itemsCount: 0,
            modelsList: List(),
        }),
        [g(actions, 'addToList')]: (state, action) =>
            addToList(state, 'modelsList', g(action, 'payload')),
        [g(actions, 'removeFromList')]: (state, action) =>
            removeFromList(state, 'modelsList', g(action, 'payload')),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        pageNumber: 1,
        pageText: PageTextRecord(),
        pagesCount: 1,
        itemsCount: 0,
        modelsList: [],
    }))
