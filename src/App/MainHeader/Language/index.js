import React from 'react'
import {Select, MenuItem, OutlinedInput, CircularProgress, Chip} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import WarningIcon from '@material-ui/icons/Warning'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'
import {Record} from 'immutable'

import {immutableProvedGet as ig} from '../../helpers'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

import {
    Item,
    InlinedSelectionWrap,
    InlinedSelectionList,
    InlinedSelectionItem
} from './assets'

const
    LanguageSelectMaterial = ({classes, siteLocales, currentLanguage, chooseLanguage}) => <Select
        classes={{
            select: classes.select
        }}
        value={currentLanguage}
        input={
            <OutlinedInput
                classes={{
                    notchedOutline: classes.notchedOutline,
                }}
                onChange={chooseLanguage}
                labelWidth={0}
            />
        }
    >
        {
            siteLocales.map(siteLocale => <MenuItem
                classes={{
                    root: classes.menuItemRoot
                }}
                key={ig(siteLocale, 'code')}
                value={ig(siteLocale, 'code')}
            >
                <Item type={ig(siteLocale, 'code')}></Item>
                {ig(siteLocale, 'title')}
            </MenuItem>)
        }
    </Select>,

    // implementation for SSR, to give search engines bare links they could follow
    // TODO FIXME set proper `href` attribute
    // WARNING! <a> with `href` attribute is important to give bare links to SSR
    LanguageSelectInlined = ({siteLocales, currentLanguage}) => <InlinedSelectionWrap>
        <InlinedSelectionList>
            {siteLocales.map(siteLocale =>
                <InlinedSelectionItem
                    key={ig(siteLocale, 'code')}
                    href={`//${ig(siteLocale, 'host')}`}
                    isActive={currentLanguage === ig(siteLocale, 'code')}
                >
                    {ig(siteLocale, 'title')}
                </InlinedSelectionItem>
            )}
        </InlinedSelectionList>
    </InlinedSelectionWrap>,

    LanguageSelect = ({
        isSSR,
        classes,
        siteLocales,
        siteLocalesState,
        currentLanguage,
        chooseLanguage
    }) =>
        ig(siteLocalesState, 'isFailed')
        ? <Chip
            label="Failed to load site locales!"
            icon={<WarningIcon/>}
        />

        : ig(siteLocalesState, 'isLoading') || !ig(siteLocalesState, 'isLoaded')
        ? <CircularProgress/>

        : isSSR
        ? <LanguageSelectInlined
            classes={classes}
            siteLocales={siteLocales}
            currentLanguage={currentLanguage}
            chooseLanguage={chooseLanguage}
        />
        : <LanguageSelectMaterial
            classes={classes}
            siteLocales={siteLocales}
            currentLanguage={currentLanguage}
            chooseLanguage={chooseLanguage}
        />,

    SiteLocalesStateRecord = Record({
        isLoading: false,
        isLoaded: false,
        isFailed: false,
    })

export default compose(
    connect(
        state => {
            const language = ig(state, 'app', 'mainHeader', 'language')

            return {
                siteLocales: ig(language, 'siteLocales', 'list'),
                siteLocalesState: SiteLocalesStateRecord(ig(language, 'siteLocales')),
                currentLanguage: ig(language, 'currentLanguage'),
                isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            }
        },
        dispatch => ({
            loadSiteLocales: () => {
                dispatch(actions.loadSiteLocalesRequest())
            },

            chooseLanguage: event => {
                event.preventDefault()
                dispatch(actions.setNewLanguage(event.target.value))
            },
        })
    ),
    lifecycle({
        componentDidMount() {
            if (
                !ig(this.props.siteLocalesState, 'isLoading') &&
                !ig(this.props.siteLocalesState, 'isLoaded')
            ) {
                this.props.loadSiteLocales()
            }
        },
    }),
    withStyles(muiStyles)
)(LanguageSelect)
