import styled from 'styled-components'

export {
    Page,
    Content,
    PageWrapper,
} from '../../../generic/assets'

export const PlayerSection = styled.div`
    margin-bottom: 60px;
`

export const VideoPlayer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    border-radius: 2px;
    overflow: hidden;
    background-color: ${({theme}) => theme.palette.primary.light};

    ${({theme}) => theme.media.sm`flex-direction: column;`}
    ${({theme}) => theme.media.mobile`flex-direction: column; background: none;`}
`

export const VideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 320px);
    flex-grow: 1;
    padding: 10px 10px 0;

    ${({theme}) => theme.media.sm`width: 100%;`}
    ${({theme}) => theme.media.mobile`padding: 0;`}
`

export const Video = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 10px;

    &::before {
        display: block;
        content: '';
        padding-top: 468px;

        ${({theme}) => theme.media.mobile`padding-top: 300px;`}
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

export const ControlPanel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;

    ${({theme}) => theme.media.mobile`flex-wrap: wrap;`}
`

export const ControlPanelBlock = styled.div`
    display: flex;
    align-items: center;

    ${({theme}) => theme.media.mobile`flex-wrap: wrap;`}
`

export const InlineAdvertisementWrapper = styled.div`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({theme}) => theme.palette.primary.lightOpacity};
    cursor: not-allowed;
`

export const AdGag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({theme}) => `${theme.palette.secondary.main}`};

    &::before {
        content: 'Gag for advertisement';
        color: ${({theme}) => `${theme.palette.primary.main}`};
    }
`

export const InlineAdvertisement = styled.div`
    position: absolute;
    top: calc(50% - 130px);
    left: calc(50% - 150px);
    width: 300px;
    height: 254px;
    background-color: ${({theme}) => theme.palette.primary.light};

    ${({theme}) => theme.media.mobile`
        top: calc(50% - 85px);
        left: calc(50% - 100px);
        width: 200px;
        height: 170px;
    `}

    & iframe,
    ${AdGag} {
        border-radius: 2px;
        width: 100%;
        height: 100%;
    }

    ${AdGag} {
        position: relative;

        &::after {
            position: absolute;
            display: block;
            content: '';
            top: 0;
            right: 0;
            width: 17px;
            height: 17px;
            background: ${({theme}) => theme.palette.primary.lightOpacity};
        }
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
        order: 1;
    `}

    ${({theme}) => theme.media.mobile`
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
        padding: 0;
        order: 1;
    `}

    & iframe,
    ${AdGag} {
        width: 300px;
        height: 254px;
        border-radius: 2px;

        &:not(:last-child) {
            margin-bottom: 10px;

            ${({theme}) => theme.media.sm`margin-bottom: 0;`}
        }
    }
`

export const RelatedVideos = styled.section`
    margin-bottom: 40px;
`

export const BottomAdvertisement = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: ${({theme}) => theme.palette.primary.light};
    padding: 10px 10px 7px;
    border-radius: 2px;

    ${({theme}) => theme.media.sm`flex-wrap: wrap; justify-content: space-around;`}
    ${({theme}) => theme.media.mobile`
        flex-wrap: wrap;
        justify-content: space-around;
        background: none;
    `}

    & iframe,
    ${AdGag} {
        width: 300px;
        height: 254px;
        border-radius: 2px;

        &:not(:last-child) {
            ${({theme}) => theme.media.sm`margin-bottom: 10px;`}
            ${({theme}) => theme.media.mobile`margin-bottom: 10px;`}
        }
    }
`

export const TagsWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 10px 4px;
`

export const SponsorLink = styled.a`
    color: ${({theme}) => theme.palette.primary.main};
`
