import {branch, renderNothing} from 'recompose'

import ig from './immutable/provedGet'

// HOC helper to avoid any errors when neither page isn't loaded nor page loading not initiated yet.
export default branch(
    props => !(
        ig(props.data, 'isLoading') ||
        ig(props.data, 'isLoaded') ||
        ig(props.data, 'isFailed')
    ),
    renderNothing
)
