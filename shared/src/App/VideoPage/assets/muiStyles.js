export const muiStyles = theme => ({
    typographyTitle: {
        maxWidth: '100%',
    },
    typographySponsor: {
        color: theme.palette.primary.main,
        marginBottom: 10,
    },
    buttonRoot: {
        marginBottom: 10,
        marginRight: 10,
        whiteSpace: 'nowrap',

        [theme.breakpoints.down('xs')]: {
            fontSize: 0,
            minWidth: 36,
            minHeight: 36,
            padding: '6px 6px',
        },
    },
    buttonFavorite: {
        marginBottom: 10,
        marginRight: 10,
        whiteSpace: 'nowrap',

        [theme.breakpoints.down('sm')]: {
            fontSize: 0,
            minWidth: 36,
            minHeight: 36,
            padding: '6px 6px',
        },
    },
    buttonReport: {
        marginBottom: 10,
        whiteSpace: 'nowrap',

        [theme.breakpoints.down('xs')]: {
            fontSize: 0,
            minWidth: 36,
            minHeight: 36,
            padding: '6px 6px',
        },
    },
    favoriteBorderIcon: {
        color: theme.palette.primary.contrastText,
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        marginRight: 10,
        width: '0.8em',
        height: '0.8em',

        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
        },
    },
    favoriteIcon: {
        color: theme.palette.error.main,
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        marginRight: 10,
        width: '0.8em',
        height: '0.8em',

        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
        },
    },
    reportIcon: {
        marginRight: 10,

        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
        },
    },
    homeIcon: {
        marginRight: 10,

        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
        },
    },
    chip: {
        margin: '0 16px 8px 0',
        height: 24,

        [theme.breakpoints.down('xs')]: {
            margin: '0 8px 8px 0',
        }
    },
})
