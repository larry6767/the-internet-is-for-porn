import {fromJS, List, Record} from 'immutable'

import {
    addToList,
    removeFromList,
    plainProvedGet as g,
    PropTypes,
    ImmutablePropTypes,
    provedHandleActions,
} from '../helpers'

import actions from './actions'

const
    stateModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exact({
            isLoading: PropTypes.bool,
            isLoaded: PropTypes.bool,
            isFailed: PropTypes.bool,

            pageText: ImmutablePropTypes.exactRecordOf({
                description: PropTypes.string,
                headerDescription: PropTypes.string,
                headerTitle: PropTypes.nullable(PropTypes.string),
                keywords: PropTypes.string,
                listHeader: PropTypes.nullable(PropTypes.string),
                listHeaderEmpty: PropTypes.nullable(PropTypes.string),
                title: PropTypes.string,
            }),

            pageNumber: PropTypes.number,
            pagesCount: PropTypes.number,
            itemsCount: PropTypes.number,

            pornstarList: ImmutablePropTypes.listOf(ImmutablePropTypes.exact({
                id: PropTypes.number,
                name: PropTypes.string,
                subPage: PropTypes.string,
                itemsCount: PropTypes.number,
                thumb: PropTypes.string,
            })),
        }),

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
    provedHandleActions(stateModel, {
        [g(actions, 'loadPageRequest')]: state => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            pageText: PageTextRecord(),
            pageNumber: 1,
            pagesCount: 1,
            itemsCount: 0,
            pornstarList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            pageText: PageTextRecord(g(payload, 'data', 'pageText')),
            pageNumber: g(payload, 'data', 'pageNumber'),
            pagesCount: g(payload, 'data', 'pagesCount'),
            itemsCount: g(payload, 'data', 'itemsCount'),
            pornstarList: List(fromJS(g(payload, 'data', 'pornstarList'))),
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            pageText: PageTextRecord(),
            pageNumber: 1,
            pagesCount: 1,
            itemsCount: 0,
            pornstarList: List(),
        }),
        [g(actions, 'addToList')]: (state, action) =>
            addToList(state, 'pornstarList', g(action, 'payload')),
        [g(actions, 'removeFromList')]: (state, action) =>
            removeFromList(state, 'pornstarList', g(action, 'payload')),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        pageText: PageTextRecord(),
        pageNumber: 1,
        pagesCount: 1,
        itemsCount: 0,
        pornstarList: [],
    }))
