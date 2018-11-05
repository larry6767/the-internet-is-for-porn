import React from 'react'
import {MenuItem} from '@material-ui/core'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

export default (suggestion, { query, isHighlighted }) => {
    const
        matches = match(suggestion.label, query),
        parts = parse(suggestion.label, matches)

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                        <strong key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </strong>
                    )
                })}
            </div>
        </MenuItem>
    )
}
