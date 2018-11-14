import styled from 'styled-components'

export const Item = styled.div`
    margin: 0 10px 3px 0;
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    ${({type}) => `background-image: url('./img/flags/${type}.svg');`}
`

// https://www.flaticon.com/packs/flags-3
