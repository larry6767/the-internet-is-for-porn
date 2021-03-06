import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    ${({isDownBelow}) => isDownBelow ? `margin-top: 20px;` : ''};
    ${({theme, isDownBelow}) => theme.media.mobile`${isDownBelow ? 'margin-top: 10px;' : ''}`};
`

export const ControlButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const SortWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;

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

export const InlinedSelectionItem = styled.a`
    display: inline-block;
    padding: 10px 10px;
    border: 2px solid
        ${({theme, isActive}) => isActive ? theme.palette.primary.main : theme.palette.primary.dark};
    color:
        ${({theme, isActive}) =>
            isActive ? theme.palette.primary.main : theme.palette.primary.light};
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

// styles for plug

export const ShowedElementsPlug = styled.div`
    width: 150px;
    height: 20px;
    margin: 2px 0 6px;
    background: ${({theme}) => theme.palette.prerender.plug};

    ${({theme}) => theme.media.mobile`height: 18px;`};
`

export const SortPlug = styled.div`
    width: 160px;
    height: 36px;
    background: ${({theme}) => theme.palette.prerender.plug};

    ${({theme}) => theme.media.mobile`height: 30px; margin-bottom: 8px;`};
`
