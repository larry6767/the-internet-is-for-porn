import deepFreeze from 'ssr/lib/helpers/deepFreeze'

import {
    getHomeMap,
    getAllNichesMap,
    getNicheMap,
    getPornstarsMap,
    getPornstarMap,
    getFavoriteMap,
    getFavoritePornstarsMap,
    getVideoPageMap,
    getFindVideosMap,
    getNotFoundMap,
} from 'ssr/lib/mapFns'

import {assertPropTypes} from 'src/App/helpers'
import {getPageDataPageMappingModel} from 'ssr/lib/models'

export const
    getPageDataPageMapping = Object.freeze({
        home: Object.freeze([
            deepFreeze({blocks: {allTagsBlock: 1, modelsABCBlockText: 1, modelsABCBlockThumbs: 1}}),
            getHomeMap,
        ]),
        allNiches: Object.freeze([
            deepFreeze({blocks: {extendedTagsBlock: 1}}),
            getAllNichesMap,
        ]),
        niche: Object.freeze([
            deepFreeze({blocks: {
                allTagsBlock: 1,
                searchSponsors: 1,
                updateExtraURL: 1,
                updateSponsorURL: 1,
            }}),
            getNicheMap,
        ]),
        pornstars: Object.freeze([
            null,
            getPornstarsMap,
        ]),
        pornstar: Object.freeze([
            deepFreeze({blocks: {
                modelsABCBlockText: 1,
                modelsABCBlockThumbs: 1,
                searchSponsors: 1,
                updateExtraURL: 1,
                updateSponsorURL: 1,
            }}),
            getPornstarMap,
        ]),
        favorite: Object.freeze([
            deepFreeze({blocks: {updateExtraURL: 1, updateSponsorURL: 1}}),
            getFavoriteMap,
        ]),
        favoritePornstars: Object.freeze([
            deepFreeze({blocks: {modelsABCBlockThumbs: 1}}),
            getFavoritePornstarsMap,
        ]),
        video: Object.freeze([
            deepFreeze({blocks: {searchSponsors: 1, updateExtraURL: 1, updateSponsorURL: 1}}),
            getVideoPageMap,
        ]),
        findVideos: Object.freeze([
            deepFreeze({blocks: {searchSponsors: 1, updateExtraURL: 1, updateSponsorURL: 1}}),
            getFindVideosMap,
        ]),
        notFound: Object.freeze([
            deepFreeze({blocks: {updateExtraURL: 1, updateSponsorURL: 1}}),
            getNotFoundMap,
        ]),
    })

if (process.env.NODE_ENV !== 'production')
    assertPropTypes(
        getPageDataPageMappingModel,
        getPageDataPageMapping,
        'requests',
        'getPageDataPageMapping'
    )
