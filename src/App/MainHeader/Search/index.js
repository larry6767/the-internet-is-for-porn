import React, {Component} from 'react'
import queryString from 'query-string'
import {get, throttle} from 'lodash'
import {compose, withHandlers, withPropsOnChange} from 'recompose'
import {connect} from 'react-redux'
import {reduxForm, Field, formValueSelector} from 'redux-form/immutable'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import {TextField, Paper, MenuItem} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

import {
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
    setPropTypes,
    getRouterContext,
} from '../../helpers'

import {immutableI18nSearchModel, routerContextModel} from '../../models'
import {routerGetters} from '../../../router-builder'
import {SearchForm, SearchButton} from './assets'
import {muiStyles} from './assets/muiStyles'
import actions from './actions'

const
    renderInputComponent = ({classes, ref, i18nSearch, ...input}) => <TextField
        fullWidth
        placeholder={ig(i18nSearch, 'inputPlaceholder')}
        InputProps={{
            classes: {
                input: g(classes, 'input'),
            },
            inputRef: node => {
                ref(node)
            },
            ...input,
            disableUnderline: true,
        }}
    />,

    renderSuggestionsContainer = options => <Paper
        {...options.containerProps}
        square
    >
        {options.children}
    </Paper>,

    suggestionStyle = Object.freeze({fontWeight: 300}),
    hlSuggestionStyle = Object.freeze({fontWeight: 500}),

    renderSuggestion = (suggestion, {query, isHighlighted}) => {
        const
            matches = match(suggestion, query),
            parts = parse(suggestion, matches)

        return <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, i) =>
                    g(part, 'highlight')
                    ? <span key={String(i)} style={hlSuggestionStyle}>{g(part, 'text')}</span>
                    : <strong key={String(i)} style={suggestionStyle}>{g(part, 'text')}</strong>
                )}
            </div>
        </MenuItem>
    },

    RenderAutosuggest = compose(
        setPropTypes(process.env.NODE_ENV === 'production' ? null : {
            classes: PropTypes.shape({
                container: PropTypes.string,
                suggestionsContainerOpen: PropTypes.string,
                suggestionsList: PropTypes.string,
                suggestion: PropTypes.string,
            }),

            searchSuggestions: PropTypes.arrayOf(PropTypes.string),
            i18nSearch: immutableI18nSearchModel,
            input: PropTypes.object, // input props

            loadSuggestions: PropTypes.func,
            clearSuggestions: PropTypes.func,
            getSuggestionValue: PropTypes.func,
            onSubmitHandler: PropTypes.func,
        })
    )(({
        classes, i18nSearch, searchSuggestions, input,
        loadSuggestions, clearSuggestions, getSuggestionValue, onSubmitHandler,
    }) => <Autosuggest
        renderInputComponent={renderInputComponent}
        suggestions={searchSuggestions}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}

        onSuggestionsFetchRequested={loadSuggestions}
        onSuggestionsClearRequested={clearSuggestions}
        onSuggestionSelected={onSubmitHandler}

        inputProps={{
            classes,
            i18nSearch,
            ...input,
        }}

        theme={{
            container: g(classes, 'container'),
            suggestionsContainerOpen: g(classes, 'suggestionsContainerOpen'),
            suggestionsList: g(classes, 'suggestionsList'),
            suggestion: g(classes, 'suggestion'),
        }}

        renderSuggestionsContainer={renderSuggestionsContainer}
    />)

class Search extends Component {
    shouldComponentUpdate(nextProps) {
        const
            prevProps = g(this, 'props')

        return !(
            g(prevProps, 'searchSuggestions') === g(nextProps, 'searchSuggestions')
        )
    }

    render() {
        const
            props = g(this, 'props')

        return <SearchForm
            action={routerGetters.findVideos.link(g(props, 'routerContext'))} // for SSR
        >
            <Field
                name={g(props, 'localizedKey')}
                type="text"
                props={props}
                component={RenderAutosuggest}
            />
            <SearchButton
                type="submit"
                onClick={g(props, 'onSubmitHandler')}
                title={ig(g(props, 'i18nSearch'), 'buttonTitle')}
            />
        </SearchForm>
    }
}

export default compose(
    connect(
        state => {
            const
                routerContext = getRouterContext(state),
                searchQueryQsKey = ig(routerContext, 'router', 'searchQuery', 'qsKey')

            return {
                routerContext,
                localizedKey: searchQueryQsKey,
                searchSuggestions: ig(state, ['app', 'mainHeader', 'search', 'suggestions']),
                i18nSearch: ig(state, 'app', 'locale', 'i18n', 'search'),
                searchQuery: formValueSelector('searchForm')(state, searchQueryQsKey) || null,
            }
        },
        {
            runSearch: g(actions, 'runSearch'),
            setEmptySuggestions: g(actions, 'setEmptySuggestions'),
            suggestionsFetchRequest: g(actions, 'suggestionsFetchRequest'),
        }
    ),
    withPropsOnChange([], props => {
        const
            searchQueryQsKey = g(props, 'localizedKey'),
            qs = queryString.parse(ig(props.routerContext, 'location', 'search'))

        return {
            initialValues: {
                [searchQueryQsKey]: get(qs, [searchQueryQsKey], null), // for SSR
            },

            suggestionsFetchRequest: throttle(props.suggestionsFetchRequest, 500),
        }
    }),
    reduxForm({
        form: 'searchForm',
        enableReinitialize: true,
    }),
    withPropsOnChange(['searchSuggestions'], props => ({
        searchSuggestions: Object.freeze(g(props, 'searchSuggestions').toJS()),
    })),
    withHandlers({
        loadSuggestions: props => ({value, reason}) => {
            props.suggestionsFetchRequest({searchQuery: value})
        },

        clearSuggestions: props => () => props.setEmptySuggestions(),

        getSuggestionValue: props => suggestion => {
            props.change(g(props, 'localizedKey'), suggestion)
        },

        // parameters are needed for the case when the handler below
        // is called upon the event 'onSuggestionSelected'
        onSubmitHandler: props => (event, parameters) => {
            event.preventDefault()

            let
                query = parameters
                    ? g(parameters, 'suggestion')
                    : g(props, 'searchQuery')

            query = query ? query.replace(/ /g, '+') : ''

            if (parameters && parameters.method === 'enter')
                props.change(g(props, 'localizedKey'), query)

            props.runSearch({
                path: routerGetters.findVideos.link(
                    g(props, 'routerContext'),
                    {searchQuery: query},
                    ['ordering', 'searchQuery'],
                )
            })
        },
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.shape({
            input: PropTypes.string,
            container: PropTypes.string,
            suggestionsContainerOpen: PropTypes.string,
            suggestionsList: PropTypes.string,
            suggestion: PropTypes.string,
        }),

        searchSuggestions: PropTypes.arrayOf(PropTypes.string),
        i18nSearch: immutableI18nSearchModel,
        routerContext: routerContextModel,
        searchQuery: PropTypes.nullable(PropTypes.string),
        localizedKey: PropTypes.string,
        initialValues: PropTypes.object,
        change: PropTypes.func,

        runSearch: PropTypes.func,
        setEmptySuggestions: PropTypes.func,
        suggestionsFetchRequest: PropTypes.func,

        loadSuggestions: PropTypes.func,
        clearSuggestions: PropTypes.func,
        getSuggestionValue: PropTypes.func,
        onSubmitHandler: PropTypes.func,
    })
)(Search)
