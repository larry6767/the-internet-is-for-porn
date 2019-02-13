import styled from 'styled-components'

export const ListsInner = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    flex-shrink: 0;
    overflow-y: auto;
    ${'' /* TODO need to get real header+footer height from props */}
    min-height: calc(100vh - 373px);
    max-height: ${({maxHeight}) => `${maxHeight}px`}
`
