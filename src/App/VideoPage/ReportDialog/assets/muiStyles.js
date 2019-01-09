export const muiStyles = theme => ({
    typographyTitle: {
        width: '100%',
        marginBottom: 10,
    },
    tableCellRoot: {
        width: '150px',
        paddingRight: 25,
    },
    formControl: {
        margin: `20px 10px`,
        width: '100%',
    },
    group: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateRows: 'repeat(5, 1fr)',
    },
    dialogSuccessText: {
        marginTop: 80,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.colors.successColor,
    },
    dialogFailureText: {
        marginTop: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        color: theme.colors.failureColor,
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      }
})
