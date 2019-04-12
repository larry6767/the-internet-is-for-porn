import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const SortWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 40px;
    margin-bottom: 12px;

    ${({theme}) => theme.media.md`margin-left: 20px;`};
    ${({theme}) => theme.media.sm`margin-left: 20px;`};
    ${({theme}) => theme.media.mobile`margin-bottom: 8px;`};

    html.is-loading & * {
        display: none;
    }

    html.is-loading & {
        background: ${({theme}) => theme.palette.prerender.plug};
        border-radius: 4px;
        width: 145.5px;
        height: 37px;
    }
`
export const InlinedSelectionWrap = styled.div`
    display: block;
    margin: 10px 0;
`

export const InlinedSelectionList = styled.nav`
    display: flex;
    width: 100%;
    justify-content: center;
`

export const InlinedSelectionItem = styled(({isActive, ...rest}) => <Link {...rest}/>)`
    display: inline-block;
    padding: 5px;
    color: ${({theme, isActive}) => isActive ? theme.palette.primary.contrastText :
        theme.palette.primary.main};
    background: ${({theme, isActive}) => isActive ? theme.palette.primary.main : 'transparent'};
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    vertical-align: middle;
    line-height: 24px;
    border-radius: 4px;
    margin-right: 2px;
    font-size: 14px;

    ${({theme}) => theme.media.md`font-size: 12px;`};
    ${({theme}) => theme.media.sm`font-size: 12px;`};
    ${({theme}) => theme.media.mobile`font-size: 12px;`};

    &>* {
        vertical-align: middle;
        margin-bottom: 0;
    }

    &:hover {
        ${({theme, isActive}) => isActive
            ? `cursor: default; background: ${theme.palette.primary.main}`
            : theme.palette.primary.extraLight};
    }
`
