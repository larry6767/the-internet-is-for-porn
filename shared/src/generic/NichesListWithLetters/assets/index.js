import styled from 'styled-components'
import {StyledLink} from 'src/generic/assets'

export const NichesList = styled.ul`
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
    ${({theme}) => theme.media.xs`max-width: 100px;`}
`

export const Quantity = styled.span`
    color: ${({theme}) => theme.palette.primary.lightText};
`
