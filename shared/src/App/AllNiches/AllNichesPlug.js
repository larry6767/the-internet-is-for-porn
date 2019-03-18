import {range} from 'lodash'
import React from 'react'

// local libs
import {
    ListComponentPlug,
    ListItemWrapperPlug,
    ListItemPlug,
} from 'src/App/AllNiches/assets'

const
    itemsQuantity = 100,

    AllNichesPlug = () => <ListComponentPlug itemsQuantity={itemsQuantity}>
        {range(0, itemsQuantity).map(x => <ListItemWrapperPlug key={`${x}-ListItemPlug`}>
            <ListItemPlug/>
        </ListItemWrapperPlug>)}
    </ListComponentPlug>

export default AllNichesPlug
