export const muiStyles = theme => ({
    paperRoot: {
        [theme.breakpoints.down("xs")]: {
            marginLeft: 10,
            marginRight: 10,
        },
    },
    dialogTitleRoot: {
        [theme.breakpoints.down("xs")]: {
            paddingLeft: 10,
            paddingRight: 10,
        },
    },
    dialogContentRoot: {
        [theme.breakpoints.down("xs")]: {
            paddingLeft: 10,
            paddingRight: 10,
        },
    },
    typographyTitle: {
        width: '100%',
        marginBottom: 10,
    },
    tableCellRoot: {
        width: '150px',
        paddingRight: 25,
    },
    formLabelRoot: {
        [theme.breakpoints.down("xs")]: {
            fontSize: '0.875rem',
        },
    },
    formControl: {
        margin: `20px 10px`,
        width: '100%',
    },
    radioGroup: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateRows: 'repeat(5, 1fr)',
    },
    dialogSuccessText: {
        marginTop: 80,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.palette.success.dark,
    },
    dialogFailureText: {
        marginTop: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.palette.error.main,
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
})
