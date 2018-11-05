import {createAction} from 'redux-actions'

const
	types = {
		TOGGLE_LANGUAGE: 'LANGUAGE@TOGGLE_LANGUAGE'
    },
    
	toggleLanguage = createAction(types.TOGGLE_LANGUAGE)

export {
	toggleLanguage,
	types
}
