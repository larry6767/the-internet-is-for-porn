export {
    default as getCurrentBreakpoint,
    breakpointXXS,
    breakpointXS,
    breakpointSM,
    breakpointMD,
    breakpointLG,
    breakpointXL,
    breakpoints,
    compareCurrentBreakpoint,
} from 'src/App/helpers/getCurrentBreakpoint'

export {default as immutableProvedGet} from 'src/App/helpers/immutable/provedGet'
export {default as plainProvedGet} from 'src/App/helpers/plain/provedGet'
export {default as withStylesProps} from 'src/App/helpers/withStylesProps'
export {default as createActions} from 'src/App/helpers/createActions'
export {default as getCookie} from 'src/App/helpers/cookie/getCookie'
export {default as setCookie} from 'src/App/helpers/cookie/setCookie'
export {default as deleteCookie} from 'src/App/helpers/cookie/deleteCookie'
export {default as getPageData} from 'src/App/helpers/getPageData'
export {PropTypes} from 'src/App/helpers/propTypes'
export {ImmutablePropTypes} from 'src/App/helpers/propTypes/immutable'
export {checkPropTypes, assertPropTypes} from 'src/App/helpers/propTypes/check'
export {default as provedHandleActions} from 'src/App/helpers/provedHandleActions'
export {default as getRouterContext} from 'src/App/helpers/getRouterContext'
export {default as setPropTypes} from 'src/App/helpers/setPropTypes'
export {default as getLinkByNavKey} from 'src/App/helpers/getLinkByNavKey'
export {default as getHeaderText} from 'src/App/helpers/getHeaderText'
export {default as getProvedPageKey} from 'src/App/helpers/getProvedPageKey'
export {default as getClassId} from 'src/App/helpers/getClassId'
export {default as getOrientationByClassId} from 'src/App/helpers/getOrientationByClassId'
export {default as getPageTextToHeadTags} from 'src/App/helpers/getPageTextToHeadTags'
export {default as getOpenGraphToHeadTags} from 'src/App/helpers/getOpenGraphToHeadTags'
export {default as get404PageText} from 'src/App/helpers/get404PageText'
export {default as getHeaderWithOrientation} from 'src/App/helpers/getHeaderWithOrientation'
export {default as getPageRequestParams} from 'src/App/helpers/getPageRequestParams'
export {default as buildRequestBody} from 'src/App/helpers/buildRequestBody'
export {default as obtainPageData} from 'src/App/helpers/obtainPageData'
export {default as doesItHaveToBeReloaded} from 'src/App/helpers/doesItHaveToBeReloaded'
export {default as areWeSwitchedOnPage} from 'src/App/helpers/areWeSwitchedOnPage'
export {default as lifecycleForPageWithRefs} from 'src/App/helpers/lifecycleForPageWithRefs'
export {default as getDomain} from 'src/App/helpers/getDomain'
export {default as lazyImage} from 'src/App/helpers/lazyImage'
export {default as getRandomWidthList} from 'src/App/helpers/getRandomWidthList'

// favorite pages helpers
export {default as addToList} from 'src/App/helpers/favoritePages/addToList'
export {default as removeFromList} from 'src/App/helpers/favoritePages/removeFromList'

export {default as getIdsForInitialFavoriteList}
    from 'src/App/helpers/favoritePages/getIdsForInitialFavoriteList'

export {default as removeIdFromFavoriteList}
    from 'src/App/helpers/favoritePages/removeIdFromFavoriteList'

export {default as addIdToFavoriteList} from 'src/App/helpers/favoritePages/addIdToFavoriteList'
export {default as addIdToCookie} from 'src/App/helpers/favoritePages/addIdToCookie'
export {default as removeIdFromCookie} from 'src/App/helpers/favoritePages/removeIdFromCookie'
