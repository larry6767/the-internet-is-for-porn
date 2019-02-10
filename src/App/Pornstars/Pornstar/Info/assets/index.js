import styled from 'styled-components'

export const InfoWrapper = styled.section`
    display: flex;
    margin-bottom: 15px;
    flex-shrink: 0;

    ${({theme}) => theme.media.mobile`flex-wrap: wrap;`}
`

export const ThumbWrapper = styled.div`
    width: 130px;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    flex-shrink: 0;
`

export const MobileInfo = styled.div`
    display: none;
    flex-direction: column;
    flex-grow: 1;
    width: calc(100% - 150px);

    ${({theme}) => theme.media.mobile`display: flex;`}
`

export const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    ${({theme, modelInfoIsOpen}) => modelInfoIsOpen
        ? theme.media.mobile`width: 100%; margin-top: 20px;` : ''}
`

export const Thumb = styled.div`
    width: 100%;
    height: auto;
    border: 1px solid ${({theme}) => theme.palette.primary.light};
    background: ${({thumb}) => `url(${thumb})`};
    background-size: cover;
    border-radius: 1px;
    margin-bottom: 10px;

    &::after {
        content: '';
        display: block;
        padding-top: 122%;
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
