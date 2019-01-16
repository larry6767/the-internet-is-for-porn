import {mapValues} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../../../App/helpers'

const
    incomingPageTextModelProps = Object.freeze({
        DESCRIPTION: PropTypes.string,
        'HEADER-DESCRIPTION': PropTypes.string,
        'HEADER-TITLE': PropTypes.string.isOptional, // could be not presented
        KEYWORDS: PropTypes.string,
        'LIST-HEADER': PropTypes.string.isOptional, // could be not presented
        'LIST-HEADER-EMPTY': PropTypes.string.isOptional, // could be not presented
        TITLE: PropTypes.string,
        'GALLERY-TITLE': PropTypes.string.isOptional, // could be not presented
    }),

    incomingVideoPageTextModelProps = Object.freeze({
        ...incomingPageTextModelProps,
        'GALLERY-TITLE': PropTypes.string,
    }),

    pageTextModelProps = Object.freeze({
        description: PropTypes.string,
        headerDescription: PropTypes.string,
        headerTitle: PropTypes.string.isOptional,
        keywords: PropTypes.string,
        listHeader: PropTypes.string.isOptional,
        listHeaderEmpty: PropTypes.string.isOptional,
        title: PropTypes.string,
    })

export const
    incomingPageTextModel = PropTypes.shape(incomingPageTextModelProps),
    pageTextModel = PropTypes.exact(pageTextModelProps),

    incomingVideoPageTextModel = PropTypes.shape(incomingVideoPageTextModelProps),
    videoPageTextModel = PropTypes.exact({
        ...pageTextModelProps,
        galleryTitle: PropTypes.string,
    })

const
    // {foo: 'foo', bar: 'bar'}
    incomingPageTextModelPropsKeys =
        Object.freeze(mapValues(incomingPageTextModelProps, (x, k) => k)),

    // get verified key (verified that it is presented in the model)
    getKey = key => g(incomingPageTextModelPropsKeys, key),

    // get incoming property by verified key (which must be presented in the model)
    getProp = (src, propKey) => g(src, getKey(propKey)),

    // {foo: 'foo', bar: 'bar'}
    incomingVideoPageTextModelPropsKeys =
        Object.freeze(mapValues(incomingVideoPageTextModelProps, (x, k) => k)),

    // get verified key (verified that it is presented in the model)
    getVideoKey = key => g(incomingVideoPageTextModelPropsKeys, key),

    // get incoming property by verified key (which must be presented in the model)
    getVideoProp = (src, propKey) => g(src, getVideoKey(propKey)),

    getResult = pageText => ({
        description: getProp(pageText, 'DESCRIPTION'),
        headerDescription: getProp(pageText, 'HEADER-DESCRIPTION'),
        headerTitle: pageText[getKey('HEADER-TITLE')] || null,
        keywords: getProp(pageText, 'KEYWORDS'),
        listHeader: pageText[getKey('LIST-HEADER')] || null,
        listHeaderEmpty: pageText[getKey('LIST-HEADER-EMPTY')] || null,
        title: getProp(pageText, 'TITLE'),
    })

export default pageText => {
    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(
            incomingPageTextModel,
            pageText,
            'getPageText',
            'original source page text data'
        )

    const
        result = getResult(pageText)

    if (process.env.NODE_ENV !== 'production')
        assertPropTypes(pageTextModel, result, 'getPageText', 'result page text data')

    return result
}

export
    const getVideoPageText = pageText => {
        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                incomingVideoPageTextModel,
                pageText,
                'getVideoPageText',
                'original source video page text data'
            )

        const
            result = {
                ...getResult(pageText),
                galleryTitle: getVideoProp(pageText, 'GALLERY-TITLE'),
            }

        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                videoPageTextModel,
                result,
                'getVideoPageText',
                'result video page text data'
            )

        return result
    }
