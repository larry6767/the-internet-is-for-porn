import styled from 'styled-components'

export const InfoWrapper = styled.section`
    display: flex;
    margin-bottom: 15px;
`
export const ThumbWrapper = styled.div`
    width: 130px;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`

export const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const Thumb = styled.div`
    width: 100%;
    height: auto;
    border: 1px solid #000;
    background: ${({thumb}) => `url(${thumb})`};
    background-size: cover;
    border-radius: 1px;
    margin-bottom: 5px;

    &::after {
        content: '';
        display: block;
        padding-top: 122.7%;
    }
`

export const InfoBar = styled.div`
    display: flex;
    align-items: center;
    min-height: 27px;
`

export const Like = styled.div`
    display: flex;
    min-width: 27px;
    margin-right: 5px;
    cursor: pointer;
`
