import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: calc((100% - 15px) / 4);
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    flex-grow: 1;

    ${({theme}) => theme.media.sm`width: calc((100% - 10px) / 3)`}
    ${({theme}) => theme.media.xs`width: calc((100% - 5px) / 2)`}
    ${({theme}) => theme.media.xxs`width: 100%;`}
    ${({theme}) => theme.media.xxs`margin-right: 0;`}

    &:nth-of-type(4n) {
        ${({theme}) => theme.media.xl`margin-right: 0;`}
        ${({theme}) => theme.media.lg`margin-right: 0;`}
        ${({theme}) => theme.media.md`margin-right: 0;`}
    }

    &:nth-of-type(3n) {
        ${({theme}) => theme.media.sm`margin-right: 0;`}
    }

    &:nth-child(2n) {
        ${({theme}) => theme.media.xs`margin-right: 0;`}
    }
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

export const VideoPreview = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    border: 1px solid #000;
    background-image: ${({thumb}) => `url(${thumb})`};
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 1px;
    overflow: hidden;

    &::before {
        content: '';
        display: block;
        padding-top: 75%;
    }

    &:hover ${VideoPreviewBar} {
        transform: translateY(0px);
    }
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
