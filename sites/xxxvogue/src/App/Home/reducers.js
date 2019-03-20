import {fromJS, List, Map} from 'immutable'

// local libs
import {plainProvedGet as g, provedHandleActions} from 'src/App/helpers'
import {model} from 'src/App/Home/models'
import actions from 'src/App/Home/actions'

export default
    provedHandleActions(model, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageText: null,
            nichesListWithThumb: List(),
            nichesList: List(),
            pornstarsList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            pageText: Map(g(payload, 'data', 'pageText')),
            nichesListWithThumb: List(fromJS(g(payload, 'data', 'nichesListWithThumb'))),
            nichesList: List(fromJS(g(payload, 'data', 'nichesList'))),
            pornstarsList: List(fromJS(g(payload, 'data', 'pornstarsList'))),
        }),
        [g(actions, 'loadPageFailure')]: (state) => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageText: null,
            nichesListWithThumb: List(),
            nichesList: List(),
            pornstarsList: List(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastPageRequestParams: null,
        pageText: null,
        nichesListWithThumb: [],
        nichesList: [],
        pornstarsList: []
    }))
