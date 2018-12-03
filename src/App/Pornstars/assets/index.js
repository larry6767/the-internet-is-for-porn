import styled from 'styled-components'

export const Page = styled.div`
    width: 1200px;
    min-height: calc(100vh - 373px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    margin: 0 auto;
`

export const Content = styled.div`
    display: flex;
    width: 100%;
`

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 1200px;
`

export const PornstarList = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const PornstarItem = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(1100px / 8);
    margin-right: calc(100px / 7);
    margin-bottom: 10px;

    &:nth-child(8n) {
        margin-right: 0;
    }
`

export const Thumb = styled.div`
    width: 100%;
    height: 168.75px;
    border: 1px solid #000;
    background: ${({thumb}) => `url(${thumb})`};
    background-size: cover;
    border-radius: 1px;
`

export const InfoBar = styled.div`
    display: flex;
    align-items: center;
    min-height: 27px;
`

export const Like = styled.div`
    display: flex;
    min-width: 27px;
`
