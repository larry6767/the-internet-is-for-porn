export const muiStyles = theme => ({
    routerLink: {
        textDecoration: 'none',
    },
    typographyTitle: {
        maxWidth: '100%',
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
        color: 'red',
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        marginRight: 10,
        width: '0.8em',
        height: '0.8em',
    }
})
