import styled from 'styled-components'

export {
    Page,
    Content,
    PageWrapper,
} from '../../../generic/assets'

export const PornstarList = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const PornstarItem = styled.div`
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

export const Thumb = styled.div`
    width: 100%;
    height: auto;
    border: 1px solid #000;
    background: ${({thumb}) => `url(${thumb})`};
    background-size: cover;
    border-radius: 1px;

    &::after {
        content: '';
        display: block;
        padding-top: 122.7%;
    }
`

export const InfoBar = styled.div`
    display: flex;
    align-items: center;
    min-height: 27px;
`

export const Like = styled.div`
    display: flex;
    min-width: 27px;
`
