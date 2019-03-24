import {range, random} from 'lodash'
import {List} from 'immutable'

export default (randomWidthListSize, oldRandomWidthList = null) => {
    const
        baseWidth = 240,
        widthOffset = 40,
        minWidthForItem = baseWidth - widthOffset,
        maxWidthForItem = baseWidth + widthOffset,
        randomWidthList = List(range(0, randomWidthListSize).map(x =>
            (oldRandomWidthList && oldRandomWidthList.get(x)) || // getting without 'ig'
            random(minWidthForItem, maxWidthForItem)))

    return randomWidthList
}
