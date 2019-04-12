import styled from 'styled-components'

export const List = styled.ul`
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
