import React from 'react'

// local libs
import {Wrapper, ControlButtons, SortPlug, ShowedElementsPlug} from 'src/generic/ControlBar/assets'
import {PaginationPlug} from 'src/generic/Pagination/assets'

const
    ControlBarPlug = () => <Wrapper>
        <ControlButtons>
            <PaginationPlug/>
            <SortPlug/>
        </ControlButtons>
        <ShowedElementsPlug/>
    </Wrapper>

export default ControlBarPlug
