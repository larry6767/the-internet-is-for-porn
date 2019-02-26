import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const StyledLink = styled(Link)`
    color: ${({theme}) => theme.palette.primary.dark};
    margin-right: 4px;

    &:not(:last-child)::after {
        content: ',';
    }
`

export const StyledLinkBlock = styled(Link)`
    text-decoration: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`

export const ProviderLink = styled(({isInline, ...rest}) => <Link {...rest}/>)`
    ${({theme, isInline}) =>
        `color: ${isInline ? theme.palette.primary.contrastText : theme.palette.primary.dark}`}
`

export const NativeLink = styled.a`
    text-decoration: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: calc((100% - 15px) / 4);
    margin-right: 5px;
    margin-bottom: 5px;

    ${({theme}) => theme.media.sm`width: calc((100% - 10px) / 3)`}
    ${({theme}) => theme.media.xs`width: calc((100% - 5px) / 2)`}
    ${({theme}) => theme.media.xxs`width: 100%; margin-right: 0;`}

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
    transform: translateY(35px);
    transition: transform 0.2s;

    ${({theme}) => theme.media.sm`transform: translateY(0);`}
    ${({theme}) => theme.media.mobile`transform: translateY(0);`}
`

export const LoadingProgress = styled.div`
    opacity: 0;
    position: absolute;
    height: 2px;
    top: 0;
    right: 0;
    left: 0;
    background-color: ${({theme}) => theme.palette.primary.light};
    transform: translateX(-100%);
    transition: transform 1s;
`

const VideoPreviewCommon = styled.div`
    width: 100%;

    &::before {
        content: '';
        display: block;
        padding-top: 75%;
    }
`

export const VideoPreview = styled(VideoPreviewCommon)`
    position: relative;
    display: flex;
    align-items: flex-end;
    background-color: ${({theme}) => theme.palette.primary.light};
    background-image: ${({thumb}) => `url(${thumb})`};
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 1px;
    overflow: hidden;

    &:hover ${VideoPreviewBar} {
        transform: translateY(0px);
    }

    &:hover ${LoadingProgress} {
        transform: translateX(0);
        opacity: 1;
    }
`

export const VideoPreviewThumbs = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: ${({showed}) => showed ? 1 : 0};
    background-image: ${({thumb}) => `url(${thumb})`};
    background-size: cover;
    background-repeat: no-repeat;
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

export const TagsBlock = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const Like = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.palette.primary.lightOpacity};
    border-radius: 1px;
    min-height: 35px;
    min-width: 40px;
`

export const Duration = styled.div`
    display: flex;
    align-items: center;
    padding: 0 5px;
    background-color: ${({theme}) => theme.palette.primary.lightOpacity};
    border-radius: 1px;
    min-height: 35px;
`

// styles for plug

export const VideoPreviewPlug = styled(VideoPreviewCommon)`
    background: ${({theme}) => theme.palette.prerender.plug};
`

export const TitlePlug = styled.div`
    width: 100%;
    height: 20px;
    margin: 2px 0;
    background: ${({theme}) => theme.palette.prerender.plug};

    ${({theme}) => theme.media.mobile`height: 18px;`};
`

export const ProviderLinkPlug = styled.div`
    width: 40%;
    height: 21px;
    background: ${({theme}) => theme.palette.prerender.plug};

    ${({theme}) => theme.media.mobile`height: 18px;`};
`

export const TagsPlug = styled.div`
    width: 40%;
    height: 21px;
    background: ${({theme}) => theme.palette.prerender.plug};

    ${({theme}) => theme.media.mobile`height: 18px;`};
`
