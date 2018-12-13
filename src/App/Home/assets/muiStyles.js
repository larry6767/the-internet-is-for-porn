export const muiStyles = (theme, {home, currentBreakpoint}) => {
    const
        pornstarsList = home.get('pornstarsList')

    return {
        root: {
            width: home.get('isLoading') ? 'auto' : '100%',
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateRows:
                currentBreakpoint === 'md'
                    ? `repeat(${Math.ceil(pornstarsList.size / 4)}, 1fr)`
                    : currentBreakpoint === 'sm'
                    ? `repeat(${Math.ceil(pornstarsList.size / 3)}, 1fr)`
                    : currentBreakpoint === 'xs'
                    ? `repeat(${Math.ceil(pornstarsList.size / 2)}, 1fr)`
                    : currentBreakpoint === 'xxs'
                    ? `repeat(${Math.ceil(pornstarsList.size / 1)}, 1fr)`
                    : `repeat(${Math.ceil(pornstarsList.size / 5)}, 1fr)`,
        },
        listItemTextRoot: {
            paddingLeft: 0,
            paddingRight: 0,
            display: currentBreakpoint === 'xxs'
                ? 'flex'
                : 'block',
            alignItems: 'center',
        },
        primaryTypography: {
            fontSize: 14,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            marginRight: currentBreakpoint === 'xxs'
                ? 10
                : 0
        },
        secondaryTypography: {
            fontSize: 12
        },
        itemGutters: {
            paddingLeft: 10,
            paddingRight: 10
        },
        routerLink: {
            textDecoration: 'none'
        }
    }
}
