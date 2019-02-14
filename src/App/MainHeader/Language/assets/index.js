import styled from 'styled-components'

export const Item = styled.span`
    display: inline-block;
    margin: 0 10px 3px 0;
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    ${({type}) => `background-image: url('/img/flags/${type}.svg');`}
` // TODO FIXME: this icons isn't completely free
// https://www.flaticon.com/packs/flags-3

export const InlinedSelectionWrap = styled.div`
    display: block;
    width: 100%;
    margin: 10px 0;

    html.is-loading & {
        display: none;
    }
`

export const InlinedSelectionList = styled.nav`
    display: block;
    padding-top: 2px;
    padding-left: 2px;
`

export const InlinedSelectionItem = styled.a`
    display: inline-block;
    padding: 8px 6px;
    border: 2px solid
        ${({theme, isActive}) => isActive ? theme.palette.secondary.dark : theme.palette.primary.light};
    color:
        ${({theme, isActive}) =>
            isActive ? theme.palette.secondary.dark : theme.palette.primary.light};
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    vertical-align: middle;
    line-height: 24px;
    margin-top: -2px;
    margin-left: -2px;

    &>* {
        vertical-align: middle;
        margin-bottom: 0;
    }

    &:first-child {
        border-radius: 4px 0 0 4px;
    }

    &:last-child {
        border-radius: 0 4px 4px 0;
    }
`

export const SelectWrapper = styled.div`
    html.is-loading & * {
        display: none;
    }

    html.is-loading & {
        background: ${({theme}) => theme.palette.prerender.gag};
        border-radius: 4px;
        width: 110px;
        height: 40px;

        ${({theme}) => theme.media.mobile`display: none;`
    }
`
