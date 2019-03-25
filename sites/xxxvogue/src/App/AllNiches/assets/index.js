import styled from 'styled-components'
export {PageWrapper, StyledLink} from '../../../generic/assets'

export const ListComponentPlug = styled.div`
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(${({itemsQuantity}) => Math.ceil(itemsQuantity / 5)}, 1fr);

    ${({theme, itemsQuantity}) =>
        theme.media.md`grid-template-rows: repeat(${Math.ceil(itemsQuantity / 4)}, 1fr)`}
    ${({theme, itemsQuantity}) =>
        theme.media.sm`grid-template-rows: repeat(${Math.ceil(itemsQuantity / 3)}, 1fr)`}
    ${({theme, itemsQuantity}) =>
        theme.media.xs`grid-template-rows: repeat(${Math.ceil(itemsQuantity / 2)}, 1fr)`}
    ${({theme, itemsQuantity}) =>
        theme.media.xxs`grid-template-rows: repeat(${Math.ceil(itemsQuantity / 1)}, 1fr)`}
`

export const ListItemWrapperPlug = styled.div`
    padding: 11px 10px;
`

export const ListItemPlug = styled.div`
    background: ${({theme}) => theme.palette.prerender.plug};
    height: 39px;
    width: 100%;
`
