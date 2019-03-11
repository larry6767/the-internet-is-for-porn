import React from 'react'
import {
    Wrapper,
    ControlButtons,
    SortPlug,
    ShowedElementsPlug,
} from './assets'
import {PaginationPlug} from '../Pagination/assets'

const
    ControlBarPlug = () => <Wrapper>
        <ControlButtons>
            <PaginationPlug/>
            <SortPlug/>
        </ControlButtons>
        <ShowedElementsPlug/>
    </Wrapper>

export default ControlBarPlug
