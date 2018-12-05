export const muiStyles = theme => ({
    typography: {
        color: theme.palette.primary.contrastText
    },
    typographyTitle: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        cursor: 'help',
    },
    typographyTags: {
        cursor: 'help',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    typographySource: {
        marginRight: 10,
    },
    favoriteIcon: {
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
        '&:hover': {
            color: 'red',
            width: '1.1em',
            height: '1.1em',
            position: 'relative',
            top: '-0.05em',
            left: '-0.05em',
        }
    }
})
