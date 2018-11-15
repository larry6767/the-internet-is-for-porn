import React from 'react'
import {Select, MenuItem, OutlinedInput} from "@material-ui/core"
import {withStyles} from '@material-ui/core/styles'
import {languages} from './fixtures'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import actions from './actions'
import {Item} from './assets'

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

    LanguageSelect = ({classes, currentLanguage, setNewLanguageAction}) => <Select
        classes={{
            select: classes.select
        }}
        value={currentLanguage}
        input={
            <OutlinedInput
                classes={{
                    notchedOutline: classes.notchedOutline
                }}
                onChange={setNewLanguageAction}
                labelWidth={0}
                name="language"
                id="language"
            />
        }
    >
        {
            Object.keys(languages).map(language => <MenuItem
                classes={{
                    root: classes.menuItemRoot
                }}
                key={language}
                value={language}
            >
                <Item type={language}></Item>
                {languages[language]}
            </MenuItem>)
        }
    </Select>

export default compose(
    connect(
        state => ({
            currentLanguage: state.getIn(['app', 'mainHeader', 'language', 'currentLanguage'])
        }),
        dispatch => ({
            setNewLanguageAction: event => dispatch(actions.setNewLanguage(event.target.value))
        })
    ),
    withStyles(styles)
)(LanguageSelect)
