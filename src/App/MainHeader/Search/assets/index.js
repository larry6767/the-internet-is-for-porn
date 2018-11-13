import styled from 'styled-components'

export const Search = styled.header`
    position: relative;
    width: 100%;

    ${({theme}) => theme.media.xs`width: calc(100% - 60px); margin-bottom: 20px; order: 1;`}
`

// export const SearchInput = styled.header`
//     width: 100%;
//     display: flex;
//     align-items: center;
//     border: none;
//     border-radius: 4px;
//     background-color: ${({theme}) => theme.colors.mainColor2};
//     background-image: url('/img/search.svg');
//     background-repeat: no-repeat;
//     background-position: right 15px center;
//     background-size: 25px;
//     display: block;
//     padding: 15px 60px 15px 20px;
//     transition: background-image 0.3s;

//     ${({theme}) => theme.media.sm`padding: 12px 60px 12px 20px;`}

//     &::placeholder {
//         color: ${({theme}) => theme.colors.additionalColor};
//     }

//     &:focus {
//         outline: none;
//         color: ${({theme}) => theme.colors.mainOppositeColor};
//     }

//     &:disabled {
//         cursor: not-allowed;
//     }
// `

export const SearchButton = styled.header`
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
