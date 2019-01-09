import {isEqual, difference} from 'lodash'

const
    // Considering `null` here as TODO, will print warning instead of failing.
    mapping = {
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
                home: {code: null, url: null},
                allNiches: {code: null, url: null},
                niche: {code: null, url: null},
                allMovies: {code: null, url: null},
                pornstars: {code: null, url: null},
                pornstar: {code: null, url: null},
                favorite: {code: null, url: null},
                favoritePornstars: {code: null, url: null},
                video: {code: null, url: null},
            },
        },
        ita: {
            pageCode: {
                home: {code: null, url: null},
                allNiches: {code: null, url: null},
                niche: {code: null, url: null},
                allMovies: {code: null, url: null},
                pornstars: {code: null, url: null},
                pornstar: {code: null, url: null},
                favorite: {code: null, url: null},
                favoritePornstars: {code: null, url: null},
                video: {code: null, url: null},
            },
        },
        fra: {
            pageCode: {
                home: {code: null, url: null},
                allNiches: {code: null, url: null},
                niche: {code: null, url: null},
                allMovies: {code: null, url: null},
                pornstars: {code: null, url: null},
                pornstar: {code: null, url: null},
                favorite: {code: null, url: null},
                favoritePornstars: {code: null, url: null},
                video: {code: null, url: null},
            },
        },
        spa: {
            pageCode: {
                home: {code: null, url: null},
                allNiches: {code: null, url: null},
                niche: {code: null, url: null},
                allMovies: {code: null, url: null},
                pornstars: {code: null, url: null},
                pornstar: {code: null, url: null},
                favorite: {code: null, url: null},
                favoritePornstars: {code: null, url: null},
                video: {code: null, url: null},
            },
        },
        por: {
            pageCode: {
                home: {code: null, url: null},
                allNiches: {code: null, url: null},
                niche: {code: null, url: null},
                allMovies: {code: null, url: null},
                pornstars: {code: null, url: null},
                pornstar: {code: null, url: null},
                favorite: {code: null, url: null},
                favoritePornstars: {code: null, url: null},
                video: {code: null, url: null},
            },
        },
        swe: {
            pageCode: {
                home: {code: null, url: null},
                allNiches: {code: null, url: null},
                niche: {code: null, url: null},
                allMovies: {code: null, url: null},
                pornstars: {code: null, url: null},
                pornstar: {code: null, url: null},
                favorite: {code: null, url: null},
                favoritePornstars: {code: null, url: null},
                video: {code: null, url: null},
            },
        },
        nld: {
            pageCode: {
                home: {code: null, url: null},
                allNiches: {code: null, url: null},
                niche: {code: null, url: null},
                allMovies: {code: null, url: null},
                pornstars: {code: null, url: null},
                pornstar: {code: null, url: null},
                favorite: {code: null, url: null},
                favoritePornstars: {code: null, url: null},
                video: {code: null, url: null},
            },
        },
        fin: {
            pageCode: {
                home: {code: null, url: null},
                allNiches: {code: null, url: null},
                niche: {code: null, url: null},
                allMovies: {code: null, url: null},
                pornstars: {code: null, url: null},
                pornstar: {code: null, url: null},
                favorite: {code: null, url: null},
                favoritePornstars: {code: null, url: null},
                video: {code: null, url: null},
            },
        },
        rus: {
            pageCode: {
                home: {code: null, url: null},
                allNiches: {code: null, url: null},
                niche: {code: null, url: null},
                allMovies: {code: null, url: null},
                pornstars: {code: null, url: null},
                pornstar: {code: null, url: null},
                favorite: {code: null, url: null},
                favoritePornstars: {code: null, url: null},
                video: {code: null, url: null},
            },
        },
        tur: {
            pageCode: {
                home: {code: null, url: null},
                allNiches: {code: null, url: null},
                niche: {code: null, url: null},
                allMovies: {code: null, url: null},
                pornstars: {code: null, url: null},
                pornstar: {code: null, url: null},
                favorite: {code: null, url: null},
                favoritePornstars: {code: null, url: null},
                video: {code: null, url: null},
            },
        },
    },

    allRootFields = [
        'pageCode',
    ].sort(),

    allPageCodes = [
        'home',
        'allNiches',
        'niche',
        'allMovies',
        'pornstars',
        'pornstar',
        'favorite',
        'favoritePornstars',
        'video',
    ].sort(),

    allPageCodeFields = ['code', 'url'].sort(),

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
