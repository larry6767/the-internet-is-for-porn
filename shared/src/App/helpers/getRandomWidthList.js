import {range, chunk, flatten, random, reduce, inRange, round} from 'lodash'
import {List} from 'immutable'

//local libs
import g from 'src/App/helpers/plain/provedGet'

const
    equalizeItems = (x, xLength, minWidthForItem, maxWidthForItem, sumOffset) => {
        const
            randomItem = random(0, xLength - 1),
            newValue = x[randomItem] - sumOffset

        let
            newSumOffset

        if (inRange(newValue, minWidthForItem, maxWidthForItem + 1)) {
            x[randomItem] = newValue
        } else if (newValue < minWidthForItem) {
            newSumOffset = minWidthForItem - newValue
            x[randomItem] = minWidthForItem
        } else if (newValue > maxWidthForItem) {
            newSumOffset = maxWidthForItem - newValue
            x[randomItem] = maxWidthForItem
        }

        if (newSumOffset)
            equalizeItems(x, xLength, minWidthForItem, maxWidthForItem, newSumOffset)
    }

export default (numberOfItems, contentSize, numberOfItemsPerRow, widthOffset) => {
    if (numberOfItemsPerRow === 1)
        return List(range(0, numberOfItems).map(x => contentSize))

    const
        minWidthForItem = round(contentSize / numberOfItemsPerRow - widthOffset, 3),
        maxWidthForItem = round(contentSize / numberOfItemsPerRow + widthOffset, 3),
        arr = chunk(
            range(0, numberOfItems).map(x => round(random(minWidthForItem, maxWidthForItem)), 3),
            numberOfItemsPerRow
        )

    arr.map(x => {
        const
            sum = reduce(x, (sum, n) => sum + n, 0),
            sumOffset = sum - contentSize

        if (!sumOffset)
            return x
        else
            equalizeItems(x, g(x, 'length'), minWidthForItem, maxWidthForItem, sumOffset)

        return x
    })

    return List(flatten(arr))
}
