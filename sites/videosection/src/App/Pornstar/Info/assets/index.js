import styled from 'styled-components'

export const InfoWrapper = styled.section`
    display: flex;
    margin-bottom: 15px;
    flex-shrink: 0;

    ${({theme}) => theme.media.mobile`flex-wrap: wrap;`}
`

export const ThumbWrapper = styled.div`
    position: relative;
    width: 160px;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    flex-shrink: 0;
    flex-grow: 0;
    align-self: flex-start;
    overflow: hidden;

    ${({theme}) => theme.media.mobile`margin-bottom: 10px;`};
`

const DataWrapperCommon = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

export const DataWrapper = styled(DataWrapperCommon)`
    html.is-loading & * {
        display: none;
    }

    html.is-loading & {
        background: ${({theme}) => theme.palette.prerender.plug};
        border-radius: 4px;
    }
`

const ThumbCommon = styled.div`
    width: 100%;

    &::after {
        content: '';
        display: block;
        padding-top: 122.7%;
    }
`

export const Thumb = styled(ThumbCommon)`
    height: auto;
    background: ${({thumb}) => `url(${thumb})`};
    background-size: cover;
    border-radius: 1px;
`

export const Like = styled.div`
    position: absolute;
    left: 0;
    bottom: -2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.palette.primary.lightOpacity};
    border-radius: 1px;
    min-height: 35px;
    min-width: 40px;
    cursor: pointer;

    html.is-loading & * {
        display: none;
    }
`

// styles for plug

export const ThumbPlug = styled(ThumbCommon)`
    background: ${({theme}) => theme.palette.prerender.plug};
`

export const DataWrapperPlug = styled(DataWrapperCommon)`
    background: ${({theme}) => theme.palette.prerender.plug};

    ${({theme}) => theme.media.mobile`width: 100%; height: 128px;`}
`
