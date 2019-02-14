import styled from 'styled-components'

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
    ${({theme}) => theme.media.mobile`padding: 10px;`}
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
