import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import {Typography} from '@material-ui/core'
import {
    List,
    PornstarItem,
    Thumb,
    InfoBar,
    Like,
} from './assets'
import {muiStyles} from './assets/muiStyles'
import actions from '../../App/actions'

const
    PornstarList = ({
        classes,
        pornstarList,
        favoritePornstarList,
        addToFavoriteHandler,
        removeFromFavoriteHandler,
    }) => {
        return <List>
            {pornstarList.map(x =>
                <PornstarItem key={x.get('id')}>
                    <Link
                        to={`/porn-star/${x.get('subPage')}${x.get('sort')}`}
                        className={classes.routerLink}
                    >
                        <Thumb thumb={x.get('thumb')} />
                        <Typography
                            variant="body2"
                            classes={{root: classes.typographyTitle}}
                        >
                            {x.get('name')}
                        </Typography>
                        <InfoBar>
                            <Like>
                                {favoritePornstarList.find(id => id === Number(x.get('id')))
                                    ? <Favorite
                                        classes={{root: classes.favoriteIcon}}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            removeFromFavoriteHandler(Number(x.get('id')))
                                        }}
                                    />
                                    : <FavoriteBorder
                                        classes={{root: classes.favoriteBorderIcon}}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addToFavoriteHandler(x)
                                        }}
                                    />
                                }
                            </Like>
                            <Typography
                                variant="body2"
                                classes={{root: classes.typographyQuantity}}
                            >
                                {`${x.get('itemsCount')} Films`}
                            </Typography>
                        </InfoBar>
                    </Link>
                </PornstarItem>
            )}
        </List>
    }

export default compose(
    connect(
        state => ({
            favoritePornstarList: state.getIn(['app', 'ui', 'favoritePornstarList'])
        }),
        dispatch => ({
            addToFavoriteHandler: video => dispatch(actions.addPornstarToFavorite(video)),
            removeFromFavoriteHandler: id => dispatch(actions.removePornstarFromFavorite(id))
        })
    ),
    withStyles(muiStyles)
)(PornstarList)
