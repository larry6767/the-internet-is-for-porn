export const muiStyles = theme => ({
    typographyRoot: {
        marginRight: 15,
        color: theme.palette.primary.lightText,
    },
    selectRoot: {
        paddingTop: 9,
        paddingBottom: 9,
        display: 'flex',
        alignItems: 'center',
        paddingRight: 25,
        paddingLeft: 5,
        borderRadius: 4,

        [theme.breakpoints.down("xs")]: {
            paddingTop: 6,
            paddingBottom: 6,
        },
    },
})
