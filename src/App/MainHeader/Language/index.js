import React from 'react'
import {Select, MenuItem, OutlinedInput} from "@material-ui/core"
import css from './assets/_.module.scss'
import {withStyles} from '@material-ui/core/styles'
import {languages} from './fixtures'

import {compose} from 'recompose'
import {connect} from 'react-redux'
import {toggleLanguage} from './actions'

const
    styles = {
        menuItemRoot: {
            display: 'flex'
        },
        select: {
            paddingRight: 25,
            paddingTop: 11.5,
            paddingBottom: 9,
            display: 'flex',
            alignItems: 'center'
        },
        notchedOutline: {
            border: 'none'
        }
    },

    LanguageSelect = ({classes, ui, toggleLanguageAction}) => <Select
        classes={{
            select: classes.select
        }}
        value={ui.get('currentLanguage')}
        input={
            <OutlinedInput
                classes={{
                    notchedOutline: classes.notchedOutline
                }}
                onChange={toggleLanguageAction}
                labelWidth={0}
                name="language"
                id="language"
            />
        }
    >
        {
            languages.map(language => <MenuItem 
                classes={{
                    root: classes.menuItemRoot
                }}
                key={language}
                value={language}>
                    <div className={css[language]}></div>
                    {language}
            </MenuItem>)
        }
    </Select>

export default compose(
    connect(
        state => ({
            ui: state.getIn(['app', 'mainHeader', 'language', 'ui'])
        }),
        dispatch => ({
            toggleLanguageAction: event => dispatch(toggleLanguage(event.target.value))
        })
    ),
    withStyles(styles)
)(LanguageSelect)
