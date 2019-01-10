import {isEqual, difference} from 'lodash'

// only particular helper, because some of all helpers depends on this module
import deepFreeze from './lib/helpers/deepFreeze'

const
    // Considering `null` here as TODO, will print warning instead of failing.
    mapping = deepFreeze({
        eng: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'all-movies', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        deu: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'alle-vids', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        ita: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'tutti-i-film', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        fra: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'tout-les-tubes', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        spa: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'todas-películas', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        por: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'todas-as-cenas', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        swe: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'alla-tubevideor', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        nld: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'alle-scenes', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        fin: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'leffat', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        rus: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'фильмы', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
        tur: {
            pageCode: {
                home: {code: 'home', url: '/'},
                allNiches: {code: 'all-niches', url: '/?categories'},
                niche: {code: 'niche', url: '/%SUB_PAGE_CODE%.html'},
                allMovies: {code: 'tüm-kanal-videoları', url: '/%PAGE_CODE%%SUB_PAGE_CODE%.html'},
                pornstars: {code: 'porn-stars', url: '/%PAGE_CODE%.html'},
                pornstar: {code: 'porn-star', url: '/%PAGE_CODE%/%SUB_PAGE_CODE%.html'},
                favorite: {code: 'favorite', url: '/your-%PAGE_CODE%.html'},
                favoritePornstars: {code: 'favorite-porn-stars', url: '/your-%PAGE_CODE%.html'},
                video: {code: 'vid', url: '/%PAGE_CODE%-%SUB_PAGE_CODE%.htm'},
            },
        },
    }),

    allRootFields = Object.freeze([
        'pageCode',
    ].sort()),

    allPageCodes = Object.freeze([
        'home',
        'allNiches',
        'niche',
        'allMovies',
        'pornstars',
        'pornstar',
        'favorite',
        'favoritePornstars',
        'video',
    ].sort()),

    allPageCodeFields = Object.freeze(['code', 'url'].sort()),

    biSidedDiff = (a, b) => difference(a, b).concat(difference(b, a))

/*
    A helper which could be used during application initialization to validate locales from server
    with own data structure.
*/
export const validate = siteLocales => {
    const
        mappingLangs = Object.keys(mapping).sort(),
        siteLocalesLangs = siteLocales.map(x => x.code).sort()

    if ( ! isEqual(mappingLangs, siteLocalesLangs))
        throw new Error(
            'Set of languages in mapping does not match with one from provided site locales. ' +
            `Mapping language codes: [${mappingLangs.join(', ')}]. ` +
            `Site locales language codes: [${siteLocalesLangs.join(', ')}]. ` +
            `Difference: [${biSidedDiff(mappingLangs, siteLocalesLangs).join(', ')}].`
        )

    for (const langCode of mappingLangs) {
        const
            langBranch = mapping[langCode],
            fields = Object.keys(langBranch).sort()

        if ( ! isEqual(fields, allRootFields))
            throw new Error(
                `Set of root fields of a language code "${langCode}" does not match model. ` +
                `Mapping fields: [${fields.join(', ')}]. ` +
                `Model fields: [${allRootFields.join(', ')}]. ` +
                `Difference: [${biSidedDiff(fields, allRootFields).join(', ')}].`
            )

        for (const rootField of allRootFields) {
            const fieldBranch = langBranch[rootField]

            switch (rootField) {
                case 'pageCode':
                    const pageCodes = Object.keys(fieldBranch).sort()

                    if ( ! isEqual(pageCodes, allPageCodes))
                        throw new Error(
                            'Set of "page codes" does not match model. ' +
                            `"Page codes" of a language code "${langCode}": `+
                                `[${pageCodes.join(', ')}]. ` +
                            `Model "page codes": [${allPageCodes.join(', ')}]. ` +
                            `Difference: [${biSidedDiff(pageCodes, allPageCodes).join(', ')}].`
                        )

                    for (const pageCode of pageCodes) {
                        const
                            pageCodeBranch = fieldBranch[pageCode],
                            pageCodeFields = Object.keys(pageCodeBranch).sort()

                        if ( ! isEqual(pageCodeFields, allPageCodeFields))
                            throw new Error(
                                `Set of "page code" fields of a language code "${langCode}" ` +
                                `of page code "${pageCode}" does not match model. ` +
                                `"Page code" actual fields: [${pageCodeFields.join(', ')}]. ` +
                                `Model "page code" fields: [${allPageCodeFields.join(', ')}]. ` +
                                `Difference: [${
                                    biSidedDiff(pageCodeFields, allPageCodeFields).join(', ')
                                }].`
                            )

                        for (const pageCodeField of pageCodeFields)
                            if (pageCodeBranch[pageCodeField] === null)
                                console.debug(
                                    `${langCode}.${rootField}.${pageCode}.${pageCodeField} ` +
                                    `is null which means it's marked as TODO, ` +
                                    `you urged to get it done.`
                                )
                            else if (typeof pageCodeBranch[pageCodeField] !== 'string')
                                throw new Error(
                                    `${langCode}.${rootField}.${pageCode}.${pageCodeField} ` +
                                    `is not a string but "${typeof pageCodeBranch[pageCodeField]}".`
                                )
                    }

                    break;

                default:
                    throw new Error(`Unexpected field name: "${rootField}"`)
            }
        }
    }
}

export default mapping
