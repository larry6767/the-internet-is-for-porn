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
    Info = ({classes, modelInfo, modelThumb}) => <InfoWrapper>
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
                >
                    show bio
                </Button>
            </InfoBar>
        </ThumbWrapper>
        <DataWrapper>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableBody>
                        {modelInfo.map(x => {
                            if (x.get('value'))
                            return <TableRow key={x[0]}>
                                <TableCell component="td">{x.get('key')}</TableCell>
                                <TableCell component="td">{x.get('value')}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                </div>
            </Paper>
        </DataWrapper>
    </InfoWrapper>


export default withStyles(muiStyles)(Info)
