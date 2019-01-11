import React from 'react'
import {deburr} from 'lodash'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

import {TextField, Paper, MenuItem, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {
    Search,
    SearchButton
} from './assets'
import {muiStyles} from './assets/muiStyles'
import actions from './actions'

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
]

function renderInputComponent(inputProps) {
    const {classes, inputRef = () => {}, ref, ...other} = inputProps

    return <TextField
        fullWidth
        InputProps={{
            inputRef: node => {
                ref(node)
                inputRef(node)
            },
            classes: {
                input: classes.input,
            },
            disableUnderline: true
        }}
        {...other}
    />
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion.label, query)
    const parts = parse(suggestion.label, matches)

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
}

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length
    let count = 0

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const
                keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue

            if (keep) {
                count += 1
            }

            return keep
        })
}

function getSuggestionValue(suggestion) {
    return suggestion.label
}

class IntegrationAutosuggest extends React.Component {
    state = {
        single: '',
        popper: '',
        suggestions: [],
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value),
        })
    }

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        })
    }

    handleChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue,
        })
    }

    render() {
        const {classes, suggestionsFetchRequestHandler} = this.props

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
        }

        return <Search>
            <Autosuggest
            {...autosuggestProps}
            inputProps={{
                classes,
                placeholder: 'Search 65,123,242 videos... (start with a)',
                value: this.state.single,
                onChange: this.handleChange('single'),
            }}
            theme={{
                container: classes.container,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
                suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
                <Paper {...options.containerProps} square>
                {options.children}
                </Paper>
            )}
            />
            <SearchButton/>
            <Button variant="outlined" color="secondary" onClick={suggestionsFetchRequestHandler}>
                get suggestions
            </Button>
        </Search>
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default compose(
    connect(
        state => ({
            input: state.getIn(['app', 'mainHeader', 'search', 'input'])
        }),
        dispatch => ({
            suggestionsFetchRequestHandler: () => dispatch(actions.suggestionsFetchRequest({
                c: '1',
                t: 'as',
            })),
        })
    ),
    withStyles(muiStyles)
)(IntegrationAutosuggest)
