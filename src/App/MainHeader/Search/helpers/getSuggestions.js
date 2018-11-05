import deburr from 'lodash/deburr'
import {suggestions} from '../fixtures'

export default (value) => {
    const
        inputValue = deburr(value.trim()).toLowerCase(),
        inputLength = inputValue.length

    let
        count = 0

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const
                keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue

            if (keep) {
                count += 1
            }

            return keep
        })
}
