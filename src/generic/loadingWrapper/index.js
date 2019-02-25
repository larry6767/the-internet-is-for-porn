import React from 'react'
import {compose, branch, renderNothing} from 'recompose'
import {immutableProvedGet as ig} from '../../App/helpers'
import ErrorContent from '../../generic/ErrorContent'
import {Page, Content} from '../assets'
import LoadingPlug from '../LoadingPlug'

const
    // HOC helper to avoid any errors when neither page isn't loaded
    // nor page loading not initiated yet.
    voidPagePlug = branch(
        props => !(
            ig(props.data, 'isLoading') ||
            ig(props.data, 'isLoaded') ||
            ig(props.data, 'isFailed')
        ),
        renderNothing
    ),

    renderLoading = (plugOptions, WrappedComponent, props) => ig(props.data, 'isFailed')
        ? <ErrorContent/>
        : ig(props.data, 'isLoading')
        ? <LoadingPlug {...plugOptions}/>
        : <Content>
            <WrappedComponent {...props}/>
        </Content>,

    loadingWrapper = plugOptions => WrappedComponent => props => <Page>
        {renderLoading(plugOptions, WrappedComponent, props)}
    </Page>

export default (plugOptions = {}) => compose(
    voidPagePlug,
    loadingWrapper(plugOptions),
)
