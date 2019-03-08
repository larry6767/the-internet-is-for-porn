export const muiStyles = theme => ({
    link: {
        textDecoration: 'none'
    },
    buttonRoot: {
        marginRight: 15,
        marginBottom: 12,

        [theme.breakpoints.down("xs")]: {
            fontSize: '0.75rem',
            lineHeight: 1.5,
            marginBottom: 8,
            marginRight: 8,
        },
    },
    buttonRootMR0: {
        [theme.breakpoints.down("xs")]: {
            fontSize: '0.75rem',
            lineHeight: 1.5,
            marginBottom: 8,
            marginRight: 0,
        },
    },
})
