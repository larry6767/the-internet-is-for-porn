import React from 'react'
import {render} from 'react-dom'
import Root from './root'
import store from './store'
import saga from './sagas'

store.runSaga(saga)

render(<Root />, document.getElementById('root'))
