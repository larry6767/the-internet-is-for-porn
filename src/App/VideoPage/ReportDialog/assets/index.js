import styled from 'styled-components'

export const VideoBlock = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 60px;
`

export const Thumb = styled.div`
    width: 258px;
    height: 193px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: ${({thumb}) => `url(${thumb})`};
    margin-right: 20px;
    border-radius: 4px;
`

export const Description = styled.div`
    flex-grow: 1;
    max-width: calc(100% - 258px - 20px);
`
