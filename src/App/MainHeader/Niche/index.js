import React from 'react'
import {Select, MenuItem, FormControl, OutlinedInput} from '@material-ui/core'

// TODO FIXME refactor this temporary hack for SSR
//import css from './assets/_.module.scss'

import {niches} from './fixtures'
import {withStyles} from '@material-ui/core/styles'

import {compose} from 'recompose'
import {connect} from 'react-redux'
import {toggleNiche} from './actions'

// TODO FIXME refactor this temporary hack for SSR
const css = {}

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

    Niche = ({classes, nicheUi, appUi, toggleNicheAction}) => <div className={css.niche}>
        {
            appUi.get('currentBreakpoint') === 'xs' || appUi.get('currentBreakpoint') === 'xxs' ?
                <div className={css.nicheMobile}>
                    {
                        Object.keys(niches).map(key => <div
                            key={key}
                            className={nicheUi.get('currentNiche') === key ? css.nicheMobileItemSelected : css.nicheMobileItem}
                            onClick={toggleNicheAction}
                            data-value={key}
                        >
                            {`${String.fromCharCode(niches[key])} ${key}`}
                        </div>)
                    }
                </div>
                :
                <div className={css.nicheWrapper}>
                        <FormControl variant="outlined" className={css.nicheSelect}>
                            <Select
                                classes={{
                                    select: classes.select,
                                    icon: classes.icon
                                }}
                                value={nicheUi.get('currentNiche')}
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
                                                <div className={css.textIcon}>{String.fromCharCode(niches[key])}</div>
                                                {key}
                                        </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
        }
    </div>

export default compose(
    connect(
        state => ({
            nicheUi: state.getIn(['app', 'mainHeader', 'niche', 'ui']),
            appUi: state.getIn(['app', 'ui'])
        }),
        dispatch => ({
            toggleNicheAction: event => dispatch(toggleNiche(event))
        })
    ),
    withStyles(styles)
)(Niche)
