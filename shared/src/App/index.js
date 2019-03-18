import {throttle} from 'lodash'
import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers} from 'recompose'
import {MuiThemeProvider} from '@material-ui/core/styles'
import {ThemeProvider as SCThemeProvider} from 'styled-components'
import {Normalize} from 'styled-normalize'

// local libs
import {PropTypes, getRouterContext, setPropTypes, plainProvedGet as g} from 'src/App/helpers'
import {routerContextModel} from 'src/App/models'
import MainHeader from 'src/App/MainHeader'
import MainFooter from 'src/App/MainFooter'
import ReportDialog from 'src/App/ReportDialog'
import actions from 'src/App/actions'
import theme from 'src/App/assets/theme'
import muiTheme from 'src/App/assets/muiTheme'
import GlobalStyle from 'src/App/assets/style'

export const App = ({sheetsManager, routerContext, children}) => <MuiThemeProvider
    theme={muiTheme}
    sheetsManager={sheetsManager}
>
    <SCThemeProvider theme={theme}>
        <Fragment>
            <Normalize/>
            <GlobalStyle/>

            <div className='App'>
                <MainHeader/>
                {children ? children({routerContext}) : null}
                <MainFooter/>
                <ReportDialog/>
            </div>
        </Fragment>
    </SCThemeProvider>
</MuiThemeProvider>

const
    resizeListenerKey = 'resizeListener'

export default compose(
    connect(
        state => ({
            routerContext: getRouterContext(state),
        }),
        {
            resize: g(actions, 'resize'),
            getFavoriteVideoList: g(actions, 'getFavoriteVideoList'),
            getFavoritePornstarList: g(actions, 'getFavoritePornstarList'),
        }
    ),

    withHandlers({
        resizeHandler: props => () => props.resize({
            width: g(document, 'documentElement', 'clientWidth'),
            height: g(document, 'documentElement', 'clientHeight'),
        }),
    }),

    lifecycle({
        componentDidMount() {
            this[resizeListenerKey] = throttle(g(this, 'props', 'resizeHandler'), 200)
            window.addEventListener('resize', g(this, resizeListenerKey))
            this.props.resizeHandler()

            this.props.getFavoriteVideoList()
            this.props.getFavoritePornstarList()
        },

        componentWillUnmount() {
            window.removeEventListener('resize', g(this, resizeListenerKey))
        },
    }),

    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        routerContext: routerContextModel,

        // In bare usage of <App> in SSR these are not passed (that's why they're optional).
        resizeHandler: PropTypes.func.isOptional,
        getFavoriteVideoList: PropTypes.func.isOptional,
        getFavoritePornstarList: PropTypes.func.isOptional,
    })
)(App)
