import styled from 'styled-components'

export const NicheBlock = styled.div`
    flex-grow: 1;

    ${({theme}) => theme.media.sm`flex-grow: 0;`}
    ${({theme}) => theme.media.mobile`width: 100%; margin-top: 10px;`}
`

export const NicheWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
`

export const NicheMobile = styled.nav`
    display: flex;
    width: 100%;
    justify-content: center;
`
export const NicheMobileItem = styled.a`
    width: 33.33%;
    padding: 10px 0;
    border: 2px solid ${({theme}) => theme.palette.primary.dark};
    text-align: center;
    color: ${({theme}) => theme.palette.primary.light};
    text-decoration: none;

    &:first-child {
        border-radius: 4px 0 0 4px;
        border-right: none;
    }

    &:last-child {
        border-radius: 0 4px 4px 0;
        border-left: none;
    }
`

export const NicheMobileItemSelected = styled(NicheMobileItem)`
    color: ${({theme}) => theme.palette.primary.contrastText};
`

export const TextIcon = styled.div`
    margin: 0 5px 0 0;
    width: 24px;
    height: 24px;
    font-size: 24px;
`
