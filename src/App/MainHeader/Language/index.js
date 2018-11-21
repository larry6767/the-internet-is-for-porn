import React from 'react'
import {Select, MenuItem, OutlinedInput} from "@material-ui/core"
import {withStyles} from '@material-ui/core/styles'
import {languages} from './fixtures'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import actions from './actions'
import {Item, InlinedSelectionWrap, InlinedSelectionList, InlinedSelectionItem} from './assets'

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

    LanguageSelectMaterial = ({classes, currentLanguage, chooseLanguage}) => <Select
        classes={{
            select: classes.select
        }}
        value={currentLanguage}
        input={
            <OutlinedInput
                classes={{
                    notchedOutline: classes.notchedOutline
                }}
                onChange={chooseLanguage}
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
    </Select>,

    // implementation for SSR, to give search engines bare links they could follow
    // TODO FIXME set proper `href` attribute
    // WARNING! <a> with `href` attribute is important to give bare links to SSR
    LanguageSelectInlined = ({classes, currentLanguage, chooseLanguage}) => <InlinedSelectionWrap>
        <InlinedSelectionList>
            {Object.keys(languages).map(language =>
                <InlinedSelectionItem
                    key={language}
                    href="/TODO"
                    isActive={currentLanguage === language}
                >
                    <Item type={language}></Item>
                    {languages[language]}
                </InlinedSelectionItem>
            )}
        </InlinedSelectionList>
    </InlinedSelectionWrap>,

    LanguageSelect = ({isSSR, classes, currentLanguage, chooseLanguage}) => isSSR
        ? <LanguageSelectInlined
            classes={classes}
            currentLanguage={currentLanguage}
            chooseLanguage={chooseLanguage}
        />
        : <LanguageSelectMaterial
            classes={classes}
            currentLanguage={currentLanguage}
            chooseLanguage={chooseLanguage}
        />

export default compose(
    connect(
        state => ({
            currentLanguage: state.getIn(['app', 'mainHeader', 'language', 'currentLanguage']),
            isSSR: state.getIn(['app', 'ssr', 'isSSR']),
        }),
        dispatch => ({
            chooseLanguage: event => {
                event.preventDefault()
                dispatch(actions.setNewLanguage(event.target.value))
            },
        })
    ),
    withStyles(styles)
)(LanguageSelect)
