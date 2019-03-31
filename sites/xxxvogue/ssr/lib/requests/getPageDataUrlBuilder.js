import {parse, format} from 'url'
import apiLocales from 'ssr/locale-mapping/backend-api'
import {plainProvedGet as g} from 'src/App/helpers'

import {
    ORIENTATION_MASK,
    PAGE_CODE_MASK,
    CHILD_MASK,
    SUBCHILD_MASK,
    ORDERING_MASK,
    ARCHIVE_MASK,
    QUERY_STRING_MASK,
} from 'ssr/locale-mapping/backend-api-masks'

export const
    getPageDataUrlBuilder = preparedParams => {
        const
            {localeCode, page, orientationCode} = preparedParams,
            pageCodeBranch = g(apiLocales, localeCode, 'pageCode', page),
            orientationPrefix = g(apiLocales, localeCode, 'orientationPrefixes', orientationCode)

        let
            url = g(pageCodeBranch, 'url')

        if (pageCodeBranch.hasOwnProperty('code'))
            url = url.replace(PAGE_CODE_MASK, g(pageCodeBranch, 'code', orientationCode))

        url = url
            .replace(ORIENTATION_MASK, orientationPrefix)
            .replace(CHILD_MASK, g(preparedParams, 'child'))
            .replace(SUBCHILD_MASK, g(preparedParams, 'subchild'))
            .replace(ORDERING_MASK, g(preparedParams, 'ordering'))
            .replace(ARCHIVE_MASK, g(preparedParams, 'archive'))
            .replace(QUERY_STRING_MASK, g(preparedParams, 'qs'))

        url = parse(url)
        url.pathname = url.pathname.split(/\//).map(x => encodeURIComponent(x)).join('/')
        return format(url)
    }
