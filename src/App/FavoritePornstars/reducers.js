import {fromJS, List} from 'immutable'

import {
    addToList,
    removeFromList,
    plainProvedGet as g,
    PropTypes,
    ImmutablePropTypes,
    provedHandleActions,
} from '../helpers'

import {
    immutablePageTextModel,
    PageTextRecord,
    immutableModelsListModel,
    pageRequestParamsModel,
} from '../models'

import actions from './actions'

const
    stateModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact({
            isLoading: PropTypes.bool,
            isLoaded: PropTypes.bool,
            isFailed: PropTypes.bool,

            lastPageRequestParams: PropTypes.nullable(pageRequestParamsModel),

            pageText: immutablePageTextModel,
            modelsList: immutableModelsListModel,

            // TODO: get rid of that shit below (pornstars not supposed to have pagination)
            pageNumber: PropTypes.number,
            pagesCount: PropTypes.number,
            itemsCount: PropTypes.number,
        })

export default
    provedHandleActions(stateModel, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,

            lastPageRequestParams: g(payload, 'pageRequestParams'),

            pageText: PageTextRecord(),
            modelsList: List(),

            pageNumber: 1,
            pagesCount: 1,
            itemsCount: 0,
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,

            lastPageRequestParams: g(payload, 'pageRequestParams'),

            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
            modelsList: List(fromJS(g(payload, 'data', 'modelsList'))),

            pageNumber: g(payload, 'data', 'pageNumber'),
            pagesCount: g(payload, 'data', 'pagesCount'),
            itemsCount: g(payload, 'data', 'itemsCount'),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,

            pageText: PageTextRecord(),
            modelsList: List(),

            pageNumber: 1,
            pagesCount: 1,
            itemsCount: 0,
        }),
        [g(actions, 'addToList')]: (state, action) =>
            addToList(state, 'modelsList', g(action, 'payload')),
        [g(actions, 'removeFromList')]: (state, action) =>
            removeFromList(state, 'modelsList', g(action, 'payload')),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,

        lastPageRequestParams: null,

        pageText: PageTextRecord(),
        modelsList: [],

        pageNumber: 1,
        pagesCount: 1,
        itemsCount: 0,
    }))
