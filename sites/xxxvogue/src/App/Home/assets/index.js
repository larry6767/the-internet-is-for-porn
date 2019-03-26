import styled from 'styled-components'
import {ImageRandomWidth, StyledLink} from 'src/generic/assets'
export {PageWrapper, StyledLink} from 'src/generic/assets'

export const NichesList = styled.ul`
    position: relative;
    left: -5px;
    top: 0;
    width: calc(100% + 10px);
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    margin: 0 0 20px;

    ${({theme}) => theme.media.mobile`width: 100%; left: 0;`}
`

const NicheCommon = styled(ImageRandomWidth)`
    display: flex;
    flex-direction: column;
`

export const NicheWithThumb = styled(NicheCommon)`
    cursor: pointer;
`

const NicheImageCommon = styled.div`
    width: 100%;
    height: 200px;
    margin-bottom: 5px;

    ${({theme}) => theme.media.xs`height: 140px;`}
    ${({theme}) => theme.media.xxs`height: 200px;`}
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

export const AllPornstarsButton = styled(StyledLink)`
    width: 100%;
    height: 50px;
    background: ${({theme}) => theme.palette.primary.lightText};
    color: ${({theme}) => theme.palette.primary.contrastText};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin: 10px 0 5px;
    border-radius: 4px;
`

export const AllPornstarsQuantity = styled.span`
    font-weight: normal;
    margin-left: 4px;
`

export const NichesListWithLetters = styled.ul`
    overflow: hidden;
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(${({itemsQuantity}) => Math.ceil(itemsQuantity / 5)}, 1fr);
    padding: 10px 0;
    border: 1px solid ${({theme}) => theme.palette.primary.extraLight};
    border-radius: 2px;
    list-style-type: none;
    margin: 0 0 30px;

    ${({theme, itemsQuantity}) =>
        theme.media.lg`grid-template-rows: repeat(${Math.ceil(itemsQuantity / 4)}, 1fr)`}

    ${({theme, itemsQuantity}) =>
        theme.media.md`grid-template-rows: repeat(${Math.ceil(itemsQuantity / 4)}, 1fr)`}

    ${({theme, itemsQuantity}) =>
        theme.media.sm`grid-template-rows: repeat(${Math.ceil(itemsQuantity / 3)}, 1fr)`}

    ${({theme, itemsQuantity}) =>
        theme.media.xs`grid-template-rows: repeat(${Math.ceil(itemsQuantity / 2)}, 1fr)`}

    ${({theme, itemsQuantity}) =>
        theme.media.xxs`grid-template-rows: repeat(${Math.ceil(itemsQuantity / 1)}, 1fr)`}
`

const LetterOrNiche = styled.li`
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: -10px;
        bottom: -10px;
        right: -2px;
        width: 1px;
        background: ${({theme}) => theme.palette.primary.extraLight};
    }
`

export const Letter = styled(LetterOrNiche)`
    font-size: 1rem;
    font-weight: bold;
    padding: 7px 14px 7px 15px;

    ${({theme}) => theme.media.mobile`font-size: 0.875rem;`}
`

export const Niche = styled(LetterOrNiche)`
    font-size: 0.875rem;
    padding: 0 9px 0 10px;

    ${({theme}) => theme.media.mobile`font-size: 0.75rem;`}
`

export const NicheLink = styled(StyledLink)`
    display: flex;
    justify-content: space-between;
    padding: 7px;
    border-radius: 4px;
    color: ${({theme}) => theme.palette.primary.dark};

    &:hover {
        background-color: ${({theme}) => theme.palette.primary.extraLightOpacity};
        cursor: pointer;
    }
`

export const Name = styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    ${({theme}) => theme.media.sm`max-width: 100px;`}
    ${({theme}) => theme.media.sm`max-width: 100px;`}
`

export const Quantity = styled.span`
    color: ${({theme}) => theme.palette.primary.lightText};
`

// styles for plug

export const NichePlug = styled(NicheCommon)`

`

export const NicheImagePlug = styled(NicheImageCommon)`
    background: ${({theme}) => theme.palette.prerender.plug};
`

export const TypographyPlug = styled.div`
    width: 100%;
    height: 25px;
    background: ${({theme}) => theme.palette.prerender.plug};

    ${({theme}) => theme.media.mobile`height: 22px;`};
`
