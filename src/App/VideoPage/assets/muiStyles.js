export const muiStyles = theme => ({
    routerLink: {
        textDecoration: 'none',
    },
    typographyTitle: {
        maxWidth: '100%',
    },
    typographySponsor: {
        color: theme.palette.primary.main,
        marginBottom: 10,
    },
    buttonRoot: {
        marginBottom: 10,

        '&:not(:last-child)': {
            marginRight: 10
        }
    },
    favoriteBorderIcon: {
        color: theme.palette.primary.contrastText,
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        marginRight: 10,
        width: '0.8em',
        height: '0.8em',
    },
    favoriteIcon: {
        color: theme.palette.error.main,
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        marginRight: 10,
        width: '0.8em',
        height: '0.8em',
    },
    chip: {
        margin: '0 16px 16px 0',
        height: 24,
    },
})
