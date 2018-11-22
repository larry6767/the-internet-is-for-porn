import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
`

export const ButtonsList = styled.div`
    display: flex;
`

export const SortWrapper = styled.div`
    display: flex;
    align-items: center;
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

export const InlinedSelectionItem = styled.a`
    display: inline-block;
    padding: 10px 10px;
    border: 2px solid
        ${({theme, isActive}) => isActive ? theme.colors.mainColor : theme.colors.mainColor3};
    color:
        ${({theme, isActive}) =>
            isActive ? theme.colors.mainColor : theme.colors.additionalColor};
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
        border-right: none;
    }

    &:last-child {
        border-radius: 0 4px 4px 0;
        border-left: none;
    }
`
