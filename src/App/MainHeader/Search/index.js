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

    Search = props => <SearchForm
        action={routerGetters.findVideos.link(g(props, 'routerContext'))} // for SSR
    >
        <Field
            name={g(props, 'localizedKey')}
            type="text"
            props={props}
            component={renderAutosuggest}
        />
        <SearchButton
            type="submit"
            onClick={g(props, 'onSubmitHandler')}
            title={ig(g(props, 'i18nSearch'), 'buttonTitle')}
        />
    </SearchForm>,

    SearchRecord = Record({
        suggestions: List(),
    })


export default compose(
    connect(
        state => ({
            search: SearchRecord(ig(state, ['app', 'mainHeader', 'search'])),
            i18nSearch: ig(state, 'app', 'locale', 'i18n', 'search'),
            routerContext: getRouterContext(state),
            searchQuery: formValueSelector('searchForm')(
                state,
                ig(getRouterContext(state), 'router', 'searchQuery', 'qsKey')
            ) || null,
            localizedKey: ig(getRouterContext(state), 'router', 'searchQuery', 'qsKey'),
            initialValues: {
                [ig(getRouterContext(state), 'router', 'searchQuery', 'qsKey')]: get( // for SSR
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

        search: ImmutablePropTypes.exactRecordOf({
            suggestions: ImmutablePropTypes.list,
        }),

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
