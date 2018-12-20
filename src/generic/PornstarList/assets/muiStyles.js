export const muiStyles = theme => ({
    routerLink: {
        display: 'inline-block',
        textDecoration: 'none',
        width: '100%',
        height: '100%',
    },
    typography: {
        color: theme.palette.primary.contrastText
    },
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
    },
    favoriteBorderIcon: {
        color: theme.palette.primary.dark,
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        marginRight: 2,
        '&:hover': {
            color: 'red',
            width: '1.1em',
            height: '1.1em',
        }
    },
    favoriteIcon: {
        color: 'red',
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        marginRight: 2,
        '&:hover': {
            width: '1.1em',
            height: '1.1em',
        }
    }
})
