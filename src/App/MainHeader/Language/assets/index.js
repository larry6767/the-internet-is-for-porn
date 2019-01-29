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
`

export const InlinedSelectionList = styled.nav`
    display: flex;
    justify-content: center;
    padding: 1px 0 0.5px;
`

export const InlinedSelectionItem = styled.a`
    display: inline-block;
    padding: 10px 2px;
    border: 1px solid
        ${({theme, isActive}) => isActive ? theme.palette.secondary.dark : theme.palette.primary.light};
    color:
        ${({theme, isActive}) =>
            isActive ? theme.palette.secondary.dark : theme.palette.primary.light};
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    vertical-align: middle;
    line-height: 24px;

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

    &:not(:last-child) {
        border-right: none;
    }
`
