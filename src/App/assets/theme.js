import {css} from 'styled-components'

const breakPoints = {
    xl: {
        min: 1920,
        max: 5120
    },
    lg: {
        min: 1280,
        max: 1920-1
    },
    md: {
        min: 960,
        max: 1280-1
    },
    sm: {
        min: 600,
        max: 960-1
    },
    xs: {
        min: 375,
        max: 600-1
    },
    xxs: {
        min: 320,
        max: 375-1
    }
}

const theme = {
    colors: {
        mainColor: '#292d39',
        mainColor2: '#3c404c',

        mainOppositeColor: '#ffffff',

        additionalColor: '#a1a7b1'
    },
    media: Object.keys(breakPoints).reduce((acc, current) => {
        acc[current] = (...args) => css`
            @media (min-width: ${breakPoints[current].min}px) and (max-width: ${breakPoints[current].max}px) {
                ${css(...args)}
            }
        `
        return acc
    }, {})
}

export default theme
