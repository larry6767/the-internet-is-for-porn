import React from 'react'
import Autosuggest from 'react-autosuggest'
import {Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import css from './assets/_.module.scss'
import {renderInputComponent, renderSuggestion, getSuggestionValue} from './helpers'

import {compose} from 'recompose'
import {connect} from 'react-redux'
import {toggleChange, suggestionsFetchRequest, suggestionsClearRequest} from './actions'

const
    styles = theme => ({
        root: {
            height: 250,
            flexGrow: 1,
        },
        container: {
            position: 'relative',
        },
        suggestionsContainerOpen: {
            position: 'absolute',
            zIndex: 1,
            marginTop: theme.spacing.unit,
            left: 0,
            right: 0,
        },
        suggestion: {
            display: 'block',
        },
        suggestionsList: {
            margin: 0,
            padding: 0,
            listStyleType: 'none',
        },
        divider: {
            height: theme.spacing.unit * 2,
        },
    }),

    Search = ({classes, input, toggleChangeAction, suggestionsFetchRequestAction, suggestionsClearRequestAction}) => {
        const autosuggestProps = {
            renderInputComponent,
            suggestions: input.get('suggestions') instanceof Array ? input.get('suggestions') : [], // because fromJS({suggestions: []})
            onSuggestionsFetchRequested: suggestionsFetchRequestAction,
            onSuggestionsClearRequested: suggestionsClearRequestAction,
            getSuggestionValue,
            renderSuggestion,
        }

        return <div className={css.search}>
            <input className={css.searchInput} placeholder={`Search 65,123,242 videos...`}/>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    placeholder: 'Search 65,123,242 videos... (start with a)',
                    value: input.get('currentValue') ? input.get('currentValue') : '',
                    onChange: toggleChangeAction,
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
            <button className={css.searchButton}></button>
        </div>
    }
    
export default compose(
    connect(
        state => ({
            input: state.getIn(['app', 'mainHeader', 'search', 'input'])
        }),
        dispatch => ({
            toggleChangeAction: event => dispatch(toggleChange(event.target.value)),
            suggestionsFetchRequestAction: payload => dispatch(suggestionsFetchRequest(payload)),
            suggestionsClearRequestAction: payload => dispatch(suggestionsClearRequest(payload))
        })
    ),
    withStyles(styles)
)(Search)
