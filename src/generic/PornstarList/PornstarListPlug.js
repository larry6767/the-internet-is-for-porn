import {range} from 'lodash'
import React from 'react'

import {
    List,
    PornstarItem,
    ThumbPlug,
    TypographyPlug,
    InfoBarPlug,
} from './assets'

const
    PornstarListPlug = () => <List>
        {range(0, 40).map(x =>
            <PornstarItem key={`${x}-PornstarItemPlug`}>
                <ThumbPlug/>
                <TypographyPlug/>
                <InfoBarPlug/>
            </PornstarItem>
        )}
    </List>

export default PornstarListPlug
