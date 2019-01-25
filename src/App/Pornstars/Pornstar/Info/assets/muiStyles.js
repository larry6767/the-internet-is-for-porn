export const muiStyles = theme => ({
    typography: {
        color: theme.palette.primary.contrastText
    },
    typographyTitle: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
    },
    favoriteBorderIcon: {
        color: theme.palette.primary.dark,
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        marginRight: 2,
        '&:hover': {
            color: theme.palette.error.main,
            width: '1.1em',
            height: '1.1em',
        }
    },
    favoriteIcon: {
        color: theme.palette.error.main,
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        marginRight: 2,
        '&:hover': {
            width: '1.1em',
            height: '1.1em',
        }
    },
    buttonMore: {
        width: '100%',
        textTransform: 'none',
        padding: '4px 16px',
        minHeight: 26,
    },
    tableCellRoot: {
        width: '30%',
    }
})
