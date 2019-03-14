import {combineReducers} from 'redux-immutable'
import {reducer as formReducer} from 'redux-form/immutable'

// local libs
import appReducer from 'src/App/reducers'
import genericReducer from 'src/generic/reducers'

export default patch => combineReducers(patch({
    app: appReducer,
    generic: genericReducer,
    form: formReducer,
}))
