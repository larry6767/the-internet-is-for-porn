import {createAction} from 'redux-actions'

const
	types = {
		TOGGLE_NICHE: 'NICHE@TOGGLE_NICHE'
    },
    
	toggleNiche = createAction(types.TOGGLE_NICHE)

export {
	toggleNiche,
	types
}
