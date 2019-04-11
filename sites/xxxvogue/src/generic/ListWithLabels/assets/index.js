import styled from 'styled-components'
import {StyledLink} from 'src/generic/assets'

export const List = styled.ul`
    overflow: hidden;
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(6, calc(100% / 6));
    grid-template-rows: repeat(${({itemsQuantity}) => Math.ceil(itemsQuantity / 6)}, 1fr);
    padding: 10px 0;
    border: 1px solid ${({theme}) => theme.palette.primary.extraLight};
    border-radius: 2px;
    list-style-type: none;
    margin: 0 0 30px;

    ${({theme, itemsQuantity}) => theme.media.lg`
        grid-template-rows: repeat(${Math.ceil(itemsQuantity / 5)}, 1fr);
        grid-template-columns: repeat(5, calc(100% / 5));
    `}

    ${({theme, itemsQuantity}) => theme.media.md`
        grid-template-rows: repeat(${Math.ceil(itemsQuantity / 4)}, 1fr);
        grid-template-columns: repeat(4, calc(100% / 4));
    `}

    ${({theme, itemsQuantity}) => theme.media.sm`
        grid-template-rows: repeat(${Math.ceil(itemsQuantity / 3)}, 1fr);
        grid-template-columns: repeat(3, calc(100% / 3));
    `}

    ${({theme, itemsQuantity}) => theme.media.xs`
        grid-template-rows: repeat(${Math.ceil(itemsQuantity / 2)}, 1fr);
        grid-template-columns: repeat(2, calc(100% / 2));
    `}

    ${({theme, itemsQuantity}) => theme.media.xxs`
        grid-template-rows: repeat(${Math.ceil(itemsQuantity / 1)}, 1fr);
        grid-template-columns: repeat(1, calc(100% / 1));
    `}
`

const ItemOrLabel = styled.li`
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

export const Label = styled(ItemOrLabel)`
    font-size: 18px;
    font-weight: bold;
    padding: 7px 14px 7px 15px;

    ${({theme}) => theme.media.md`font-size: 16px;`}
    ${({theme}) => theme.media.sm`font-size: 16px;`}
    ${({theme}) => theme.media.mobile`font-size: 16px;`}
`

export const Item = styled(ItemOrLabel)`
    font-size: 14px;
    padding: 0 9px 0 10px;

    ${({theme}) => theme.media.md`font-size: 12px;`}
    ${({theme}) => theme.media.sm`font-size: 12px;`}
    ${({theme}) => theme.media.mobile`font-size: 12px;`}
`

export const Link = styled(StyledLink)`
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
