import React from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form/immutable'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

import {TextField, Paper, MenuItem} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

import {immutableProvedGet as ig} from '../../helpers'
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

    renderInputComponent = ({classes, ...input}) => <TextField
        fullWidth
        placeholder="Search 65,123,242 videos..."
        InputProps={{
            classes: {
                input: classes.input,
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

    renderAutosuggest = ({classes, search, input, change}) => <Autosuggest
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
            ...input,
        }}

        theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
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
    withStyles(muiStyles)
)(Search)
