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
        transition: 'background-image 0.3s',
        color: '#ffffff',

        '&::placeholder': {
            opacity: 0.6,
        },

        [theme.breakpoints.down("xs")]: {
            padding: '8px 40px 8px 10px',
            backgroundSize: '20px',
            backgroundPosition: 'right 10px center',
            fontSize: '0.875rem',
        },
    },
    searchIcon: {
        width: 24,
        height: 24,
        color: theme.palette.primary.contrastText,
    },
})
