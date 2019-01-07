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
            reportDialogIsOpen: false,
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
            reportDialogIsOpen: false,
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
            reportDialogIsOpen: false,
            pageText: Map(),
            gallery: Map(),
            videoList: List(),
        }),
        [actions.sendReportRequest]: state => state.merge({
            reportIsSending: true,
            reportIsSent: false,
            reportIsNotSent: false,
        }),
        [actions.sendReportSuccess]: state => state.merge({
            reportIsSending: false,
            reportIsSent: true,
            reportIsNotSent: false,
        }),
        [actions.sendReportFailure]: state => state.merge({
            reportIsSending: false,
            reportIsSent: false,
            reportIsNotSent: true,
        }),
        [actions.closeAdvertisement]: state => state.set('inlineAdvertisementIsShowed', false),
        [actions.toggleReportDialog]: state =>
            state.set('reportDialogIsOpen', !state.get('reportDialogIsOpen')),
        [actions.setTimeAndHrefForReport]: (state, {payload: {href, time}}) =>
            state.merge({
                currentHref: href,
                currentTime: time,
            }),
    }, fromJS({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
        reportIsSending: false,
        reportIsSent: false,
        reportIsNotSent: false,
        lastSubPageForRequest: '',
        inlineAdvertisementIsShowed: true,
        reportDialogIsOpen: false,
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
            /*
            id: 0,
            title: '',
            urlForIframe: '',
            sponsorId: 0,
            sponsorUrl: '',
            published: 0,
            thumb: '',
            thumbMask: '',
            thumbs: [],
            tags: [],
            tagsShort: '',
            url: '',
            duration: '',
            */
        },
        currentHref: '',
        currentTime: '',
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
