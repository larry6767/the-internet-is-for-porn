export const
    // a set of sort of ENUM to avoid human-factor typos
    breakpointXXS = 'xxs',
    breakpointXS = 'xs',
    breakpointSM = 'sm',
    breakpointMD = 'md',
    breakpointLG = 'lg',
    breakpointXL = 'XL'

export const breakpoints = [ // ordering
    breakpointXXS,
    breakpointXS,
    breakpointSM,
    breakpointMD,
    breakpointLG,
    breakpointXL,
]

export default (currentWidth = null) =>
    currentWidth === null
    ? breakpointMD // by default (for SSR also), you're free to change it
    : (currentWidth < 375) ? breakpointXXS
    : (currentWidth >= 375  && currentWidth < 600)  ? breakpointXS
    : (currentWidth >= 600  && currentWidth < 959)  ? breakpointSM
    : (currentWidth >= 960  && currentWidth < 1279) ? breakpointMD
    : (currentWidth >= 1280 && currentWidth < 1919) ? breakpointLG
    : breakpointXL

export const compareCurrentBreakpoint = (a, b) =>
    breakpoints.indexOf(a) === breakpoints.indexOf(b) ? 0 : // equals
    breakpoints.indexOf(a) >   breakpoints.indexOf(b) ? 1 : // greater
    -1 // less
