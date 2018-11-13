import styled from 'styled-components'

export const Footer = styled.footer`
    width: 100vw;
`

export const FooterInner = styled.div`
    display: flex;
    padding: 25px 20px 10px;
    margin: 0 auto;
    border-top: 1px solid ${({theme}) => theme.colors.additionalColor};

    ${({theme}) => theme.media.xl`width: 1400px;`}
    ${({theme}) => theme.media.lg`width: 1200px;`}
    ${({theme}) => theme.media.xs`flex-wrap: wrap; justify-content: center;`}
`

export const TextBlock = styled.div`
    width: calc(100% - 70px);

    ${({theme}) => theme.media.xl`width: 100%;`}
    ${({theme}) => theme.media.xs`width: 100%;`}
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
    color: ${({theme}) => theme.colors.mainColor};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`

export const QRCodeBlock = styled.div`
    position: fixed;
    right: 20px;
    bottom: 20px;
`
