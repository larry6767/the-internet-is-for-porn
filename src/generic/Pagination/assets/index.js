import styled from 'styled-components'

export const ButtonsListWrapper = styled.div`
    display: flex;
    margin-right: 15px;
    margin-bottom: 12px;

    ${({theme}) => theme.media.mobile`
        width: 100%;
        margin-right: 0;
        margin-bottom: 0;
    `}
`

export const ButtonsList = styled.div`
    display: flex;

    ${({theme}) => theme.media.mobile`
        overflow-x: scroll;
        margin-right: 8px;
        margin-bottom: 8px;
    `}
`

export const PaginationPlug = styled.div`
    width: 100%;
    max-width: 405px;
    height: 36px;
    margin-right: 15px;
    margin-bottom: 12px;
    background: ${({theme}) => theme.palette.prerender.plug}
`
