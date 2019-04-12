import styled from 'styled-components'
import {IMG_PATH} from 'src/config'

export const Footer = styled.footer`
    position: relative;
    width: 100%;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        height: 1px;
        width: 100%;
        background-color: ${({theme}) => theme.palette.primary.extraLight};
    }
`

const footerBackgroundPath = `${IMG_PATH}footer/footer-background.png`

export const FooterInner = styled.div`
    position: relative;
    display: flex;
    padding: 25px 10px 10px;
    margin: 0 auto;

    &::after {
        content: '';
        background-image: url(${footerBackgroundPath});
        width: 511px;
        height: 85px;
        display: block;
        position: absolute;
        bottom: 0;
        right: -20px;

        ${({theme}) => theme.media.mobile`display: none;`}
    }

    ${({theme}) => theme.media.xl`width: 1400px;`}
    ${({theme}) => theme.media.lg`width: 1200px;`}
    ${({theme}) => theme.media.xs`flex-wrap: wrap; justify-content: center;`}
`

const
    asacpPath = `${IMG_PATH}footer/asacp.png`,
    rtaPath = `${IMG_PATH}footer/rta.png`

export const TextBlock = styled.div`
    width: 100%;
    position: relative;
    padding-right: 500px;

    &::before {
        position: absolute;
        top: 0;
        right: 100px;
        content: url(${asacpPath});
        display: block;
        width: 88px;
        height: 31px;

        ${({theme}) => theme.media.mobile`display: none;`}
    }

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        content: url(${rtaPath});
        display: block;
        width: 88px;
        height: 31px;

        ${({theme}) => theme.media.mobile`display: none;`}
    }

    ${({theme}) => theme.media.md`padding-right: 300px;`}
    ${({theme}) => theme.media.sm`padding-right: 200px;`}
    ${({theme}) => theme.media.mobile`padding-right: 0;`}
`

export const LinkList = styled.ul`
    list-style-type: none;
    padding: 0;
    display: flex;
    margin: 0 0 20px;
`

export const LinkItem = styled.li`
    color: $main-color;
    margin-right: 10px;
    font-size: 14px;

    &:not(:last-child)::after {
        content: '•';
        margin-left: 10px;
    }
`

export const Link = styled.a`
    font-weight: bold;
    color: ${({theme}) => theme.palette.primary.main};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`
