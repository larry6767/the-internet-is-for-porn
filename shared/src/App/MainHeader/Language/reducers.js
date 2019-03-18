import {fromJS, Record} from 'immutable'
import {handleActions} from 'redux-actions'

// local libs
import {plainProvedGet as g, immutableProvedGet as ig} from 'src/App/helpers'
import actions from 'src/App/MainHeader/Language/actions'

const
    SiteLocaleRecord = Record({
        code: '',
        host: '',
        title: '',
    })

export default handleActions({
    [g(actions, 'loadSiteLocalesRequest')]: state =>
        state.mergeDeep(fromJS({
            currentLanguage: null,

            siteLocales: {
                list: [],
                isLoading: true,
                isLoaded: false,
                isFailed: false,
            },
        })),

    [g(actions, 'loadSiteLocalesSuccess')]: (state, {payload: {siteLocales, currentLocaleCode}}) =>
        state.mergeDeep(fromJS({
            currentLanguage: currentLocaleCode,

            siteLocales: {
                list: siteLocales.map(SiteLocaleRecord),
                isLoading: false,
                isLoaded: true,
                isFailed: false,
            },
        })),

    [g(actions, 'loadSiteLocalesFailure')]: state =>
        state.mergeIn(['siteLocales'], {
            isLoading: false,
            isLoaded: false,
            isFailed: true,
        }),

    [g(actions, 'setNewLanguage')]: (state, {payload: localeCode}) =>
        state.set(
            'currentLanguage',
            ig(ig(state, 'siteLocales', 'list').find(x => ig(x, 'code') === localeCode), 'code')
        ),
}, fromJS({
    currentLanguage: null, // locale code

    siteLocales: {
        list: [], // see `SiteLocaleRecord`
        isLoading: false,
        isLoaded: false,
        isFailed: false,
    },
}))
