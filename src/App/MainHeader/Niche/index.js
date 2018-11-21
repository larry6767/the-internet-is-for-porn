import React from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Select, MenuItem, FormControl, OutlinedInput} from '@material-ui/core'

import {compareCurrentBreakpoint, breakpointXS} from '../../helpers'

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

const
    styles = {
        menuItemRoot: {
            display: 'flex'
        },
        select: {
            color: '#ffffff',
            paddingRight: 25,
            display: 'flex',
            alignItems: 'center'
        },
        icon: {
            color: '#ffffff'
        },
        notchedOutline: {
            border: 'none'
        }
    },

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
                            select: classes.select,
                            icon: classes.icon
                        }}
                        value={currentNiche}
                        onChange={selectNiche}
                        input={
                            <OutlinedInput
                                classes={{
                                    notchedOutline: classes.notchedOutline
                                }}
                                labelWidth={0}
                                name="niche"
                                id="niche"
                            />
                        }
                    >
                        {Object.keys(niches).map(key =>
                            <MenuItem
                                key={key}
                                value={key}
                            >
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
            currentNiche: state.getIn(['app', 'mainHeader', 'niche', 'currentNiche']),
            currentBreakpoint: state.getIn(['app', 'ui', 'currentBreakpoint']),
            isSSR: state.getIn(['app', 'ssr', 'isSSR']),
        }),
        dispatch => ({
            selectNiche: event => {
                event.preventDefault()
                dispatch(actions.toggleNiche(event.target.value || event.target.dataset.value))
            }
        })
    ),
    withStyles(styles)
)(Niche)
