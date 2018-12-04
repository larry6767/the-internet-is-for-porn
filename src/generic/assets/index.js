import styled from 'styled-components'

export const Page = styled.section`
    min-height: calc(100vh - 373px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    margin: 0 auto;

    ${({theme}) => theme.media.xl`width: 1400px;`}
    ${({theme}) => theme.media.lg`width: 1200px;`}
`

export const Content = styled.div`
    display: flex;
    width: 100%;
`

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
