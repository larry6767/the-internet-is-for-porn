import React, {Fragment} from 'react'
import {compose, withPropsOnChange, withState, withHandlers} from 'recompose'
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

import {immutableI18nPornstarInfoParametersModel, immutableI18nButtonsModel} from '../../../models'
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
    paramsShrinkedQuantityForDesktop = 5,

    renderTableRow = (v, k, i18nPornstarInfoParameters, classedBounds) =>
        <TableRow key={`${k}-row`}>
            <TableCell component="td" classes={g(classedBounds, 'tableCellRoot')}>
                {ig(i18nPornstarInfoParameters, k)}
            </TableCell>
            <TableCell component="td">{v}</TableCell>
        </TableRow>,

    Info = ({
        classedBounds,
        isSSR,
        cb,
        i18nPornstarInfoParameters,
        i18nButtons,
        pornstarInfo,
        favoritePornstarList,
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
                    {favoritePornstarList.find(id => id === ig(pornstarInfo, 'id'))
                        ? <Favorite
                            classes={g(classedBounds, 'favoriteIcon')}
                            data-favorite-pornstar-id={ig(pornstarInfo, 'id')}
                            onClick={removeFromFavoriteHandler}
                        />
                        : <FavoriteBorder
                            classes={g(classedBounds, 'favoriteBorderIcon')}
                            data-favorite-pornstar-id={ig(pornstarInfo, 'id')}
                            onClick={addToFavoriteHandler}
                        />
                    }
                </Like>
                {isSSR ? null : <Button
                    variant="outlined"
                    color="primary"
                    classes={g(classedBounds, 'buttonMore')}
                    onClick={toggleModelInfoIsOpened}
                >
                    {modelInfoIsOpened
                        ? ig(i18nButtons, 'hideInfo')
                        : ig(i18nButtons, 'showInfo')}
                </Button>}
            </InfoBar>
        </ThumbWrapper>
        <MobileInfo>{infoTableMobileItems}</MobileInfo>
        <DataWrapper modelInfoIsOpened={modelInfoIsOpened}>
            <Paper>
                <Table>
                    <TableBody>{infoTableItems}</TableBody>
                </Table>
            </Paper>
        </DataWrapper>
    </InfoWrapper>


export default compose(
    withStyles(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            tableCellRoot: Object.freeze({root: g(props, 'classes', 'tableCellRoot')}),
            favoriteIcon: Object.freeze({root: g(props, 'classes', 'favoriteIcon')}),
            favoriteBorderIcon: Object.freeze({root: g(props, 'classes', 'favoriteBorderIcon')}),
            buttonMore: Object.freeze({root: g(props, 'classes', 'buttonMore')}),
        }),
    })),
    withPropsOnChange(['cb', 'pornstarInfoForTable'], props => {
        const
            cb = g(props, 'cb'),
            isMobile = ccb(cb, sm) === -1

        if (!isMobile)
            return {infoTableMobileItems: null}

        const
            classes = g(props, 'classes'),
            typographyBold = Object.freeze({root: g(classes, 'typographyBold')}),
            pornstarInfoForTable = g(props, 'pornstarInfoForTable'),
            i18nPornstarInfoParameters = g(props, 'i18nPornstarInfoParameters'),

            mobileInfoItems =
                pornstarInfoForTable.mapEntries(([k, v], idx) => [
                    idx <= paramsQuantityForMobile
                        ? <Fragment>
                            <Typography variant="body1" classes={typographyBold}>
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
            classedBounds = g(props, 'classedBounds'),

            eitherDesktopOrMobileRestItems =
                isMobile && modelInfoIsOpened

                ? pornstarInfoForTable.mapEntries(([k, v], idx) => [
                    idx > paramsQuantityForMobile
                        ? renderTableRow(v, k, i18nPornstarInfoParameters, classedBounds)
                        : null,
                    null
                ]).keySeq()

                : pornstarInfoForTable.mapEntries(([k, v], idx) => [
                    g(props, 'isSSR') || modelInfoIsOpened
                        ? renderTableRow(v, k, i18nPornstarInfoParameters, classedBounds)
                        : idx < paramsShrinkedQuantityForDesktop && ccb(cb, xs) === 1
                        ? renderTableRow(v, k, i18nPornstarInfoParameters, classedBounds)
                        : null,
                    null
                ]).keySeq()

        return {infoTableItems: eitherDesktopOrMobileRestItems}
    }),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            typography: PropTypes.string,
            typographyBold: PropTypes.string,
            typographyTitle: PropTypes.string,
            favoriteBorderIcon: PropTypes.string,
            favoriteIcon: PropTypes.string,
            buttonMore: PropTypes.string,
            tableCellRoot: PropTypes.string,
        }),

        classedBounds: PropTypes.exact({
            tableCellRoot: PropTypes.object,
            favoriteIcon: PropTypes.object,
            favoriteBorderIcon: PropTypes.object,
            buttonMore: PropTypes.object,
        }),

        isSSR: PropTypes.bool,
        cb: PropTypes.oneOf(breakpoints),
        i18nPornstarInfoParameters: immutableI18nPornstarInfoParametersModel,
        i18nButtons: immutableI18nButtonsModel,
        pornstarInfo: immutablePornstarInfoModel,
        pornstarInfoForTable: immutablePornstarInfoForTableModel,
        favoritePornstarList: ImmutablePropTypes.listOf(PropTypes.number),

        infoTableMobileItems: PropTypes.nullable(ImmutablePropTypes.seq),
        infoTableItems: ImmutablePropTypes.seq,

        addToFavoriteHandler: PropTypes.func,
        removeFromFavoriteHandler: PropTypes.func,

        modelInfoIsOpened: PropTypes.bool,
        setModelInfoIsOpened: PropTypes.func,
        toggleModelInfoIsOpened: PropTypes.func,
    })
)(Info)
