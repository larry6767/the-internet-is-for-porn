import styled from 'styled-components'

export {PageWrapper, StyledLink} from '../../../generic/assets'

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

const NicheCommon = styled.div`
    display: flex;
    flex-direction: column;
    width: calc((100% - 15px) / 4);
    margin-right: 5px;
    margin-bottom: 5px;

    ${({theme}) => theme.media.sm`width: calc((100% - 10px) / 3)`}
    ${({theme}) => theme.media.xs`width: calc((100% - 5px) / 2)`}
    ${({theme}) => theme.media.xxs`width: 100%;margin-right: 0;`}

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

export const Niche = styled(NicheCommon)`
    cursor: pointer;
`

const NicheImageCommon = styled.div`
    width: 100%;
    margin-bottom: 5px;

    &::before {
        content: '';
        display: block;
        padding-top: 75%;
    }
`

export const NicheImage = styled(NicheImageCommon)`
    position: relative;
    display: flex;
    align-items: flex-end;
    background-color: ${({theme}) => theme.palette.prerender.plug};
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 1px;
    overflow: hidden;
`

export const NicheTitle = styled.div`
    display: flex;
`

// styles for plug

export const NichePlug = styled(NicheCommon)`

`

export const NicheImagePlug = styled(NicheImageCommon)`
    background: ${({theme}) => theme.palette.prerender.plug};
`

export const TypographyPlug = styled.div`
    width: 100%;
    height: 30px;
    background: ${({theme}) => theme.palette.prerender.plug};

    ${({theme}) => theme.media.mobile`height: 26px;`};
`
