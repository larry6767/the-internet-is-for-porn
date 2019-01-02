import {handleActions} from 'redux-actions'
import {fromJS, List, Map} from 'immutable'
import actions from './actions'

export default
    handleActions({
        [actions.loadPageRequest]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastSubPageForRequest: payload,
            inlineAdvertisementIsShowed: true,
            pageText: Map(),
            gallery: Map(),
            videoList: List(),
        }),
        [actions.loadPageSuccess]: (state, {payload: {data, subPageForRequest}}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastSubPageForRequest: subPageForRequest,
            inlineAdvertisementIsShowed: true,
            pageText: Map(fromJS(data.pageText)),
            gallery: Map(fromJS(data.gallery)),
            videoList: List(fromJS(data.videoList)),
        }),
        [actions.loadPageFailure]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            lastSubPageForRequest: '',
            inlineAdvertisementIsShowed: true,
            pageText: Map(),
            gallery: Map(),
            videoList: List(),
        }),
        [actions.closeAdvertisement]: state => state.set('inlineAdvertisementIsShowed', false),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        lastSubPageForRequest: '',
        inlineAdvertisementIsShowed: true,
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
        gallery: {

        },
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
