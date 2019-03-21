import styled from 'styled-components'

export const SearchForm = styled.form`
    position: relative;
    width: 100%;

    ${({theme}) => theme.media.mobile`width: calc(100% - 60px); order: 1;`}
`

export const SearchButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 100%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
`
