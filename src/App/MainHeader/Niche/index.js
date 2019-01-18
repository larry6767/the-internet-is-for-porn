import React from 'react'
import {compose, withHandlers} from 'recompose'
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
} from '../../helpers'

import {niches} from './fixtures'
import actions from './actions'
import {
    NicheBlock,
    NicheWrapper,
    NicheMobile,
    NicheMobileItem,
    NicheMobileItemSelected,
    TextIcon
} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    Niche = ({classes, currentNiche, currentBreakpoint, selectNiche, isSSR}) => <NicheBlock>
        {
            /* rendering mobile version for SSR to render links with "href"s for search engines */
            /* TODO FIXME set proper `href` attribute */
            /* WARNING! <a> with `href` attribute is important to give bare links to SSR */
            (isSSR || compareCurrentBreakpoint(currentBreakpoint, breakpointXS) <= 0)

            ? <NicheMobile>
                {Object.keys(niches).map(key =>
                    currentNiche === key

                    ? <NicheMobileItemSelected
                        key={key}
                        href="/TODO"
                        onClick={selectNiche}
                        data-value={key}
                    >
                        {`${String.fromCharCode(niches[key])} ${key}`}
                    </NicheMobileItemSelected>

                    : <NicheMobileItem
                        key={key}
                        href="/TODO"
                        onClick={selectNiche}
                        data-value={key}
                    >
                        {`${String.fromCharCode(niches[key])} ${key}`}
                    </NicheMobileItem>
                )}
            </NicheMobile>

            : <NicheWrapper>
                <FormControl variant="outlined">
                    <Select
                        classes={{
                            select: g(classes, 'select'),
                            icon: g(classes, 'icon'),
                        }}
                        value={currentNiche}
                        onChange={selectNiche}
                        input={
                            <OutlinedInput
                                classes={{
                                    notchedOutline: g(classes, 'notchedOutline'),
                                }}
                                labelWidth={0}
                            />
                        }
                    >
                        {Object.keys(niches).map(key =>
                            <MenuItem key={key} value={key}>
                                <TextIcon>{String.fromCharCode(niches[key])}</TextIcon>
                                {key}
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
            currentNiche: ig(state, 'app', 'mainHeader', 'niche', 'currentNiche'),
            currentBreakpoint: ig(state, 'app', 'ui', 'currentBreakpoint'),
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
        }),
        {
            toggleNiche: g(actions, 'toggleNiche'),
        }
    ),
    withHandlers({
        selectNiche: props => event => {
            event.preventDefault()
            props.toggleNiche(event.target.value || event.target.dataset.value)
        },
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.shape({
            select: PropTypes.string,
            icon: PropTypes.string,
            notchedOutline: PropTypes.string,
        }),
        isSSR: PropTypes.bool,
        currentNiche: PropTypes.string,
        currentBreakpoint: PropTypes.string,
        toggleNiche: PropTypes.func,
        selectNiche: PropTypes.func,
    })
)(Niche)
