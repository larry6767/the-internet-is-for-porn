import React from 'react'
import {compose, branch, renderNothing} from 'recompose'
import {immutableProvedGet as ig} from '../../App/helpers'
import ErrorContent from '../../generic/ErrorContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import {Page, AllNichesPage, Content} from '../assets'

const
    // HOC helper to avoid any errors when neither page isn't loaded
    // nor page loading not initiated yet.
    voidPagePug = branch(
        props => !(
            ig(props.data, 'isLoading') ||
            ig(props.data, 'isLoaded') ||
            ig(props.data, 'isFailed')
        ),
        renderNothing
    ),

    renderLoading = (WrappedComponent, props) => ig(props.data, 'isFailed')
        ? <ErrorContent/>
        : ig(props.data, 'isLoading')
        ? <CircularProgress/>
        : <Content>
            <WrappedComponent {...props}/>
        </Content>,

    allNichesWrapper = WrappedComponent => props => <AllNichesPage>
        {renderLoading(WrappedComponent, props)}
    </AllNichesPage>,

    loadingWrapper = WrappedComponent => props => <Page>
        {renderLoading(WrappedComponent, props)}
    </Page>

export default compose(
    voidPagePug,
    loadingWrapper,
)

export const allNichesLoadingWrapper = compose(
    voidPagePug,
    allNichesWrapper
)
