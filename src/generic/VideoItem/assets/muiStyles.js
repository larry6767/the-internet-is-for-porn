export const muiStyles = theme => ({
    typography: {
        color: theme.palette.primary.contrastText,
    },
    typographyTitle: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        color: theme.palette.primary.dark,
    },
    typographySource: {
        marginRight: 10,
    },
    typographySourceContrast: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 35,
        padding: '0 5px',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.lightOpacity,
    },
    favoriteBorderIcon: {
        color: theme.palette.primary.contrastText,
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
    }
})
