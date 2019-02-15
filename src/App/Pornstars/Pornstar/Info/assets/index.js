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

const DataWrapperCommon = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

export const DataWrapper = styled(DataWrapperCommon)`
    ${({theme, modelInfoIsOpened}) => modelInfoIsOpened
        ? theme.media.mobile`width: 100%; margin-top: 20px;` : ''}

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
    border: 1px solid ${({theme}) => theme.palette.primary.light};
    background: ${({thumb}) => `url(${thumb})`};
    background-size: cover;
    border-radius: 1px;
    margin-bottom: 8px;
`

export const InfoBar = styled.div`
    display: flex;
    align-items: center;
    min-height: 27px;

    html.is-loading & * {
        display: none;
    }

    html.is-loading & {
        background: ${({theme}) => theme.palette.prerender.plug};
        border-radius: 4px;
        width: 130px;
        height: 34px;
    }
`

export const Like = styled.div`
    display: flex;
    min-width: 27px;
    margin-right: 5px;
    cursor: pointer;
`

// styles for plug

export const ThumbPlug = styled(ThumbCommon)`
    background: ${({theme}) => theme.palette.prerender.plug};
    margin-bottom: 8px;
`

export const InfoBarPlug = styled.div`
    width: 100%;
    height: 34px;
    background: ${({theme}) => theme.palette.prerender.plug};
`

export const MobileInfoPlug = styled.div`
    background: ${({theme}) => theme.palette.prerender.plug};
`

export const DataWrapperPlug = styled(DataWrapperCommon)`
    background: ${({theme}) => theme.palette.prerender.plug};
`
