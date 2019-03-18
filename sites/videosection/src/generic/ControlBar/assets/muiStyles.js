export const muiStyles = theme => ({
    typographyRoot: {
        marginRight: 15
    },
    selectRoot: {
        paddingTop: 9,
        paddingBottom: 9,
        display: 'flex',
        alignItems: 'center',
        paddingRight: 25,

        [theme.breakpoints.down("xs")]: {
            paddingTop: 6,
            paddingBottom: 6,
        },
    }
})
