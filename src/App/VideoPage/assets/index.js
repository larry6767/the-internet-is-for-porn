import styled from 'styled-components'

export {
    Page,
    Content,
    PageWrapper,
} from '../../../generic/assets'

export const VideoPlayer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export const Video = styled.div`
    display: flex;
    width: 70%;
    background-color: ${({theme}) => theme.colors.mainColor2};

    & iframe {
        flex-grow: 1;
    }
`
