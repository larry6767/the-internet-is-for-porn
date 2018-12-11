import styled from 'styled-components'

export const InfoWrapper = styled.section`
    display: flex;
    margin-bottom: 15px;
    flex-shrink: 0;

    ${({theme}) => theme.media.xs`flex-direction: column;`}
    ${({theme}) => theme.media.xxs`flex-direction: column;`}
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
    flex-grow: 1;

    ${({theme, modelInfoIsOpen}) => modelInfoIsOpen ? theme.media.xs`margin-top: 20px;` : ''}
    ${({theme, modelInfoIsOpen}) => modelInfoIsOpen ? theme.media.xxs`margin-top: 20px;` : ''}
`

export const Thumb = styled.div`
    width: 100%;
    height: auto;
    border: 1px solid ${({theme}) => theme.colors.additionalColor};
    background: ${({thumb}) => `url(${thumb})`};
    background-size: cover;
    border-radius: 1px;
    margin-bottom: 5px;

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
