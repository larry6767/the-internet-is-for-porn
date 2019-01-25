import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import {plainProvedGet as g} from '../../../helpers'
import {
    InfoWrapper,
    ThumbWrapper,
    DataWrapper,
    Thumb,
    InfoBar,
    Like,
} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    renderTableRow = (x, idx, classes) => <TableRow key={x.get('key')}>
        <TableCell
            component="td"
            classes={{
                root: classes.tableCellRoot
            }}
        >
            {x.get('key')}
        </TableCell>
        <TableCell component="td">{x.get('value')}</TableCell>
    </TableRow>,

    Info = ({
        classes, modelId, modelInfo, modelThumb, modelInfoHandler,
        modelInfoIsOpen, favoritePornstarList, currentBreakpoint, isSSR,
        addToFavoriteHandler, removeFromFavoriteHandler,
    }) => <InfoWrapper>
        <ThumbWrapper>
            <Thumb thumb={modelThumb}/>
            <InfoBar>
                <Like>
                    {favoritePornstarList.find(id => id === modelId)
                        ? <Favorite
                            classes={{root: g(classes, 'favoriteIcon')}}
                            data-favorite-pornstar-id={modelId}
                            onClick={removeFromFavoriteHandler}
                        />
                        : <FavoriteBorder
                            classes={{root: g(classes, 'favoriteBorderIcon')}}
                            data-favorite-pornstar-id={modelId}
                            onClick={addToFavoriteHandler}
                        />
                    }
                </Like>
                {!isSSR ? <Button
                    variant="outlined"
                    color="primary"
                    classes={{
                        root: classes.buttonMore
                    }}
                    onClick={modelInfoHandler}
                >
                    {modelInfoIsOpen /* TODO localize */
                        ? 'hide info'
                        : 'show info'}
                </Button> : null}
            </InfoBar>
        </ThumbWrapper>
        <DataWrapper
            modelInfoIsOpen={modelInfoIsOpen}
        >
            <Paper>
                <Table>
                    <TableBody>
                        {modelInfo.map((x, idx) =>
                            isSSR
                                ? renderTableRow(x, idx, classes)
                                : x.get('value') && modelInfoIsOpen
                                ? renderTableRow(x, idx, classes)
                                : idx < 4 && !(currentBreakpoint === 'xxs' || currentBreakpoint === 'xs')
                                ? renderTableRow(x, idx, classes)
                                : null
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </DataWrapper>
    </InfoWrapper>


export default withStyles(muiStyles)(Info)
