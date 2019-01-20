import {handleActions} from 'redux-actions'
import {fromJS, List, Map} from 'immutable'

import {plainProvedGet as g} from '../helpers'
import {defaultOrientationCode} from '../models'
import actions from './actions'

export default
    handleActions({
        [g(actions, 'loadPageRequest')]: (state, {payload}) => state.merge({
            isLoading: true,
            isLoaded: false,
            isFailed: false,
            lastOrientationCode: g(payload, 'orientationCode'),
            lastSubPageForRequest: g(payload, 'subPageForRequest'),
            inlineAdvertisementIsShowed: true,
            reportDialogIsOpen: false,
            pageText: Map(),
            gallery: Map(),
            videoList: List(),
        }),
        [g(actions, 'loadPageSuccess')]: (state, {payload}) => state.merge({
            isLoading: false,
            isLoaded: true,
            isFailed: false,
            lastOrientationCode: g(payload, 'orientationCode'),
            lastSubPageForRequest: g(payload, 'subPageForRequest'),
            inlineAdvertisementIsShowed: true,
            reportDialogIsOpen: false,
            pageText: Map(fromJS(g(payload, 'data', 'pageText'))),
            gallery: Map(fromJS(g(payload, 'data', 'gallery'))),
            videoList: List(fromJS(g(payload, 'data', 'videoList'))),

            // clearing report state for new content
            reportIsSending: false,
            reportIsSent: false,
            reportIsNotSent: false,
        }),
        [g(actions, 'loadPageFailure')]: state => state.merge({
            isLoading: false,
            isLoaded: false,
            isFailed: true,
            inlineAdvertisementIsShowed: true,
            reportDialogIsOpen: false,
            pageText: Map(),
            gallery: Map(),
            videoList: List(),
        }),
        [g(actions, 'sendReportRequest')]: state => state.merge({
            reportIsSending: true,
            reportIsSent: false,
            reportIsNotSent: false,
        }),
        [g(actions, 'sendReportSuccess')]: state => state.merge({
            reportIsSending: false,
            reportIsSent: true,
            reportIsNotSent: false,
        }),
        [g(actions, 'sendReportFailure')]: state => state.merge({
            reportIsSending: false,
            reportIsSent: false,
            reportIsNotSent: true,
        }),
        [g(actions, 'closeAdvertisement')]: state =>
            state.set('inlineAdvertisementIsShowed', false),
        [g(actions, 'toggleReportDialog')]: state =>
            state.set('reportDialogIsOpen', !state.get('reportDialogIsOpen')),
        [g(actions, 'setTimeAndHrefForReport')]: (state, {payload: {href, time}}) =>
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
        lastOrientationCode: defaultOrientationCode,
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
                favorite: 0,
                duration: 0,
            }
            */
        ],
    }))
