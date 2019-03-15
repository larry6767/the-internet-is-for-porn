import {range} from 'lodash'
import React from 'react'

// local libs
import {List} from 'src/generic/PornstarList/assets'
import {Wrapper, ThumbPlug, TypographyPlug, InfoBarPlug} from 'src/generic/PornstarItem/assets'

const
    PornstarListPlug = () => <List>
        {range(0, 40).map(x =>
            <Wrapper key={`${x}-PornstarItemPlug`}>
                <ThumbPlug/>
                <TypographyPlug/>
                <InfoBarPlug/>
            </Wrapper>
        )}
    </List>

export default PornstarListPlug
