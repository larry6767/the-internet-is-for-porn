import {range} from 'lodash'
import React from 'react'

// local libs
import {NichesList, NichePlug, NicheImagePlug, TypographyPlug} from 'src/App/Home/assets'

const
    nicheWithImagesQuantity = 20,

    HomePlug = () => <NichesList>
        {range(0, nicheWithImagesQuantity).map(x => <NichePlug key={`${x}-NichePlug`}>
            <NicheImagePlug/>
            <TypographyPlug/>
        </NichePlug>)}
    </NichesList>

export default HomePlug
