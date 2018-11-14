import styled from 'styled-components'

export const Page = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 373px);
    padding: 15px 10px;
    margin: 0 auto;

    ${({theme}) => theme.media.xl`width: 1400px;`}
    ${({theme}) => theme.media.lg`width: 1200px;`}
    ${({theme}) => theme.media.sm`padding: 12px 10px;`}
    ${({theme}) => theme.media.xs`flex-wrap: wrap; justify-content: center;`}
`
