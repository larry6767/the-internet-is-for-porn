import styled from 'styled-components'

export {PageWrapper} from '../../../generic/assets'

export const LetterIcon = styled.div`
    width: 24px;
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: ${({theme}) => theme.palette.primary.main};
`

export const NichesList = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    margin: 0 0 40px;

    ${({theme}) => theme.media.mobile`margin: 0 0 20px;`}
`

export const Niche = styled.div`
    display: flex;
    flex-direction: column;
    width: calc((100% - 15px) / 4);
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;

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

export const NicheImage = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    width: 100%;
    background-color: ${({theme}) => theme.palette.primary.dark};
    background-image: ${({thumb}) => `url(${thumb})`};
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 1px;
    overflow: hidden;
    margin-bottom: 5px;

    &::before {
        content: '';
        display: block;
        padding-top: 75%;
    }
`

export const NicheTitle = styled.div`
    display: flex;
`
