import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {plainProvedGet as g} from '../../helpers'

export const StyledSpyLink = styled(({isSpy, ...rest}) => <Link {...rest}/>)`
    ${({theme, isSpy}) => isSpy ? 'cursor: default;' : ''}
`

export const Header = styled.header`
    display: flex;
    flex-direction: column;
`

export const Top = styled.div`
    background-color: ${({theme}) => theme.palette.primary.main};
`

export const TopInner = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    margin: 0 auto;

    ${({theme}) => theme.media.xl`width: 1400px;`}
    ${({theme}) => theme.media.lg`width: 1200px;`}
    ${({theme}) => theme.media.sm`padding: 12px 10px;`}
    ${({theme}) => theme.media.mobile`
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        padding: 10px;
    `}

    html.is-loading & {
        ${({theme}) => theme.media.xs`padding-bottom: 14px;`}
        ${({theme}) => theme.media.xxs`padding-bottom: 14px;`}
    }
`

const Wrapper = styled.div`
    width: calc(100% - 200px);
    display: flex;
    align-items: center;

    ${({theme}) => theme.media.sm`width: calc(100% - 150px);`}
`

export const SearchWrapper = styled(Wrapper)`
    justify-content: space-between;
    ${({isSSR}) => g(isSSR, []) ? 'width: calc(100% - 330px);' : ''}
    ${({theme}) => theme.media.mobile`width: 100%; min-height: 70px; flex-wrap: wrap;`}
    ${({theme, isSSR}) => !g(isSSR, []) ? null : theme.media.sm`width: 100%;`}
    ${({theme, isSSR}) => !g(isSSR, []) ? null : theme.media.mobile`
        width: 100%;
        & > * { display: block; width: 100%; text-align: center; }
    `}
    ${({theme, isSSR}) => !g(isSSR, []) ? null : theme.media.xxs`
        display: block;
        width: 100%;
        & > * { display: block; width: 100%; text-align: center; }
    `}

    html.is-loading & {
        height: 61px;
        width: calc(100% - 200px);
        ${({theme}) => theme.media.sm`width: calc(100% - 150px);`}
        & > form {
            ${({theme}) => theme.media.mobile`display: none;`}
        }
        ${({theme}) => theme.media.mobile`width: 100%; min-height: 0; & > * {margin-top: 8px;}`}
    }
`

export const NavigationWrapper = styled(Wrapper)`
    padding-left: 177px;
    display: flex;
    justify-content: space-between;

    ${({theme}) => theme.media.sm`padding-left: 0;`}
    ${({isSSR}) => !g(isSSR, []) ? null : 'padding-left: 0;'}

    html.is-loading & {
        padding-left: 177px;
        ${({theme}) => theme.media.sm`padding-left: 0;`}
        ${({theme, isSSR}) => !g(isSSR, []) ? null : theme.media.mobile`display: none;`}
    }
`

export const Logo = styled.img`
    flex-shrink: 0;
    margin-right: 20px;
    width: 179px;
    height: 50px;

    ${({theme}) => theme.media.sm`width: 135px; height: 37px;`}
    ${({theme}) => theme.media.mobile`margin: 0 10px; width: 135px; height: 37px;`}
    ${({theme, isSSR}) => !g(isSSR, []) ? null : theme.media.mobile`margin: 0;`}
`

export const BottomInner = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin: 0 auto;
    ${({isSSR}) => `flex-wrap: ${g(isSSR, []) ? 'wrap' : 'no-wrap'};`}
    ${({theme}) => theme.media.xl`width: 1400px;`}
    ${({theme}) => theme.media.lg`width: 1200px;`}

    &::after {
        position: absolute;
        z-index: -1;
        bottom: 0;
        left: -10px;
        content: '';
        height: 1px;
        width: 100%;
        background-color: ${({theme}) => theme.palette.primary.lightOpacity}
    }
`
