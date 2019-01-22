import React from 'react'
import queryString from 'query-string'
import {get} from 'lodash'
import {Record, List} from 'immutable'
import {compose, withHandlers} from 'recompose'
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
    ImmutablePropTypes,
    setPropTypes,
    getRouterContext,
} from '../../helpers'

import {
    immutableI18nSearchModel,
    routerContextModel,
} from '../../models'
import {
    SearchForm,
    SearchButton
} from './assets'
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

    renderSuggestion = (suggestion, {query, isHighlighted}) => {
        const matches = match(suggestion, query)
        const parts = parse(suggestion, matches)

        return <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{fontWeight: 500}}>
                            {part.text}
                        </span>
                    ) : (
                        <strong key={String(index)} style={{fontWeight: 300}}>
                            {part.text}
                        </strong>
                    )
                })}
            </div>
        </MenuItem>
    },

    renderAutosuggest = ({
        classes, i18nSearch, search, input,
        loadSuggestions, clearSuggestions,
        onSubmitHandler, getSuggestionValue,
    }) => <Autosuggest
        renderInputComponent={renderInputComponent}
        suggestions={ig(search, 'suggestions').toJS()}
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

        renderSuggestionsContainer={options =>
            <Paper {...options.containerProps} square>
                {options.children}
            </Paper>
        }
    />,

    Search = props => {
        const {onSubmitHandler, i18nSearch} = props

        return <SearchForm>
            <Field
                name="searchQuery"
                type="text"
                props={props}
                component={renderAutosuggest}
            />
            <SearchButton
                type="submit"
                onClick={onSubmitHandler}
                title={ig(i18nSearch, 'buttonTitle')}
            />
        </SearchForm>
    },

    SearchRecord = Record({
        suggestions: List(),
    })


export default compose(
    connect(
        state => ({
            search: SearchRecord(ig(state, ['app', 'mainHeader', 'search'])),
            i18nSearch: ig(state, 'app', 'locale', 'i18n', 'search'),
            searchQuery: formValueSelector('searchForm')(state, 'searchQuery') || null,
            routerContext: getRouterContext(state),
            currentOrientation: ig(state, 'app', 'mainHeader', 'niche', 'currentOrientation'),
            initialValues: {
                searchQuery: get(
                    queryString.parse(ig(state, 'router', 'location', 'search')),
                    [ig(getRouterContext(state), 'router', 'searchQuery', 'qsKey')],
                    null
                ),
            },
        }),
        {
            runSearch: g(actions, 'runSearch'),
            setEmptySuggestions: g(actions, 'setEmptySuggestions'),
            suggestionsFetchRequest: g(actions, 'suggestionsFetchRequest'),
        }
    ),
    reduxForm({
        form: 'searchForm',
        enableReinitialize: true,
    }),
    withHandlers({
        loadSuggestions: props => ({value, reason}) => {
            props.suggestionsFetchRequest({
                searchQuery: encodeURIComponent(value),
            })
        },

        clearSuggestions: props => () => props.setEmptySuggestions(),

        getSuggestionValue: props => (suggestion) => {
            props.change('searchQuery', suggestion)
        },
        // parameters are needed for the case when the handler below
        // is called upon the event 'onSuggestionSelected'
        onSubmitHandler: props => (event, parameters) => {
            event.preventDefault()

            const
                routerContext = g(props, 'routerContext'),
                currentOrientation = g(props, 'currentOrientation'),
                orientation = ig(routerContext, 'router', 'orientation', currentOrientation),
                localizedPath = ig(
                    g(props, 'routerContext'),
                    ['router', 'routes', 'findVideos', 'section']
                ),
                localizedKey = ig(g(props, 'routerContext'), 'router', 'searchQuery', 'qsKey'),
                query = parameters
                    ? g(parameters, 'suggestion')
                    : g(props, 'searchQuery')

            if (parameters && parameters.method === 'enter')
                props.change('searchQuery', query)

            props.runSearch({
                path: `${orientation}/${localizedPath}?${localizedKey}=${query.replace(/ /g, '+')}`
            })
        }
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.object,
        search: ImmutablePropTypes.recordOf({
            suggestions: ImmutablePropTypes.list,
        }),
        i18nSearch: immutableI18nSearchModel,
        searchQuery: PropTypes.nullable(PropTypes.string),
        routerContext: routerContextModel,
        handleSubmit: PropTypes.func,
        change: PropTypes.func,
        currentOrientation: PropTypes.string,
        initialValues: PropTypes.object,

        runSearch: PropTypes.func,
        setEmptySuggestions: PropTypes.func,
        suggestionsFetchRequest: PropTypes.func,

        loadSuggestions: PropTypes.func,
        clearSuggestions: PropTypes.func,
        getSuggestionValue: PropTypes.func,
        onSubmitHandler: PropTypes.func,
    })
)(Search)
