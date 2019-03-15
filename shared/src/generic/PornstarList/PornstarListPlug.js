import {range} from 'lodash'
import React from 'react'

import {List} from './assets'
import {Wrapper, ThumbPlug, TypographyPlug, InfoBarPlug} from '../PornstarItem/assets'

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
