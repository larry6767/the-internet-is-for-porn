import styled from 'styled-components'

export {
    Page,
    Content,
    PageWrapper,
} from '../../../generic/assets'

export const LetterIcon = styled.div`
    width: 24px;
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.mainColor};
`
