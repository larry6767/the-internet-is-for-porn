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
    background-color: ${({theme}) => theme.colors.mainColor2};

    ${({theme}) => theme.media.sm`flex-direction: column;`}
    ${({theme}) => theme.media.mobile`flex-direction: column;`}
`

export const Video = styled.div`
    position: relative;
    display: flex;
    width: auto;
    flex-grow: 1;
    margin: 10px;

    &::before {
        display: block;
        content: '';
        padding-top: 60%;

        ${({theme}) => theme.media.mobile`padding-top: 100%;`}
    }

    & iframe {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        flex-grow: 1;
        border-radius: 2px;
    }
`

export const InlineAdvertisementWrapper = styled.div`
    position: absolute;
    z-index: 2;
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
    background-color: ${({theme}) => theme.colors.mainColor2};

    ${({theme}) => theme.media.mobile`
        top: calc(50% - 85px);
        left: calc(50% - 100px);
        width: 200px;
        height: 170px;
    `}

    & iframe {
        width: 100%;
        height: 100%;
    }
`

export const CloseAdvertisement = styled.div`
    position: absolute;
    z-index: 2;
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

    ${({theme}) => theme.media.sm`
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
    `}

    ${({theme}) => theme.media.mobile`
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
    `}

    & iframe {
        width: 300px;
        height: 254px;
        border-radius: 2px;
    }

    & iframe:not(:last-child) {
        margin-bottom: 10px;

        ${({theme}) => theme.media.sm`margin-bottom: 0;`}
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

    ${({theme}) => theme.media.sm`flex-wrap: wrap; justify-content: space-around;`}
    ${({theme}) => theme.media.mobile`flex-wrap: wrap; justify-content: space-around;`}

    & iframe {
        width: 300px;
        height: 254px;
        border-radius: 2px;

        &:not(:last-child) {
            ${({theme}) => theme.media.sm`margin-bottom: 10px;`}
            ${({theme}) => theme.media.mobile`margin-bottom: 10px;`}
        }
    }
`
