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
    palette: {
        primary: {
            light: '#525663',
            main: '#292d39',
            dark: '#000213',
            contrastText: '#fff',
            lightOpacity: '#52566380',
            mainOpacity: '#292d3980',
            darkOpacity: '#00021380',
            contrastTextOpacity: '#ffffff80',
        },
        secondary: {
            light: '#ffd14a',
            main: '#f8a004',
            dark: '#bf7100',
            contrastText: '#000',
            lightOpacity: '#ffd14a80',
            mainOpacity: '#f8a00480',
            darkOpacity: '#bf710080',
            contrastTextOpacity: '#00000080',
        },
        error: {
            light: '#E57373',
            main: '#F44336',
            dark: '#D32F2F',
            contrastText: '#ffffff',
        },
        success: {
            light: '#8aff99',
            main: '#52d869',
            dark: '#00a53b',
            contrastText: '#000000',
        },
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
