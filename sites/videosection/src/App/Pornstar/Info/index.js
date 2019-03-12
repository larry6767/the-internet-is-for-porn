import React, {Fragment} from 'react'
import {compose, withPropsOnChange, withState, withHandlers, onlyUpdateForKeys} from 'recompose'
import {withStyles} from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Button from '@material-ui/core/Button'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'

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
} from '../../helpers'

import {immutableI18nPornstarInfoParametersModel, immutableI18nButtonsModel} from '../../models'
import {immutablePornstarInfoModel, immutablePornstarInfoForTableModel} from '../models'
import {muiStyles} from './assets/muiStyles'

import {
    InfoWrapper,
    ThumbWrapper,
    MobileInfo,
    DataWrapper,
    Thumb,
    InfoBar,
    Like,
} from './assets'

const
    paramsQuantityForMobile = 3,
    paramsShrinkedQuantityForDesktop = 4,

    renderTableRow = (v, k, i18nPornstarInfoParameters, classes) =>
        <TableRow key={`${k}-row`}>
            <TableCell component="td" className={g(classes, 'tableCellRoot')}>
                {ig(i18nPornstarInfoParameters, k)}
            </TableCell>
            <TableCell component="td">{v}</TableCell>
        </TableRow>,

    renderTableButton = (modelInfoIsOpened, toggleModelInfoIsOpened, i18nButtons, classes) =>
        <Toolbar className={g(classes, 'toolbar')} onClick={toggleModelInfoIsOpened}>
            {modelInfoIsOpened
                ? <Button className={g(classes, 'tableButton')}>
                    {ig(i18nButtons, 'hideInfo')}
                    <ArrowDropUp/>
                </Button>
                : <Button className={g(classes, 'tableButton')}>
                    {ig(i18nButtons, 'showInfo')}
                    <ArrowDropDown/>
                </Button>}
        </Toolbar>,

    Info = ({
        classes,
        isSSR,
        i18nButtons,
        pornstarInfo,
        isThisModelFavorite,
        infoTableMobileItems,
        infoTableItems,
        addToFavoriteHandler,
        removeFromFavoriteHandler,
        modelInfoIsOpened,
        toggleModelInfoIsOpened,
    }) => <InfoWrapper>
        <ThumbWrapper>
            <Thumb thumb={ig(pornstarInfo, 'thumbUrl')}/>
            <InfoBar>
                <Like>
                    {isThisModelFavorite
                        ? <Favorite
                            className={g(classes, 'favoriteIcon')}
                            data-favorite-pornstar-id={ig(pornstarInfo, 'id')}
                            onClick={removeFromFavoriteHandler}
                        />
                        : <FavoriteBorder
                            className={g(classes, 'favoriteBorderIcon')}
                            data-favorite-pornstar-id={ig(pornstarInfo, 'id')}
                            onClick={addToFavoriteHandler}
                        />
                    }
                </Like>
                {/* {isSSR ? null : <Button
                    variant="outlined"
                    color="primary"
                    className={g(classes, 'buttonMore')}
                    onClick={toggleModelInfoIsOpened}
                >
                    {modelInfoIsOpened
                        ? ig(i18nButtons, 'hideInfo')
                        : ig(i18nButtons, 'showInfo')}
                </Button>} */}
            </InfoBar>
        </ThumbWrapper>
        <MobileInfo>{infoTableMobileItems}</MobileInfo>
        <DataWrapper modelInfoIsOpened={modelInfoIsOpened}>
            <Paper>
                <Table>
                    <TableBody>
                        {infoTableItems}
                    </TableBody>
                </Table>
                {isSSR ? null : renderTableButton(
                    modelInfoIsOpened,
                    toggleModelInfoIsOpened,
                    i18nButtons,
                    classes,
                )}
            </Paper>
        </DataWrapper>
    </InfoWrapper>


