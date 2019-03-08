import React from 'react'
import {connect} from 'react-redux'
import {compose, withHandlers} from 'recompose'

import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    ImmutablePropTypes,
    setPropTypes,
    getRouterContext,
} from '../../App/helpers'

import {immutableI18nButtonsModel, routerContextModel} from '../../App/models'
import routerGetters from '../../App/routerGetters'
import {immutablePornstarItemModel} from '../PornstarItem/models'
import PornstarItem from '../PornstarItem'
import actions from '../../App/actions'
import {List} from './assets'

const
    PornstarList = props => <List>
        {g(props, 'pornstarList').map(x => <PornstarItem
            key={ig(x, 'id')}
            x={x}
            i18nButtons={g(props, 'i18nButtons')}
            favoritePornstarList={g(props, 'favoritePornstarList')}
            linkBuilder={g(props, 'linkBuilder')}
            addToFavoriteHandler={g(props, 'addToFavoriteHandler')}
            removeFromFavoriteHandler={g(props, 'removeFromFavoriteHandler')}
        />)}
    </List>

export default compose(
    connect(
        state => ({
            routerContext: getRouterContext(state),
            favoritePornstarList: ig(state, 'app', 'ui', 'favoritePornstarList'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
        }),
        {
            addPornstarToFavorite: g(actions, 'addPornstarToFavorite'),
            removePornstarFromFavorite: g(actions, 'removePornstarFromFavorite'),
        }
    ),
    withHandlers({
        addToFavoriteHandler: props => event => {
            event.preventDefault()

            const
                id = Number(g(event.currentTarget.getAttribute('data-favorite-pornstar-id'), [])),
                x = props.pornstarList.find(x => ig(x, 'id') === id)

            props.addPornstarToFavorite(x)
        },

        removeFromFavoriteHandler: props => event => {
            event.preventDefault()

            const
                id = Number(g(event.currentTarget.getAttribute('data-favorite-pornstar-id'), [])),
                x = props.pornstarList.find(x => ig(x, 'id') === id)

            props.removePornstarFromFavorite(ig(x, 'id'))
        },

        linkBuilder: props => child =>
            routerGetters.pornstar.link(g(props, 'routerContext'), child, null),
    }),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        routerContext: routerContextModel,
        i18nButtons: immutableI18nButtonsModel,
        pornstarList: ImmutablePropTypes.listOf(immutablePornstarItemModel),
        favoritePornstarList: ImmutablePropTypes.listOf(PropTypes.number),

        linkBuilder: PropTypes.func,
        addPornstarToFavorite: PropTypes.func,
        addToFavoriteHandler: PropTypes.func,
        removePornstarFromFavorite: PropTypes.func,
        removeFromFavoriteHandler: PropTypes.func,
    }),
)(PornstarList)
