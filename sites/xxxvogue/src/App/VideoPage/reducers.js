import {fromJS, List, Map} from 'immutable'

import {provedHandleActions, plainProvedGet as g} from '../helpers'
import {model} from './models'
import actions from './actions'

export default
    provedHandleActions(model, {
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            inlineAdvertisementIsShowed: true,
            pageText: null,
            openGraphData: null,
            gallery: null,
            videoList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastPageRequestParams: g(payload, 'pageRequestParams'),
            inlineAdvertisementIsShowed: true,
            pageText: Map(fromJS(g(payload, 'data', 'pageText'))),
            openGraphData: Map(fromJS(g(payload, 'data', 'openGraphData'))),
            gallery: Map(fromJS(g(payload, 'data', 'gallery'))),
            videoList: List(fromJS(g(payload, 'data', 'videoList'))),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            inlineAdvertisementIsShowed: true,
            pageText: null,
            openGraphData: null,
            gallery: null,
            videoList: List(),
        }),
        [g(actions, 'closeAdvertisement')]: state =>
            state.set('inlineAdvertisementIsShowed', false),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastPageRequestParams: null,
        inlineAdvertisementIsShowed: true,
        pageText: null,
        openGraphData: null,
        gallery: null,
        videoList: [],
    }))