export default compose(
    withStyles(muiStyles),
    withPropsOnChange(['cb', 'pornstarInfoForTable'], props => {
        const
            cb = g(props, 'cb'),
            isMobile = ccb(cb, sm) === -1

        if (!isMobile)
            return {infoTableMobileItems: null}

        const
            classes = g(props, 'classes'),
            pornstarInfoForTable = g(props, 'pornstarInfoForTable'),
            i18nPornstarInfoParameters = g(props, 'i18nPornstarInfoParameters'),

            mobileInfoItems =
                pornstarInfoForTable.mapEntries(([k, v], idx) => [
                    idx <= paramsQuantityForMobile
                        ? <Fragment>
                            <Typography variant="body1" className={g(classes, 'typographyBold')}>
                                {`${ig(i18nPornstarInfoParameters, k)}: `}
                            </Typography>
                            <Typography variant="body1" gutterBottom>{v}</Typography>
                        </Fragment>
                        : null,
                    null
                ]).keySeq()

        return {infoTableMobileItems: mobileInfoItems}
    }),
    withState('modelInfoIsOpened', 'setModelInfoIsOpened', false),
    withHandlers({
        toggleModelInfoIsOpened: props => () =>
            props.setModelInfoIsOpened(!g(props, 'modelInfoIsOpened')),
    }),
    withPropsOnChange(['cb', 'modelInfoIsOpened', 'pornstarInfoForTable'], props => {
        const
            cb = g(props, 'cb'),
            isMobile = ccb(cb, sm) === -1,
            modelInfoIsOpened = g(props, 'modelInfoIsOpened'),
            pornstarInfoForTable = g(props, 'pornstarInfoForTable'),
            i18nPornstarInfoParameters = g(props, 'i18nPornstarInfoParameters'),
            classes = g(props, 'classes'),

            eitherDesktopOrMobileRestItems =
                isMobile && modelInfoIsOpened

                ? pornstarInfoForTable.mapEntries(([k, v], idx) => [
                    idx > paramsQuantityForMobile
                        ? renderTableRow(v, k, i18nPornstarInfoParameters, classes)
                        : null,
                    null
                ]).keySeq()

                : pornstarInfoForTable.mapEntries(([k, v], idx) => [
                    g(props, 'isSSR') || modelInfoIsOpened
                        ? renderTableRow(v, k, i18nPornstarInfoParameters, classes)
                        : idx < paramsShrinkedQuantityForDesktop && ccb(cb, xs) === 1
                        ? renderTableRow(v, k, i18nPornstarInfoParameters, classes)
                        : null,
                    null
                ]).keySeq()

        return {infoTableItems: eitherDesktopOrMobileRestItems}
    }),
    withPropsOnChange(['pornstarInfo', 'favoritePornstarList'], props => ({
        isThisModelFavorite: Boolean(
            g(props, 'favoritePornstarList').find(id => id === ig(g(props, 'pornstarInfo'), 'id'))
        ),
    })),
    onlyUpdateForKeys([
        'cb',
        'pornstarInfo',
        'isThisModelFavorite',
        'infoTableMobileItems',
        'infoTableItems',
        'addToFavoriteHandler',
        'removeFromFavoriteHandler',
        'modelInfoIsOpened',
    ]),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            typographyBold: PropTypes.string,
            favoriteBorderIcon: PropTypes.string,
            favoriteIcon: PropTypes.string,
            buttonMore: PropTypes.string,
            tableCellRoot: PropTypes.string,
            toolbar: PropTypes.string,
            tableButton: PropTypes.string,
        }),

        isSSR: PropTypes.bool,
        cb: PropTypes.oneOf(breakpoints),
        i18nPornstarInfoParameters: immutableI18nPornstarInfoParametersModel,
        i18nButtons: immutableI18nButtonsModel,
        pornstarInfo: immutablePornstarInfoModel,
        pornstarInfoForTable: immutablePornstarInfoForTableModel,
        favoritePornstarList: ImmutablePropTypes.listOf(PropTypes.number),
        isThisModelFavorite: PropTypes.bool,

        infoTableMobileItems: PropTypes.nullable(ImmutablePropTypes.seq),
        infoTableItems: ImmutablePropTypes.seq,

        addToFavoriteHandler: PropTypes.func,
        removeFromFavoriteHandler: PropTypes.func,

        modelInfoIsOpened: PropTypes.bool,
        setModelInfoIsOpened: PropTypes.func,
        toggleModelInfoIsOpened: PropTypes.func,
    })
)(Info)
