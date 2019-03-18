import styled from 'styled-components'
import {Link} from 'react-router-dom'
export {StyledLink} from '../../../generic/assets'
export {PageWrapper} from '../../../generic/assets'

const
    adWidth = 300,
    adHeight = 256

export const SponsorLink = styled(Link)`
    color: ${({theme}) => theme.palette.primary.main};
`

export const PlayerSection = styled.section`
    margin-bottom: 40px;

    ${({theme}) => theme.media.mobile`margin-bottom: 20px;`}
`

export const VideoPlayer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    border-radius: 2px;

    ${({theme}) => theme.media.sm`flex-direction: column;`}
    ${({theme}) => theme.media.mobile`flex-direction: column;`}
`

export const VideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - ${adWidth + 20}px);
    flex-grow: 1;
    margin-right: 10px;

    ${({theme}) => theme.media.sm`margin-right: 0; width: 100%;`}
    ${({theme}) => theme.media.mobile`margin-right: 0; width: 100%;`}
`

export const Video = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 10px;

    &::before {
        display: block;
        content: '';
        padding-top: ${adHeight * 2 + 10}px;

        ${({theme}) => theme.media.mobile`padding-top: 80%;`}
    }
`

export const VideoIframe = styled.iframe`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    border-radius: 2px;

    ${({theme}) => theme.media.mobile`width: calc(100% + 20px); left: -10px;`}
`

export const ControlPanel = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    ${({theme}) => theme.media.md`flex-wrap: wrap;`}
    ${({theme}) => theme.media.mobile`flex-wrap: wrap;`}
`

export const ControlPanelBlock = styled.div`
    display: flex;
    align-items: center;

    ${({theme}) => theme.media.mobile`flex-wrap: wrap;`}
`

export const Advertisement = styled.div`
    display: flex;
    width: ${adWidth}px;
    padding: 0 0 10px;
    flex-direction: column;

    ${({theme}) => theme.media.sm`
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
        padding: 0;
        order: 1;
    `}

    ${({theme}) => theme.media.mobile`
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        padding: 0;
        order: 1;
    `}
`

export const BottomAdvertisement = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-radius: 2px;

    ${({theme}) => theme.media.sm`
        flex-wrap: wrap;
        justify-content: space-around;
    `}
    ${({theme}) => theme.media.mobile`
        flex-wrap: wrap;
        justify-content: space-around;
    `}
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

    ${({theme}) => theme.media.mobile`left: -10px; right: -10px;`}
`

export const AdGag = styled.div`
    width: ${adWidth}px;
    height: ${adHeight}px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({theme}) => `${theme.palette.secondary.main}`};
    border-radius: 2px;

    &:first-child {
        margin-bottom: 10px;
    }

    ${({theme}) => theme.media.sm`
        width: calc(${adWidth}px * 0.9);
        height: calc(${adHeight}px * 0.9);
    `}

    ${({theme, currentWidth}) => theme.media.mobile`
        width: ${getAdWidth(currentWidth, 2)}px;
        height: ${getAdWidth(currentWidth, 2) * heightRatio}px;
    `}

    &::before {
        content: 'Gag for advertisement';
        color: ${({theme}) => `${theme.palette.primary.main}`};
        text-align: center;
    }
`

const
    getAdWidth = (currentWidth, quantity) => (currentWidth - quantity * 10 - 10) / quantity,
    getCrazyAdStyles = (currentWidth, quantity, abstractСoefficient) => `
        width: ${(abstractСoefficient - getAdWidth(currentWidth, quantity) / adWidth) * adWidth}px;
        height: ${(abstractСoefficient - getAdWidth(currentWidth, quantity) / adHeight) * adHeight}px;
        zoom: ${getAdWidth(currentWidth, quantity) / adWidth};
        transform: scale(${getAdWidth(currentWidth, quantity) / adWidth});
        transform-origin: 0 0;
    `,
    heightRatio = 0.8535

export const InlineAdvertisement = styled.div`
    position: absolute;
    top: calc(50% - ${adHeight/2}px);
    left: calc(50% - ${adWidth/2}px);
    width: ${adWidth}px;
    height: ${adHeight}px;
    background-color: ${({theme}) => theme.palette.primary.light};
    overflow: hidden;

    ${({theme}) => theme.media.sm`
        width: calc(${adWidth}px * 0.9);
        height: calc(${adHeight}px * 0.9);
    `}

    ${({theme, currentWidth}) => theme.media.mobile`
        top: calc(50% - ${getAdWidth(currentWidth, 2) / 2 * heightRatio}px);
        left: calc(50% - ${getAdWidth(currentWidth, 2) / 2}px);
        width: ${getAdWidth(currentWidth, 2)}px;
        height: ${getAdWidth(currentWidth, 2) * heightRatio}px;
    `}

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

export const AdIframeWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: ${adWidth}px;

    &:first-child {
        margin-bottom: 10px;
    }

    ${({theme}) => theme.media.sm`
        width: calc(${adWidth}px * 0.9);
    `}

    ${({theme, currentWidth}) => theme.media.xs`
        width: ${getAdWidth(currentWidth, 2)}px;
    `}

    ${({theme, currentWidth}) => theme.media.xxs`
        width: ${getAdWidth(currentWidth, 2)}px;
    `}

    &::before {
        display: block;
        content: '';
        padding-top: ${heightRatio * 100}%;
    }
`

export const AdIframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: ${adWidth}px;
    height: ${adHeight}px;
    border-radius: 2px;
    ${({theme}) => theme.media.sm`
        width: calc(${adWidth}px * 1.15);
        height: calc(${adHeight}px * 1.15);
        zoom: 0.9;
        transform: scale(0.9);
        transform-origin: 0 0;
    `}
    ${({theme, currentWidth}) => theme.media.xs`${getCrazyAdStyles(currentWidth, 2, 2.3)}`}
    ${({theme, currentWidth}) => theme.media.xxs`${getCrazyAdStyles(currentWidth, 2, 2.6)}`}
`

export const RelatedVideos = styled.section`
    margin-bottom: 40px;
`

export const TagsWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 0;

    ${({theme}) => theme.media.mobile`flex-wrap: nowrap; overflow-x: auto;`}
`

// styles for plug

export const VideoPlayerPlug = styled.div`
    width: 100%;
    height: 675px;
    margin-bottom: 40px;
    background: ${({theme}) => theme.palette.prerender.plug};
`
