import React from 'react'
import {Select, MenuItem, OutlinedInput, CircularProgress, Chip} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import WarningIcon from '@material-ui/icons/Warning'
import {connect} from 'react-redux'
import {compose, lifecycle, onlyUpdateForKeys, withPropsOnChange} from 'recompose'
import {Record} from 'immutable'

import {plainProvedGet as g, immutableProvedGet as ig, setPropTypes, PropTypes, ImmutablePropTypes} from '../../helpers'
import actions from './actions'
import {muiStyles} from './assets/muiStyles'

import {
    Item,
    InlinedSelectionWrap,
    InlinedSelectionList,
    InlinedSelectionItem,
    SelectWrapper,
} from './assets'

const
    LanguageSelectMaterial = ({classedBounds, siteLocales, currentLanguage, chooseLanguage}) => <Select
        classes={g(classedBounds, 'select')}
        value={currentLanguage}
        input={
            <OutlinedInput
                classes={g(classedBounds, 'outlinedInput')}
                onChange={chooseLanguage}
                labelWidth={0}
            />
        }
    >
        {
            siteLocales.map(siteLocale => <MenuItem
                classes={g(classedBounds, 'menuItem')}
                key={ig(siteLocale, 'code')}
                value={ig(siteLocale, 'code')}
            >
                <Item type={ig(siteLocale, 'code')}/>
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
                    <Item type={ig(siteLocale, 'code')}/>
                    {ig(siteLocale, 'title')}
                </InlinedSelectionItem>
            )}
        </InlinedSelectionList>
    </InlinedSelectionWrap>,

    LanguageSelect = ({
        isSSR,
        classedBounds,
        siteLocales,
        siteLocalesState,
        currentLanguage,
        chooseLanguage
    }) => <SelectWrapper>
        {ig(siteLocalesState, 'isFailed')
        ? <Chip
            label="Failed to load site locales!"
            icon={<WarningIcon/>}
        />

        : ig(siteLocalesState, 'isLoading') || !ig(siteLocalesState, 'isLoaded')
        ? <CircularProgress/>

        : isSSR
        ? <LanguageSelectInlined
            classedBounds={classedBounds}
            siteLocales={siteLocales}
            currentLanguage={currentLanguage}
            chooseLanguage={chooseLanguage}
        />
        : <LanguageSelectMaterial
            classedBounds={classedBounds}
            siteLocales={siteLocales}
            currentLanguage={currentLanguage}
            chooseLanguage={chooseLanguage}
        />}
    </SelectWrapper>,

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
    onlyUpdateForKeys(['siteLocalesState']),
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
    withStyles(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            menuItem: Object.freeze({root: g(props, 'classes', 'menuItemRoot')}),
            select: Object.freeze({select: g(props, 'classes', 'select')}),
            outlinedInput: Object.freeze({notchedOutline: g(props, 'classes', 'notchedOutline')}),
        })
    })),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            menuItemRoot: PropTypes.string,
            select: PropTypes.string,
            notchedOutline: PropTypes.string,
        }),
        classedBounds: PropTypes.exact({
            menuItem: PropTypes.object,
            select: PropTypes.object,
            outlinedInput: PropTypes.object,
        }),
        siteLocales: ImmutablePropTypes.list,
        siteLocalesState: ImmutablePropTypes.exactRecordOf({
            isLoading: PropTypes.bool,
            isLoaded: PropTypes.bool,
            isFailed: PropTypes.bool,
        }),
        currentLanguage: PropTypes.nullable(PropTypes.string),
        isSSR: PropTypes.bool,
    })
)(LanguageSelect)
