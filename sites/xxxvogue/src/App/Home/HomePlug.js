import {range} from 'lodash'
import React from 'react'

// local libs
import {NichesList, NichePlug, NicheImagePlug, TypographyPlug} from 'src/App/Home/assets'

const
    PornstarInfoPlug = () => <NichesList>
        {range(0, 20).map(x => <NichePlug key={`${x}-NichePlug`}>
            <NicheImagePlug/>
            <TypographyPlug/>
        </NichePlug>)}
    </NichesList>

export default PornstarInfoPlug
