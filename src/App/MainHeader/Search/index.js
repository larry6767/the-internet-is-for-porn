import React from 'react'
import {compose, setPropTypes} from 'recompose'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form/immutable'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import {TextField, Paper, MenuItem} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

import {
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
} from '../../helpers'

import {immutableI18nSearchModel} from '../../models'
import {
    SearchForm,
    SearchButton
} from './assets'
import {muiStyles} from './assets/muiStyles'
import actions from './actions'

const
    renderHiddenField = ({
        input,
        type,
    }) => <input {...input} type={type}/>,

    renderInputComponent = ({classes, i18nSearch, ...input}) => <TextField
        fullWidth
        placeholder={ig(i18nSearch, 'inputPlaceholder')}
        InputProps={{
            classes: {
                input: g(classes, 'input'),
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

    getSuggestionValue = (change, suggestion) => {
        change('t', suggestion)
    },

    renderAutosuggest = ({classes, i18nSearch, search, input, change}) => <Autosuggest
        renderInputComponent={renderInputComponent}
        suggestions={ig(search, 'suggestions').toJS()}
        getSuggestionValue={getSuggestionValue.bind(this, change)}
        renderSuggestion={renderSuggestion}

        onSuggestionsFetchRequested={() => {}} // these params are required,
        onSuggestionsClearRequested={() => {}} // but with redux-form are useless
        inputProps={{
            classes,
            value: input.value, // these params are required,
            onChange: () => {}, // but with redux-form are useless
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
        onSubmit={props.handleSubmit}
    >
        <Field
            name="c"
            type="hidden"
            component={renderHiddenField}
        />
        <Field
            name="t"
            type="text"
            props={props}
            component={renderAutosuggest}
        />
        <SearchButton
            type="submit"
        />
    </SearchForm>


export default compose(
    connect(
        state => ({
            initialValues: { // Setting default form values. redux-form creates keys in store for this
                c: '1', // ig(state, ['app', 'videoPage', 'gallery', 'classId']),
                t: '',
            },
            search: ig(state, ['app', 'mainHeader', 'search']),
            i18nSearch: ig(state, 'app', 'locale', 'i18n', 'search'),
        }),
        dispatch => ({
            suggestionsFetchRequestHandler: () => dispatch(actions.suggestionsFetchRequest()),
            selectSuggestion: () => dispatch(actions.suggestionsFetchRequest()),
        })
    ),
    reduxForm({
        form: 'searchForm',
        enableReinitialize: true,
        onChange: (values, dispatch) => {
            if (ig(values, 't') === '') {
                dispatch(actions.setEmptySuggestions())
                return
            }
            dispatch(actions.suggestionsFetchRequest(values))
        },
        onSubmit: (values, dispatch) => dispatch(actions.runSearch(values))
    }),
    withStyles(muiStyles),
    setPropTypes({
        classes: PropTypes.object,
        i18nSearch: immutableI18nSearchModel,
    })
)(Search)
