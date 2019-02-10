import React, {Fragment} from 'react'
import {compose} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Typography,
} from '@material-ui/core'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    breakpoints,
    breakpointXS as xs,
    breakpointSM as sm,
    compareCurrentBreakpoint as ccb,
    setPropTypes,
    PropTypes,
    ImmutablePropTypes,
} from '../../../helpers'
import {immutableI18nPornstarInfoParametersModel} from '../../../models'
import {immutablePornstarInfoModel, immutablePornstarInfoForTableModel} from '../models'
import {
    InfoWrapper,
    ThumbWrapper,
    MobileInfo,
    DataWrapper,
    Thumb,
    InfoBar,
    Like,
} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    paramsQuantityForMobile = 3,

    renderTableRow = (v, k, i18nPornstarInfoParameters, classes) => <TableRow key={`${k}-row`}>
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
        classes,
        isSSR,
        cb,
        i18nPornstarInfoParameters,
        pornstarInfo,
        pornstarInfoForTable,
        favoritePornstarList,
        modelInfoIsOpen,
        modelInfoHandler,
        addToFavoriteHandler,
        removeFromFavoriteHandler,
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
        <MobileInfo>
            {ccb(cb, sm) === -1
                ? pornstarInfoForTable.mapEntries(([k, v], idx) => [
                    idx <= paramsQuantityForMobile
                        ? <Fragment>
                            <Typography
                                variant="body1"
                                classes={{
                                    root: classes.typographyBold,
                                }}
                            >
                                {`${ig(i18nPornstarInfoParameters, k)}: `}
                            </Typography>
                            <Typography
                                variant="body1"
                                gutterBottom
                            >
                                {v}
                            </Typography>
                        </Fragment>
                        : null,
                    null
                ]).keySeq()
                : null}
        </MobileInfo>
        <DataWrapper modelInfoIsOpen={modelInfoIsOpen}>
            <Paper>
                <Table>
                    <TableBody>
                        {ccb(cb, sm) === -1 && modelInfoIsOpen
                            ? pornstarInfoForTable.mapEntries(([k, v], idx) => [
                                idx > paramsQuantityForMobile
                                    ? renderTableRow(v, k, i18nPornstarInfoParameters, classes)
                                    : null,
                                null
                            ]).keySeq()
                            : pornstarInfoForTable.mapEntries(([k, v], idx) => [
                                isSSR || modelInfoIsOpen
                                    ? renderTableRow(v, k, i18nPornstarInfoParameters, classes)
                                    : idx < 5 && ccb(cb, xs) === 1
                                    ? renderTableRow(v, k, i18nPornstarInfoParameters, classes)
                                    : null,
                                null
                            ]).keySeq()}
                    </TableBody>
                </Table>
            </Paper>
        </DataWrapper>
    </InfoWrapper>


export default compose(
    withStyles(muiStyles),
    setPropTypes({
        classes: PropTypes.exact({
            typography: PropTypes.string,
            typographyTitle: PropTypes.string,
            favoriteBorderIcon: PropTypes.string,
            favoriteIcon: PropTypes.string,
            buttonMore: PropTypes.string,
            tableCellRoot: PropTypes.string,
        }),
        isSSR: PropTypes.bool,
        cb: PropTypes.oneOf(breakpoints),
        i18nPornstarInfoParameters: immutableI18nPornstarInfoParametersModel,
        pornstarInfo: immutablePornstarInfoModel,
        pornstarInfoForTable: immutablePornstarInfoForTableModel,
        modelInfoIsOpen: PropTypes.bool,
        favoritePornstarList: ImmutablePropTypes.listOf(PropTypes.number),

        modelInfoHandler: PropTypes.func,
        addToFavoriteHandler: PropTypes.func,
        removeFromFavoriteHandler: PropTypes.func,
    })
)(Info)
