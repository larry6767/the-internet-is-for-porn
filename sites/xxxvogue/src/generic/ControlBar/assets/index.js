import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

export const ControlButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
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
