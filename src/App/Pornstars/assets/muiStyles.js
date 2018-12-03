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
    },
    favoriteIcon: {
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        color: theme.palette.primary.dark,
        '&:hover': {
            color: 'red',
            width: '1.1em',
            height: '1.1em',
            position: 'relative',
            top: '-0.05em',
            left: '-0.05em',
        }
    }
})
