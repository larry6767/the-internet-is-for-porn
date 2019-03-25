import React from 'react'
import {compose, withPropsOnChange, onlyUpdateForKeys} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Typography from '@material-ui/core/Typography'

// local libs
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    ImmutablePropTypes,
    setPropTypes,
    lazyImage,
} from 'src/App/helpers'

import {immutableI18nButtonsModel} from 'src/App/models'
import {immutablePornstarItemModel} from 'src/generic/PornstarItem/models'
import {muiStyles} from 'src/generic/PornstarItem/assets/muiStyles'
import {Wrapper, Thumb, InfoBar, Like, StyledLinkBlock} from 'src/generic/PornstarItem/assets'

const
    PornstarItem = props => <Wrapper>
        <StyledLinkBlock to={props.linkBuilder(ig(props.x, 'subPage'))}>
            <Thumb ref={g(props, 'setRef')} style={g(props, 'previewStyle')}/> {/*from lazyImage*/}
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
    lazyImage,
    withPropsOnChange(['x', 'favoritePornstarList'], props => ({
        isThisPornstarFavorite: Boolean(
            g(props, 'favoritePornstarList').find(id => id === ig(g(props, 'x'), 'id'))
        ),
    })),
    onlyUpdateForKeys(['x', 'isThisPornstarFavorite', 'previewStyle']),
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
