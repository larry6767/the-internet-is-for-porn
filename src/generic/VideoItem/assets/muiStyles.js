export const muiStyles = theme => ({
    routerLink: {
        textDecoration: 'none',
    },
    typography: {
        color: theme.palette.primary.contrastText,
    },
    typographyTitle: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        cursor: 'help',
    },
    typographyTags: {
        cursor: 'help',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    typographySource: {
        marginRight: 10,
    },
    favoriteBorderIcon: {
        color: theme.palette.primary.contrastText,
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
