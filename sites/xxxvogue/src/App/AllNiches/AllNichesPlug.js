import {range} from 'lodash'
import React from 'react'
import {
    ListComponentPlug,
    ListItemWrapperPlug,
    ListItemPlug,
} from './assets'

const
    itemsQuantity = 100,

    AllNichesPlug = () => <ListComponentPlug itemsQuantity={itemsQuantity}>
        {range(0, itemsQuantity).map(x => <ListItemWrapperPlug key={`${x}-ListItemPlug`}>
            <ListItemPlug/>
        </ListItemWrapperPlug>)}
    </ListComponentPlug>

export default AllNichesPlug
