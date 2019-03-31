export const muiStyles = theme => ({
    typographyTitle: {
        margin: '4px 2px 0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
    },
    typographyQuantity: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
        color: theme.palette.primary.lightText,
    },
    favoriteBorderIcon: {
        color: theme.palette.primary.contrastText,
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        marginLeft: 1,
        '&:hover': {
            color: theme.palette.error.main,
            width: '1.1em',
            height: '1.1em',
        }
    },
    favoriteIcon: {
        color: theme.palette.error.main,
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        marginLeft: 1,
        '&:hover': {
            width: '1.1em',
            height: '1.1em',
        }
    }
})
