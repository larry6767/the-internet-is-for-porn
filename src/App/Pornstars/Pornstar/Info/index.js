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
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
} from '../../../helpers'
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
    renderTableRow = (v, k, i18nPornstarInfoParameters, classes) => !v ? null : <TableRow key={`${k}-row`}>
        <TableCell
            component="td"
            classes={{
                root: classes.tableCellRoot
            }}
        >
            {ig(i18nPornstarInfoParameters, k)}
        </TableCell>
        <TableCell component="td">{v}</TableCell>
    </TableRow>,

    Info = ({
        classes, i18nPornstarInfoParameters, pornstarInfo, pornstarInfoForTable, modelInfoHandler,
        modelInfoIsOpen, favoritePornstarList, currentBreakpoint, isSSR,
        addToFavoriteHandler, removeFromFavoriteHandler,
    }) => <InfoWrapper>
        <ThumbWrapper>
            <Thumb thumb={ig(pornstarInfo, 'thumbUrl')}/>
            <InfoBar>
                <Like>
                    {favoritePornstarList.find(id => id === ig(pornstarInfo, 'id'))
                        ? <Favorite
                            classes={{root: g(classes, 'favoriteIcon')}}
                            data-favorite-pornstar-id={ig(pornstarInfo, 'id')}
                            onClick={removeFromFavoriteHandler}
                        />
                        : <FavoriteBorder
                            classes={{root: g(classes, 'favoriteBorderIcon')}}
                            data-favorite-pornstar-id={ig(pornstarInfo, 'id')}
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
                        {pornstarInfoForTable.toSeq().map((v, k) =>
                            renderTableRow(v, k, i18nPornstarInfoParameters, classes)).valueSeq()}

                            {/* isSSR
                                ? renderTableRow(x, idx, classes)
                                : x.get('value') && modelInfoIsOpen
                                ? renderTableRow(x, idx, classes)
                                : idx < 4 && !(currentBreakpoint === 'xxs' || currentBreakpoint === 'xs')
                                ? renderTableRow(x, idx, classes)
                                : null */}
                    </TableBody>
                </Table>
            </Paper>
        </DataWrapper>
    </InfoWrapper>


export default withStyles(muiStyles)(Info)
