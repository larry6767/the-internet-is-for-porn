import styled from 'styled-components'

export {
    Page,
    Content,
    PageWrapper,
} from '../../../generic/assets'

export const VideoPlayer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 60px;
    border-radius: 2px;
    overflow: hidden;
`

export const Video = styled.div`
    position: relative;
    display: flex;
    width: auto;
    flex-grow: 1;
    padding: 10px;
    background-color: ${({theme}) => theme.colors.mainColor2};

    &::before {
        display: block;
        content: '';
        padding-top: 60%;
    }

    & iframe {
        width: 100%;
        height: 100%;
        flex-grow: 1;
        border-radius: 2px;
    }
`

export const InlineAdvertisementWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({theme}) => theme.colors.opacityMainColor2};
    cursor: not-allowed;
`

export const InlineAdvertisement = styled.div`
    position: absolute;
    top: calc(50% - 130px);
    left: calc(50% - 150px);
    width: 300px;
    height: 254px;

    & iframe {
        width: 100%;
        height: 100%;
    }
`

export const CloseAdvertisement = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 17px;
    height: 17px;
    cursor: pointer;
`

export const Advertisement = styled.div`
    display: flex;
    width: 320px;
    padding: 10px;
    flex-direction: column;
    background-color: ${({theme}) => theme.colors.mainColor2};

    & iframe {
        width: 300px;
        height: 254px;
        border-radius: 2px;
    }

    & iframe:not(:last-child) {
        margin-bottom: 10px;
    }
`

export const RelatedVideos = styled.section`
    margin-bottom: 40px;
`

export const BottomAdvertisement = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: ${({theme}) => theme.colors.mainColor2};
    padding: 10px 10px 7px;
    border-radius: 2px;

    & iframe {
        width: 300px;
        height: 254px;
        border-radius: 2px;
    }
`
