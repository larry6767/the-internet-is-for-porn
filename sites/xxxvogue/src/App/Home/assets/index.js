import styled from 'styled-components'
import {ImageRandomWidth} from 'src/generic/assets'
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
    position: relative;
    left: -5px;
    top: 0;
    width: calc(100% + 10px);
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    margin: 0 0 40px;

    ${({theme}) => theme.media.mobile`margin: 0 0 20px; width: 100%; left: 0;`}
`

const NicheCommon = styled(ImageRandomWidth)`
    display: flex;
    flex-direction: column;
`

export const Niche = styled(NicheCommon)`
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
