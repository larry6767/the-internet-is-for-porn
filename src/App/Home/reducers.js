import {handleActions} from 'redux-actions'
import {fromJS, List, Map} from 'immutable'

import {defaultOrientationCode} from '../models'
import {plainProvedGet as g} from '../helpers'
import actions from './actions'

export default
    handleActions({
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastOrientationCode: g(payload, 'orientationCode'),
            pageText: Map(),
            nichesList: List(),
            pornstarsList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastOrientationCode: g(payload, 'orientationCode'),
            pageText: Map(fromJS(g(payload, 'data', 'pageText'))),
            nichesList: List(fromJS(g(payload, 'data', 'nichesList'))),
            pornstarsList: List(fromJS(g(payload, 'data', 'pornstarsList'))),
        }),
        [g(actions, 'loadPageFailure')]: (state) => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageText: Map(),
            nichesList: List(),
            pornstarsList: List(),
        }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastOrientationCode: defaultOrientationCode,
        pageText: {},
        nichesList: [
            /*
            {
                id: 0,
                name: '',
                subPage: '',
                itemsCount: 0,
            }
            */
        ],
        pornstarsList: [
            /*
            {
                id: 0,
                name: '',
                subPage: '',
                itemsCount: 0,
            }
            */
        ]
    }))
