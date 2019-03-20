import {set, map, pick} from 'lodash'

// local libs
import {PropTypes, assertPropTypes, plainProvedGet as g} from 'src/App/helpers'

const
    ordering = Object.freeze({
        sort_LATEST: 'byDate',
        sort_LONGEST: 'byDuration',
        sort_POPULAR: 'byPopularity',
        sort_RELEVANT: 'byRelevant',
    }),

    favorites = Object.freeze({
        fav_galleries: 'galleries',
        fav_models: 'models',
    }),

    incomingSortModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.shape({ACTIVE: PropTypes.bool}).isOptional,

    orderingIncomingModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape(
        Object.keys(ordering).reduce((ob, key) => set(ob, key, incomingSortModel), {})
    ),

    favoritesIncomingModel = process.env.NODE_ENV === 'production' ? null : PropTypes.shape(
        Object.keys(favorites).reduce((ob, key) => set(ob, key, incomingSortModel), {})
    ),

    sortModel = process.env.NODE_ENV === 'production' ? null :
        PropTypes.arrayOf(PropTypes.exact({
            isActive: PropTypes.bool,
            code: PropTypes.string,
        }))

export const
    getOrderingSortList = activeNavTabs => {
        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                orderingIncomingModel,
                activeNavTabs,
                'getOrderingSortList',
                'incoming data'
            )

        const
            result = map(
                pick(activeNavTabs, Object.keys(ordering)),
                ({ACTIVE}, key) => ({isActive: ACTIVE, code: g(ordering, key)})
            )

        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(sortModel, result, 'getOrderingSortList', 'result')

        return result
    },

    getFavoritesSortList = activeNavTabs => {
        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(
                favoritesIncomingModel,
                activeNavTabs,
                'getFavoritesSortList',
                'incoming data'
            )

        const
            result = map(
                pick(activeNavTabs, Object.keys(favorites)),
                ({ACTIVE}, key) => ({isActive: ACTIVE, code: g(favorites, key)})
            )

        if (process.env.NODE_ENV !== 'production')
            assertPropTypes(sortModel, result, 'getFavoritesSortList', 'result')

        return result
    }
