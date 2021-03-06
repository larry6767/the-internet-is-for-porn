import React from 'react'
import {compose, withPropsOnChange} from 'recompose'
import {withStyles} from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'

// local libs
import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    setPropTypes,
    compareCurrentBreakpoint as ccb,
    breakpointSM as sm,
    breakpoints,
} from 'src/App/helpers'

import {immutableSortListModel} from 'src/App/models'
import {muiStyles} from 'src/generic/SortSelect/assets/muiStyles'

import {
    SortWrapper,
    InlinedSelectionWrap,
    InlinedSelectionList,
    InlinedSelectionItem,
} from 'src/generic/SortSelect/assets'

const
    SortSelectMaterial = setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classedBounds: PropTypes.shape({select: PropTypes.object}),
        sortList: immutableSortListModel,
        chooseSort: PropTypes.func,
        name: PropTypes.string,
    })(({classedBounds, i18n, sortList, chooseSort, name}) => {
        const
            activeItem = sortList.find(x => ig(x, 'isActive')) || ig(sortList, '0'),
            currentValue = name !== 'sponsor' ? ig(activeItem, 'code') :
                ig(activeItem, 'code').toLowerCase()

        return <Select
            classes={g(classedBounds, 'select')}
            value={currentValue}
            name={name}
            input={<InputBase onChange={chooseSort}/>}
        >
            {sortList.map(x =>
                <MenuItem
                    key={ig(x, 'code')}
                    value={name !== 'sponsor' ? ig(x, 'code') : ig(x, 'code').toLowerCase()}
                >
                    {(name !== 'sponsor') || (name === 'sponsor' && ig(x, 'code') === 'all')
                        ? ig(i18n, ig(x, 'code'))
                        : ig(x, 'code')}
                </MenuItem>
            )}
        </Select>
    }),

    SortSelectInlined = setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        sortList: immutableSortListModel,
        linkBuilder: PropTypes.func,
        name: PropTypes.string,
    })(({sortList, linkBuilder, i18n, name}) => <InlinedSelectionWrap>
        <InlinedSelectionList>
            {sortList.map(x =>
                <InlinedSelectionItem
                    key={ig(x, 'code')}
                    to={linkBuilder(name === 'ordering' ? {
                        ordering: ig(x, 'code'),
                        pagination: null,
                    }
                    : name === 'sponsor' ? {
                        sponsor: ig(x, 'code').toLowerCase(),
                        pagination: null,
                    }
                    : {
                        duration: ig(x, 'code'),
                        pagination: null,
                    })}
                    isActive={ig(x, 'isActive')}
                >
                    {(name !== 'sponsor') || (name === 'sponsor' && ig(x, 'code') === 'all')
                        ? ig(i18n, ig(x, 'code'))
                        : ig(x, 'code')}
                </InlinedSelectionItem>
            )}
        </InlinedSelectionList>
    </InlinedSelectionWrap>),

    SortSelect = ({isInlined = false, cb, isSSR, classedBounds, i18n, sortList, chooseSort, linkBuilder, name}) =>
        <SortWrapper>
            {ccb(cb, sm) === -1 ? null : <Typography
                variant="body1"
                classes={g(classedBounds, 'typography')}
            >
                {`${ig(i18n, 'label')}:`}
            </Typography>}

            {isSSR || isInlined
                ? <SortSelectInlined
                    sortList={sortList}
                    linkBuilder={linkBuilder}
                    i18n={i18n}
                    name={name}
                />
                : <SortSelectMaterial
                    classedBounds={classedBounds}
                    chooseSort={chooseSort}
                    name={name}
                    sortList={sortList}
                    linkBuilder={linkBuilder}
                    i18n={i18n}
                />
            }
        </SortWrapper>

export default compose(
    withStyles(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            select: Object.freeze({select: g(props, 'classes', 'selectRoot')}),
            typography: Object.freeze({root: g(props, 'classes', 'typographyRoot')}),
        }),
    })),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            typographyRoot: PropTypes.string,
            selectRoot: PropTypes.string,
        }),
        classedBounds: PropTypes.exact({
            select: PropTypes.object,
            typography: PropTypes.object,
        }),
        isInlined: PropTypes.bool.isOptional,
        cb: PropTypes.oneOf(breakpoints),
        isSSR: PropTypes.bool,

        // i18n:

        linkBuilder: PropTypes.func,
        chooseSort: PropTypes.func.isOptional,

        sortList: immutableSortListModel.isOptional,
    })
)(SortSelect)
