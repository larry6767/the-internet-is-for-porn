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
    width: 60px;
    height: 100%;
    opacity: 0;

    &:hover ~ .input--search {
        background-image: url('/img/search--white.svg');
    }
`
