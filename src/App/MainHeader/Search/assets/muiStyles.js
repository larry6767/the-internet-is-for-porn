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
        background: '#363a44',
        backgroundImage: 'url(/img/search.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 15px center',
        backgroundSize: '25px',
        display: 'block',
        padding: '15px 60px 15px 20px',
        transition: 'background-image 0.3s',
        color: '#ffffff'
    }
})
