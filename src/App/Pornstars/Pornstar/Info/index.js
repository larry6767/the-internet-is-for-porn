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
    Info = ({classes, modelInfo, modelThumb, modelInfoHandler, modelInfoIsOpen}) => <InfoWrapper>
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
        <DataWrapper>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableBody>
                        {modelInfo.map((x, idx) =>
                            !modelInfoIsOpen && idx > 3
                                ? null
                                : x.get('value')
                                ? <TableRow key={x.get('key')}>
                                    <TableCell component="td">{x.get('key')}</TableCell>
                                    <TableCell component="td">{x.get('value')}</TableCell>
                                </TableRow> : null
                        )}
                    </TableBody>
                </Table>
                </div>
            </Paper>
        </DataWrapper>
    </InfoWrapper>


export default withStyles(muiStyles)(Info)
