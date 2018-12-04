import styled from 'styled-components'
import {PageWrapper} from '../../../generic/assets'

export {
    Page,
    Content,
} from '../../../generic/assets'

export const AllMoviesPageWrapper = styled(PageWrapper)`
    width: calc(100% - 230px);
    ${({theme}) => theme.media.sm`width: 100%`}
    ${({theme}) => theme.media.xs`width: 100%`}
    ${({theme}) => theme.media.xxs`width: 100%`}
`
