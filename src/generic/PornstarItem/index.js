import React from 'react'
import {compose, withPropsOnChange, onlyUpdateForKeys} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import {Typography} from '@material-ui/core'

import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    ImmutablePropTypes,
    setPropTypes,
} from '../../App/helpers'

import {immutableI18nButtonsModel} from '../../App/models'
import {immutablePornstarItemModel} from './models'
import {muiStyles} from './assets/muiStyles'
import {Wrapper, Thumb, InfoBar, Like, StyledLinkBlock} from './assets'

const
    PornstarItem = props => <Wrapper>
        <StyledLinkBlock to={props.linkBuilder(ig(props.x, 'subPage'))}>
            <Thumb thumb={ig(props.x, 'thumb')} />
            <Typography variant="body2" className={g(props, 'classes', 'typographyTitle')}>
                {ig(props.x, 'name')}
            </Typography>
            <InfoBar>
                <Like>
                    {g(props, 'isThisPornstarFavorite')
                        ? <Favorite
                            className={g(props, 'classes', 'favoriteIcon')}
                            data-favorite-pornstar-id={ig(props.x, 'id')}
                            onClick={g(props, 'removeFromFavoriteHandler')}
                        />
                        : <FavoriteBorder
                            className={g(props, 'classes', 'favoriteBorderIcon')}
                            data-favorite-pornstar-id={ig(props.x, 'id')}
                            onClick={g(props, 'addToFavoriteHandler')}
                        />}
                </Like>
                <Typography
                    variant="body2"
                    className={g(props, 'classes', 'typographyQuantity')}
                >
                    {`${ig(props.x, 'itemsCount')} ${ig(props.i18nButtons, 'favoriteMovies')}`}
                </Typography>
            </InfoBar>
        </StyledLinkBlock>
    </Wrapper>

export default compose(
    withPropsOnChange(['x', 'favoritePornstarList'], props => ({
        isThisPornstarFavorite: Boolean(
            g(props, 'favoritePornstarList').find(id => id === ig(g(props, 'x'), 'id'))
        ),
    })),
    onlyUpdateForKeys(['isThisPornstarFavorite']),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.shape({
            typographyTitle: PropTypes.string,
            typographyQuantity: PropTypes.string,
            favoriteIcon: PropTypes.string,
            favoriteBorderIcon: PropTypes.string,
        }),

        x: immutablePornstarItemModel,
        i18nButtons: immutableI18nButtonsModel,
        favoritePornstarList: ImmutablePropTypes.listOf(PropTypes.number),
        linkBuilder: PropTypes.func,

        addToFavoriteHandler: PropTypes.func,
        removeFromFavoriteHandler: PropTypes.func,
    })
)(PornstarItem)
