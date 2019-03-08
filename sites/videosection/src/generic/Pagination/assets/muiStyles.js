export const muiStyles = theme => ({
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
})
