import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 240px;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;

    &:nth-child(4n) {
        margin-right: 0;
    }
`

export const VideoPreview = styled.div`
    display: flex;
    align-items: flex-end;
    height: 180px;
    width: 100%;
    border: 1px solid #000;
    border-radius: 1px;
    overflow: hidden;

    ${'' /* &:hover .VideoPreviewBar {
        transform: translateY(0px);
    } */}
`

export const VideoPreviewBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 31px;
    transform: translateY(31px);
    transition: transform 0.2s;
`

export const InfoBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 3px;
`

export const InfoBlockInner = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Like = styled.div`
    display: flex;
    margin-left: 5px;
`

export const Duration = styled.div`
    display: flex;
    padding: 5px;
    background-color: ${({theme}) => theme.colors.mainColor2};
    border-radius: 1px;
`
