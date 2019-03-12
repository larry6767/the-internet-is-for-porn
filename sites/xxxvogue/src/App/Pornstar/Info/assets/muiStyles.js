export const muiStyles = theme => ({
    typographyBold: {
        fontWeight: 'bold',
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
    },
    buttonMore: {
        width: '100%',
        textTransform: 'none',
        padding: '4px 16px',
        minHeight: 26,
    },
    tableCellRoot: {
        width: '30%',
    },
    toolbar: {
        minHeight: 'auto',
        padding: 0,
    },
    tableButton: {
        width: '100%',
        borderRadius: '0 0 4px 4px',
        [theme.breakpoints.down("xs")]: {
            fontSize: '0.75rem',
        },
    }
})
