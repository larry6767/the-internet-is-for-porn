import {createAction} from 'redux-actions'

const
	types = {
		GET_INITIAL_DATA : 'ALL_NICHES@GET_INITIAL_DATA'
	},

	getInititalData = createAction(types.GET_INITIAL_DATA)

export {
	getInititalData,
	types
}
