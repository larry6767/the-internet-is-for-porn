import React from 'react'
import {Record, List} from 'immutable'
import {compose} from 'recompose'
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

    getSuggestionValue = (change, suggestion) => {
        change('searchKey', suggestion)
    },

    renderAutosuggest = ({
        classes, i18nSearch, search, input, change,
        suggestionsFetchRequestHandler, suggestionsClearRequestHandler,
        suggestionSelectedHandler, classId,
    }) => <Autosuggest
        renderInputComponent={renderInputComponent}
        suggestions={ig(search, 'suggestions').toJS()}
        getSuggestionValue={getSuggestionValue.bind(this, change)}
        renderSuggestion={renderSuggestion}

        onSuggestionsFetchRequested={suggestionsFetchRequestHandler.bind(this, classId)}
        onSuggestionsClearRequested={suggestionsClearRequestHandler}
        onSuggestionSelected={suggestionSelectedHandler.bind(this, change)}
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
        const {handleSubmit, i18nSearch} = props

        return <SearchForm
            onSubmit={handleSubmit}
        >
            <Field
                name="classId"
                type="hidden"
                component={renderHiddenField}
            />
            <Field
                name="searchKey"
                type="text"
                props={props}
                component={renderAutosuggest}
            />
            <SearchButton
                type="submit"
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
            initialValues: { // Setting default form values. redux-form creates keys in store for this
                classId: '1', // ig(state, ['app', 'videoPage', 'gallery', 'classId']),
                searchKey: '',
            },
            search: SearchRecord(ig(state, ['app', 'mainHeader', 'search'])),
            i18nSearch: ig(state, 'app', 'locale', 'i18n', 'search'),
            classId: formValueSelector('searchForm')(state, 'classId'),
        }),
        dispatch => ({
            suggestionsFetchRequestHandler: (classId, {value, reason}) => {
                dispatch(actions.suggestionsFetchRequest({
                    classId,
                    searchKey: value,
                }))
            },
            suggestionsClearRequestHandler: () => dispatch(actions.setEmptySuggestions()),
            suggestionSelectedHandler: (change, event, {suggestion, method}) => {
                if (method === 'enter')
                    change('searchKey', suggestion)

                dispatch(actions.runSearch(suggestion))
            }
        })
    ),
    reduxForm({
        form: 'searchForm',
        enableReinitialize: true,
        onSubmit: (values, dispatch) => dispatch(actions.runSearch(ig(values, 'searchKey')))
    }),
    withStyles(muiStyles),
    setPropTypes({
        classes: PropTypes.object,
        search: ImmutablePropTypes.recordOf({
            suggestions: ImmutablePropTypes.list,
        }),
        i18nSearch: immutableI18nSearchModel,
        handleSubmit: PropTypes.func,
        change: PropTypes.func,
    })
)(Search)
