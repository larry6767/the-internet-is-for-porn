export default (currentWidth = window.outerWidth) => {
    let
        currentBreakpoint

    (currentWidth < 375) ? currentBreakpoint = 'xxs'
    : (currentWidth >= 375 && currentWidth < 600) ? currentBreakpoint = 'xs'
    : (currentWidth >= 600 && currentWidth < 959) ? currentBreakpoint = 'sm'
    : (currentWidth >= 960 && currentWidth < 1279) ? currentBreakpoint = 'md'
    : (currentWidth >= 1280 && currentWidth < 1919) ? currentBreakpoint = 'lg'
    : currentBreakpoint = 'xl'

    return currentBreakpoint
}
