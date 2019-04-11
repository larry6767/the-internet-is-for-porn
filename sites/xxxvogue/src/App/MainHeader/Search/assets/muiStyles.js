export const muiStyles = theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 3,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    input: {
        width: '100%',
        alignItems: 'center',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: theme.palette.primary.lightOpacity,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 15px center',
        backgroundSize: '25px',
        display: 'block',
        padding: '15px 50px 15px 15px',
        color: '#ffffff',
        transition: 'background-color 0.3s',
        fontSize: 14,

        '&::placeholder': {
            opacity: 0.6,
        },

        '&:focus': {
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.dark,
        },

        [theme.breakpoints.down("md")]: {
            fontSize: '12px',
        },

        [theme.breakpoints.down("xs")]: {
            padding: '8px 40px 8px 10px',
            backgroundSize: '20px',
            backgroundPosition: 'right 10px center',
        },
    },
    searchIcon: {
        width: 24,
        height: 24,
        color: theme.palette.primary.contrastText,
    },
    searchIconFocused: {
        width: 24,
        height: 24,
        color: theme.palette.primary.light,
    },
})
