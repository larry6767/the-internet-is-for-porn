export const muiStyles = theme => ({
    labelRoot: {
        minWidth: 'auto'
    },
    label: {
        textTransform: 'none',
        fontSize: 14,

        [theme.breakpoints.down("md")]: {
            fontSize: '12px',
        },
    }
})
