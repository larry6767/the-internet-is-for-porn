import {immutableProvedGet as ig} from '../../helpers'

export const muiStyles = (theme, {data, cb}) => {
    const
        pornstarsList = ig(data, 'pornstarsList')

    return {
        listComponentRoot: {
            width: ig(data, 'isLoading') ? 'auto' : '100%',
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateRows:
                cb === 'md'
                    ? `repeat(${Math.ceil(pornstarsList.size / 4)}, 1fr)`
                    : cb === 'sm'
                    ? `repeat(${Math.ceil(pornstarsList.size / 3)}, 1fr)`
                    : cb === 'xs'
                    ? `repeat(${Math.ceil(pornstarsList.size / 2)}, 1fr)`
                    : cb === 'xxs'
                    ? `repeat(${Math.ceil(pornstarsList.size / 1)}, 1fr)`
                    : `repeat(${Math.ceil(pornstarsList.size / 5)}, 1fr)`,
        },
        listItemTextRoot: {
            paddingLeft: 0,
            paddingRight: 0,
            display: cb === 'xxs'
                ? 'flex'
                : 'block',
            alignItems: 'center',
        },
        primaryTypography: {
            fontSize: 14,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            marginRight: cb === 'xxs'
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
        nicheTitleTypography: {
            marginLeft: 3,
        }
    }
}
