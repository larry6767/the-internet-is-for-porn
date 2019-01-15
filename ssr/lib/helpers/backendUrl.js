import {find} from 'lodash'

import {plainProvedGet as g} from '../../App/helpers'

const
    getHost = (siteLocales, localeCode) =>
        g(find(siteLocales, x => g(x, 'code') === localeCode), 'host')

export const
    backendUrl = (siteLocales, localeCode) =>
        `https://${getHost(siteLocales, localeCode)}/react`,

    backendUrlForReport = (siteLocales, localeCode) =>
        `https://${getHost(siteLocales, localeCode)}/rot`,

    backendUrlForSearch = (siteLocales, localeCode) =>
        `https://${getHost(siteLocales, localeCode)}/ac`
