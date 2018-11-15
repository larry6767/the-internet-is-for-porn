import React from 'react'
import {Select, MenuItem, FormControl, OutlinedInput} from '@material-ui/core'
import {niches} from './fixtures'
import {withStyles} from '@material-ui/core/styles'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {toggleNiche} from './actions'
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

    Niche = ({classes, currentNiche, currentBreakpoint, toggleNicheAction}) => <NicheBlock>
        {
            currentBreakpoint === 'xs' || currentBreakpoint === 'xxs' ?
                <NicheMobile>
                    {
                        Object.keys(niches).map(key => {

                            return currentNiche === key
                                ?
                                    <NicheMobileItemSelected
                                        key={key}
                                        onClick={toggleNicheAction}
                                        data-value={key}
                                    >
                                        {`${String.fromCharCode(niches[key])} ${key}`}
                                    </NicheMobileItemSelected>
                                :
                                    <NicheMobileItem
                                        key={key}
                                        onClick={toggleNicheAction}
                                        data-value={key}
                                    >
                                        {`${String.fromCharCode(niches[key])} ${key}`}
                                    </NicheMobileItem>
                        })
                    }
                </NicheMobile>
                :
                <NicheWrapper>
                    <FormControl variant="outlined">
                        <Select
                            classes={{
                                select: classes.select,
                                icon: classes.icon
                            }}
                            value={currentNiche}
                            onChange={toggleNicheAction}
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
                            {
                                Object.keys(niches).map(key => {
                                    return <MenuItem
                                        key={key}
                                        value={key}>
                                            <TextIcon>{String.fromCharCode(niches[key])}</TextIcon>
                                            {key}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </NicheWrapper>
        }
    </NicheBlock>

export default compose(
    connect(
        state => ({
            currentNiche: state.getIn(['app', 'mainHeader', 'niche', 'currentNiche']),
            currentBreakpoint: state.getIn(['app', 'ui', 'currentBreakpoint'])
        }),
        dispatch => ({
            toggleNicheAction: event => dispatch(toggleNiche(event))
        })
    ),
    withStyles(styles)
)(Niche)
