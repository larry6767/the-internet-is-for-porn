import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const StyledLinkBlock = styled(Link)`
    position: relative;
    display: inline-block;
    text-decoration: none;
    width: 100%;
    height: 100%;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: calc((100% - 70px) / 8);
    height: auto;
    margin-right: 10px;
    margin-bottom: 10px;

    ${({theme}) => theme.media.sm`width: calc((100% - 50px) / 6)`}
    ${({theme}) => theme.media.xs`width: calc((100% - 20px) / 3)`}
    ${({theme}) => theme.media.xxs`width: calc((100% - 10px) / 2)`}

    &:nth-child(8n) {
        ${({theme}) => theme.media.xl`margin-right: 0;`}
        ${({theme}) => theme.media.lg`margin-right: 0;`}
        ${({theme}) => theme.media.md`margin-right: 0;`}
    }

    &:nth-child(6n) {
        ${({theme}) => theme.media.sm`margin-right: 0;`}
    }

    &:nth-child(3n) {
        ${({theme}) => theme.media.xs`margin-right: 0;`}
    }

    &:nth-child(2n) {
        ${({theme}) => theme.media.xxs`margin-right: 0;`}
    }
`

const ThumbCommon = styled.div`
    width: 100%;

    &::after {
        content: '';
        display: block;
        padding-top: 122.7%;
    }
`

export const Thumb = styled(ThumbCommon)`
    height: auto;
    background-color: ${({theme}) => theme.palette.prerender.plug};
    background-size: cover;
    border-radius: 1px;
`

export const InfoBar = styled.div`
    display: flex;
    align-items: center;
`

export const Like = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    min-width: 27px;
    background-color: ${({theme}) => theme.palette.primary.lightOpacity};
    border-radius: 1px;
    min-height: 30px;
    min-width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

// styles for plug

export const ThumbPlug = styled(ThumbCommon)`
    background: ${({theme}) => theme.palette.prerender.plug};
`

export const TypographyPlug = styled.div`
    width: 100%;
    height: 17px;
    margin: 6px 0 2px;
    background: ${({theme}) => theme.palette.prerender.plug};

    ${({theme}) => theme.media.mobile`margin: 2px 0;`};
`

export const InfoBarPlug = styled.div`
    width: 100%;
    height: 23px;
    margin: 2px 0;
    background: ${({theme}) => theme.palette.prerender.plug};
`
