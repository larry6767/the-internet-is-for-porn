export default (currentWidth = null) =>
    (currentWidth === null) ? 'md' // by default (for SSR also), you're free to change it
    : (currentWidth < 375) ? 'xxs'
    : (currentWidth >= 375 && currentWidth < 600) ? 'xs'
    : (currentWidth >= 600 && currentWidth < 959) ? 'sm'
    : (currentWidth >= 960 && currentWidth < 1279) ? 'md'
    : (currentWidth >= 1280 && currentWidth < 1919) ? 'lg'
    : 'xl'
