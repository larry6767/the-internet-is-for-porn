import {mapValues, map} from 'lodash'

// local libs
import {PropTypes, assertPropTypes, plainProvedGet as g} from 'src/App/helpers'
import {nichesListWithThumbModel, nichesListModel} from 'src/App/models'

const
    nichesModelProps = process.env.NODE_ENV === 'production' ? null : Object.freeze({
        id: PropTypes.string,
        name: PropTypes.string,
        sub_url: PropTypes.string,
        items_count: PropTypes.string,
        thumb_url: PropTypes.string,
    })

export const
    incomingNichesListModel = process.env.NODE_ENV === 'production' ? null : PropTypes.objectOf(
        PropTypes.shape(nichesModelProps)
    )

const
    // {foo: 'foo', bar: 'bar'}
    nichesModelPropsKeys = process.env.NODE_ENV === 'production' ? null :
        Object.freeze(mapValues(nichesModelProps, (x, k) => k)),

    // get incoming property by verified key (which must be presented in the model)
    getProp = process.env.NODE_ENV === 'production' ? g :
        (src, propKey, ...xs) => g(src, g(nichesModelPropsKeys, propKey), ...xs)

export default (data, quantity = null, withImage = false) => {
    if (process.env.NODE_ENV !== 'production') {
        assertPropTypes(
            incomingNichesListModel,
            data,
            'getNichesList',
            'original source niches data'
        )
    }

    let
        preparedData = map(data, x => {
            const
                result = {
                    id: Number(getProp(x, 'id')),
                    name: getProp(x, 'name'),
                    subPage: getProp(x, 'sub_url'),
                    itemsCount: Number(getProp(x, 'items_count')),
                }

            if (withImage) {
                result.thumb = getProp(x, 'thumb_url')
            }

            return result
        })

    if (quantity)
        preparedData = preparedData.slice(0, quantity)


    if (process.env.NODE_ENV !== 'production') {
        assertPropTypes(
            withImage ? nichesListWithThumbModel : nichesListModel,
            preparedData,
            'getNichesList',
            'result niches data'
        )
    }

    return preparedData
}
