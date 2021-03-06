import {throttle, some, sample} from 'lodash'
import {connect} from 'react-redux'
import {compose, withPropsOnChange, lifecycle, withState, withHandlers} from 'recompose'

// local libs
import g from 'src/App/helpers/plain/provedGet'
import ig from 'src/App/helpers/immutable/provedGet'

import {plugColors} from 'src/App/assets/fixtures'

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
            const
                scrollTop = window.pageYOffset || g(document, 'documentElement', 'scrollTop')

            props.setScrollTop(scrollTop)
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

        const
            previewStyle = process.env.NODE_ENV === 'production'
                ? {backgroundImage: `url(${ig(props.x, 'thumb')})`}
                : {backgroundColor: sample(plugColors)}

        return {
            previewStyle: Object.freeze(previewStyle),
        }
    }),
)
