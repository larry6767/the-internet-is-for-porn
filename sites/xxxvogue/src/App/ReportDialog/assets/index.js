import styled from 'styled-components'

export const VideoBlock = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
`
const thumbWidth = 215

export const Thumb = styled.div`
    width: ${thumbWidth}px;
    height: 160px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: ${({thumb}) => `url(${thumb})`};
    margin-right: 20px;
    border-radius: 4px;

    ${({theme}) => theme.media.sm`margin-bottom: 20px;`}
    ${({theme}) => theme.media.mobile`margin-bottom: 20px;`}
`

export const Description = styled.div`
    flex-grow: 1;
    max-width: calc(100% - ${thumbWidth}px - 20px);

    ${({theme}) => theme.media.sm`width: 100%; max-width: 100%;`}
    ${({theme}) => theme.media.mobile`width: 100%; max-width: 100%;`}
`

export const SubmitButtonWrapper = styled.div`
    position: relative;
`
