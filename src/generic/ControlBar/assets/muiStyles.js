export const muiStyles = theme => ({
    link: {
        textDecoration: 'none'
    },
    paginationButtonRoot: {
        padding:  '5px 8px',
        minWidth: 36,
        minHeight: 36,

        [theme.breakpoints.down("xs")]: {
            fontSize: '0.75rem',
            lineHeight: 1.5,
            padding: '3px 6px',
            minWidth: 30,
            minHeight: 30,
        },
    },
    paginationLink: {
        textDecoration: 'none',
        marginRight: 5,
        '&:last-child': {
            marginRight: 0,
        }
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
    typographyRoot: {
        marginRight: 15
    },
    selectRoot: {
        paddingTop: 9,
        paddingBottom: 9,
        display: 'flex',
        alignItems: 'center',

        [theme.breakpoints.down("xs")]: {
            paddingTop: 6,
            paddingBottom: 6,
        },
    },
    notchedOutlineRoot: {
        border: 'none'
    },
})
