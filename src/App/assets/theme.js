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
    mobile: {
        min: 320,
        max: 600-1
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
        mainColor: 'rgb(41, 45, 57);',
        mainColor2: 'rgb(60, 64, 76);',
        mainOppositeColor: 'rgb(255, 255, 255);',
        additionalColor: 'rgb(161, 167, 171);',
        successColor: 'rgb(113, 163, 113);',
        failureColor: 'rgb(255, 4, 0);',

        opacityMainColor: 'rgba(41, 45, 57, 0.6);',
        opacityMainColor2: 'rgba(60, 64, 76, 0.6);',
        opacityMainOppositeColor: 'rgba(255, 255, 255, 0.6);',
        opacityAdditionalColor: 'rgba(161, 167, 171, 0.6);',
        opacitySuccessColor: 'rgb(113, 163, 113, 0.6);',
        opacityFailureColor: 'rgb(255, 4, 0, 0.6);',
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
