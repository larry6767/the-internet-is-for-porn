import styled from 'styled-components'
import {Page} from '../../../generic/assets'

export {
    Content,
    PageWrapper,
} from '../../../generic/assets'

export const AllNichesPage = styled(Page)`
    ${({theme}) => theme.media.xs`flex-wrap: wrap; justify-content: center;`}
`
