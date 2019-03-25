import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const StyledLink = styled(Link)`
    text-decoration: none;
`

export const Page = styled.section`
    ${'' /* TODO need to get real header+footer height from props */}
    min-height: calc(100vh - 373px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    margin: 0 auto;
    width: 100%;

    ${({theme}) => theme.media.xl`width: 1400px;`}
    ${({theme}) => theme.media.lg`width: 1200px;`}
    ${({theme}) => theme.media.mobile`padding: 20px 10px 10px;`}
`

export const AllNichesPage = styled(Page)`
    ${({theme}) => theme.media.xs`flex-wrap: wrap; justify-content: center;`}
`

export const Content = styled.div`
    display: flex;
    width: 100%;
    align-self: flex-start;
    align-items: flex-start;
`

export const PageWrapper = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-shrink: 1;
`

export const PageWrapperNextToList = styled(PageWrapper)`
    width: calc(100% - 230px);
    ${({theme}) => theme.media.sm`width: 100%`}
    ${({theme}) => theme.media.mobile`width: 100%`}
`

export const ImageRandomWidth = styled.div`
    width: calc((100% - 15px) / 4);
    max-width: 320px;
    margin-right: 5px;
    margin-left: 5px;
    margin-bottom: 5px;
    flex-grow: 1;

    ${({theme}) => theme.media.md`max-width: 340px;`}
    ${({theme}) => theme.media.sm`width: calc((100% - 10px) / 3); max-width: 400px;`}
    ${({theme}) => theme.media.xs`
        width: calc((100% - 5px) / 2);
        max-width: calc(50% - 2px);
        margin: 0 0 5px;
    `}
    ${({theme}) => theme.media.xxs`width: 100%; max-width: 100%; margin: 0;`}

    &:nth-of-type(odd) {
        ${({theme}) => theme.media.xs`margin: 0 4px 5px 0;`}
    }
`
