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
import Favorite from '@material-ui/icons/FavoriteBorder'
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

    Info = ({classes, modelInfo, modelThumb, modelInfoHandler, modelInfoIsOpen, currentBreakpoint}) => <InfoWrapper>
        <ThumbWrapper>
            <Thumb thumb={modelThumb}/>
            <InfoBar>
                <Like>
                    <Favorite classes={{root: classes.favoriteIcon}}/>
                </Like>
                <Button
                    variant="outlined"
                    color="primary"
                    classes={{
                        root: classes.buttonMore
                    }}
                    onClick={modelInfoHandler}
                >
                    {modelInfoIsOpen
                        ? 'hide info'
                        : 'show info'}
                </Button>
            </InfoBar>
        </ThumbWrapper>
        <DataWrapper
            modelInfoIsOpen={modelInfoIsOpen}
        >
            <Paper>
                <Table>
                    <TableBody>
                        {modelInfo.map((x, idx) =>
                            x.get('value') && modelInfoIsOpen
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
