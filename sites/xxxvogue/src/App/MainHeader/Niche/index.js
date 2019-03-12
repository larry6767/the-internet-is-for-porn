import {find} from 'lodash'
import React from 'react'
import {compose, withHandlers, onlyUpdateForKeys, withPropsOnChange} from 'recompose'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Select, MenuItem, FormControl, OutlinedInput} from '@material-ui/core'

import {
    compareCurrentBreakpoint,
    breakpointXS,
    plainProvedGet as g,
    immutableProvedGet as ig,
    PropTypes,
    setPropTypes,
    getRouterContext,
} from '../../helpers'

import {
    orientationCodes,
    routerContextModel,
    immutableI18nOrientationModel,
} from '../../models'

import routerGetters from '../../routerGetters'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

import {
    NicheBlock,
    NicheWrapper,
    NicheMobile,
    NicheMobileItem,
    NicheMobileItemSelected,
    TextIcon
} from './assets'

const
    orientationSymbols = Object.freeze({
        straight: 9892,
        gay: 9891,
        tranny: 9895,
    }),

    // This is called "niche" but we have another "niche" component and also section/page,
    // so everywhere else it's going to be "orientation" which stands for "sexual orientation"
    // to differ this "niche" from another.
    Niche = ({
        classedBounds,
        isSSR,
        currentOrientation,
        currentBreakpoint,
        i18nOrientation,
        orient,
        linkBuilder,
    }) => <NicheBlock isSSR={isSSR}>
        {
            /* rendering mobile version for SSR to render links with "href"s for search engines */
            /* TODO FIXME set proper `href` attribute */
            /* WARNING! <a> with `href` attribute is important to give bare links to SSR */
            (isSSR || compareCurrentBreakpoint(currentBreakpoint, breakpointXS) <= 0)

            ? <NicheMobile isSSR={isSSR}>
                {orientationCodes.map(orientationCode =>
                    currentOrientation === orientationCode

                    ? <NicheMobileItemSelected
                        key={orientationCode}
                        href={linkBuilder(orientationCode)}
                        onClick={orient}
                        data-value={orientationCode}
                    >
                        {`${String.fromCharCode(g(orientationSymbols, orientationCode))
                            } ${ig(i18nOrientation, orientationCode)}`}
                    </NicheMobileItemSelected>

                    : <NicheMobileItem
                        key={orientationCode}
                        href={linkBuilder(orientationCode)}
                        onClick={orient}
                        data-value={orientationCode}
                    >
                        {`${String.fromCharCode(g(orientationSymbols, orientationCode))
                            } ${ig(i18nOrientation, orientationCode)}`}
                    </NicheMobileItem>
                )}
            </NicheMobile>

            : <NicheWrapper>
                <FormControl variant="outlined">
                    <Select
                        classes={g(classedBounds, 'select')}
                        value={currentOrientation}
                        onChange={orient}
                        input={
                            <OutlinedInput
                                classes={g(classedBounds, 'outlinedInput')}
                                labelWidth={0}
                            />
                        }
                    >
                        {orientationCodes.map(orientationCode =>
                            <MenuItem key={orientationCode} value={orientationCode}>
                                <TextIcon>
                                    {String.fromCharCode(g(orientationSymbols, orientationCode))}
                                </TextIcon>
                                {ig(i18nOrientation, orientationCode)}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </NicheWrapper>
        }
    </NicheBlock>

export default compose(
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            routerContext: getRouterContext(state),
            i18nOrientation: ig(state, 'app', 'locale', 'i18n', 'orientation'),
        }),
        {
            switchOrientation: g(actions, 'switchOrientation'),
        }
    ),
    onlyUpdateForKeys(['currentBreakpoint', 'currentOrientation']),
    withHandlers({
        orient: props => event => {
            event.preventDefault()
            const evValue = g(event.target.value || event.target.dataset.value, [])
            props.switchOrientation(g(find(orientationCodes, code => code === evValue), []))
        },

        linkBuilder: props => orientationCode => routerGetters.home.link(
            g(props, 'routerContext').set('currentOrientation', g(orientationCode, []))
        ),
    }),
    withStyles(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            select: Object.freeze({
                select: g(props, 'classes', 'select'),
                icon: g(props, 'classes', 'icon'),
            }),
            outlinedInput: Object.freeze({notchedOutline: g(props, 'classes', 'notchedOutline')}),
        }),
    })),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            select: PropTypes.string,
            icon: PropTypes.string,
            notchedOutline: PropTypes.string,
        }),
        classedBounds: PropTypes.exact({
            select: PropTypes.object,
            outlinedInput: PropTypes.object,
        }),

        isSSR: PropTypes.bool,
        currentOrientation: PropTypes.oneOf(orientationCodes),
        currentBreakpoint: PropTypes.string,
        routerContext: routerContextModel,
        i18nOrientation: immutableI18nOrientationModel,
        switchOrientation: PropTypes.func,
        orient: PropTypes.func,
        linkBuilder: PropTypes.func,
    })
)(Niche)
