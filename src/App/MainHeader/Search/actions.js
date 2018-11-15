import {createAction} from 'redux-actions'
// TODO FIXME: Now it isn't used
const
    types = {
        SUGGESTIONS_FETCH_REQUEST: 'SEARCH@SUGGESTIONS_FETCH_REQUEST',
        SUGGESTIONS_CLEAR_REQUEST: 'SEARCH@SUGGESTIONS_CLEAR_REQUEST',
        TOGGLE_CHANGE: 'SEARCH@TOGGLE_CHANGE'
    },

    suggestionsFetchRequest = createAction(types.SUGGESTIONS_FETCH_REQUEST),
    suggestionsClearRequest = createAction(types.SUGGESTIONS_CLEAR_REQUEST),
    toggleChange = createAction(types.TOGGLE_CHANGE)

export {
    suggestionsFetchRequest,
    suggestionsClearRequest,
    toggleChange,
    types
}
