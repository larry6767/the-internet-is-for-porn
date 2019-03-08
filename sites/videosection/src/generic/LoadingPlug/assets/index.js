import styled from 'styled-components'

export const VideoList = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 1;
    padding: 0;
    margin: 0;
`

export const PageTitlePlug = styled.div`
    width: 100%;
    height: 39px;
    margin-bottom: 12px;
    background: ${({theme}) => theme.palette.prerender.plug};

    ${({theme}) => theme.media.sm`height: 28px; margin-bottom: 8.5px;`};
    ${({theme}) => theme.media.mobile`height: 23px; margin-bottom: 7px;`};
`
