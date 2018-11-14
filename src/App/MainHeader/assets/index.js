import styled from 'styled-components'

export const Header = styled.header`
    display: flex;
    flex-direction: column;
`

export const Top = styled.div`
    background-color: ${({theme}) => theme.colors.mainColor};
`

export const TopInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    margin: 0 auto;

    ${({theme}) => theme.media.xl`width: 1400px;`}
    ${({theme}) => theme.media.lg`width: 1200px;`}
    ${({theme}) => theme.media.sm`padding: 12px 10px;`}
    ${({theme}) => theme.media.mobile`flex-wrap: wrap; justify-content: center; width: 100%;`}
`

const Wrapper = styled.div`
    width: calc(100% - 200px);
    display: flex;
    align-items: center;

    ${({theme}) => theme.media.sm`width: calc(100% - 150px);`}
`

export const SearchWrapper = styled(Wrapper)`
    justify-content: space-between;

    ${({theme}) => theme.media.mobile`width: 100%; min-height: 70px; flex-wrap: wrap;`}
`

export const NavigationWrapper = styled(Wrapper)`
    padding-left: 177px;
    display: flex;
    justify-content: space-between;

    ${({theme}) => theme.media.sm`padding-left: 0;`}
`

export const Logo = styled.img`
    flex-shrink: 0;
    margin-right: 20px;
    width: 179px;
    height: 50px;

    ${({theme}) => theme.media.sm`width: 135px; height: 37px;`}
    ${({theme}) => theme.media.mobile`margin: 0 10px`}
`

export const Icon = styled.div`
    display: none;
    width: 48px;
    height: 48px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 25px;
    ${({type}) => {
        if (type === 'search')
        return 'background-image: url(/img/search.svg);'
        if (type === 'close')
        return `
            background-image: url(/img/close.svg);
            order: 2;
        `
    }}

    ${({theme}) => theme.media.mobile`display: block;`}
`

export const BottomInner = styled.div`
    border-bottom: 1px solid ${({theme}) => theme.colors.additionalColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin: 0 auto;

    ${({theme}) => theme.media.lg`width: 1200px;`}
    ${({theme}) => theme.media.xl`width: 50%;`}
`
