import {throttle, some} from 'lodash'
import {connect} from 'react-redux'
import {compose, withPropsOnChange, lifecycle, withState, withHandlers} from 'recompose'
import g from './plain/provedGet'
import ig from './immutable/provedGet'

const
    isVisibleOnScreen = wh => x => {
        const
            t = g(x, 'top'),
            b = g(x, 'bottom')

        return (t >= 0 && t < wh) || (t < 0 && b > 0)
    },

    scrollListenerKey = 'scrollListener'

export default compose(
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            currentHeight: ig(state, 'app', 'ui', 'currentHeight'),
        })
    ),
    withState('wasVisible', 'setWasVisible', props => g(props, 'isSSR') ? true : false),
    withState('wrapperRef', 'setRef', null),
    withState('scrollTop', 'setScrollTop', 0),
    withHandlers({
        scrollListenerHandler: props => () => {
            props.setScrollTop(g(document, 'documentElement', 'scrollTop'))
        },
    }),
    lifecycle({
        componentDidMount() {
            this[scrollListenerKey] = throttle(g(this, 'props', 'scrollListenerHandler'), 500)
            window.addEventListener('scroll', g(this, scrollListenerKey))
            this.props.scrollListenerHandler()
        },
        componentWillUnmount() {
            window.removeEventListener('scroll', g(this, scrollListenerKey))
        },

        componentWillReceiveProps(nextProps) {
            if (g(nextProps, 'wasVisible') || (
                g(this, 'props', 'currentHeight') === g(nextProps, 'currentHeight') &&
                g(this, 'props', 'wrapperRef') === g(nextProps, 'wrapperRef') &&
                g(this, 'props', 'scrollTop') === g(nextProps, 'scrollTop')
            ))
                return

            const
                currentHeight = g(nextProps, 'currentHeight'),
                ref = g(nextProps, 'wrapperRef')

            if (ref !== null && some(ref.getClientRects(), isVisibleOnScreen(currentHeight)))
                nextProps.setWasVisible(true)
        }
    }),
    withPropsOnChange(['x', 'wasVisible'], props => {
        if ( ! g(props, 'wasVisible'))
            return {previewStyle: null}

        return {
            previewStyle: Object.freeze({
                backgroundImage: `url(${ig(props.x, 'thumb')})`,
            }),
        }
    }),
)
