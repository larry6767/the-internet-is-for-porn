import styled from 'styled-components'
export {StyledLink} from '../../assets'

const ListsInnerCommon = styled.div`
    margin-right: 10px;
    flex-shrink: 0;
    ${'' /* TODO need to get real header+footer height from props */}
    min-height: calc(100vh - 373px);
`

export const ListsInner = styled(ListsInnerCommon)`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: ${({maxHeight}) => `${maxHeight ? `${maxHeight}px` : 'auto'}`}
`

// styles for plug

export const ListsPlug = styled(ListsInnerCommon)`
    width: 219px;
    align-self: stretch;
    background: ${({theme}) => theme.palette.prerender.plug};

    ${({theme}) => theme.media.sm`display: none;`};
    ${({theme}) => theme.media.mobile`display: none;`};
`

export const Section = styled.li`
    background-color: 'inherit',
`

export const SectionInner = styled.ul`
    background-color: 'inherit';
    padding: 0;
`
