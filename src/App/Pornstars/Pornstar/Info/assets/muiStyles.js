export const muiStyles = theme => ({
    typography: {
        color: theme.palette.primary.contrastText
    },
    typographyTitle: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '100%',
    },
    favoriteIcon: {
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        color: theme.palette.primary.dark,
        '&:hover': {
            color: 'red',
            width: '1.1em',
            height: '1.1em',
            position: 'relative',
            top: '-0.05em',
            left: '-0.05em',
        }
    },
    buttonMore: {
        width: '100%',
        textTransform: 'none',
        padding: '4px 16px',
        minHeight: 26,
    }
})
