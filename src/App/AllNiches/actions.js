import {createAction} from 'redux-actions'

const
	types = {
		LOAD_PAGE_REQUEST: 'ALL_NICHES@LOAD_PAGE_REQUEST',
		LOAD_PAGE_SUCCESS: 'ALL_NICHES@LOAD_PAGE_SUCCESS',
		LOAD_PAGE_FAILURE: 'ALL_NICHES@LOAD_PAGE_FAILURE',
	},

	loadPageRequest = createAction(types.LOAD_PAGE_REQUEST),
	loadPageSuccess = createAction(types.LOAD_PAGE_SUCCESS),
	loadPageFailure = createAction(types.LOAD_PAGE_FAILURE)

export {
	loadPageRequest,
	loadPageSuccess,
	loadPageFailure,
}
