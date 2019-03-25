import theme from 'src/App/assets/theme'
import {createMuiTheme} from '@material-ui/core/styles'

const
    preMuiTheme = createMuiTheme({
        typography: {
            useNextVariants: true, // just for get rid of warning
        },
    }),
    muiTheme = createMuiTheme({
        palette: {
            primary: {...theme.palette.primary},
            secondary: {...theme.palette.secondary},
            error: {...theme.palette.error},
            success: {...theme.palette.success},
            prerender: {...theme.palette.prerender},
        },
        typography: {
            useNextVariants: true,
            fontFamily: [
                'Montserrat',
                'Arial',
                'Helvetica',
                'sans-serif',
              ].join(','),
        },
        overrides: {
            MuiTypography: {
                h4: {
                    fontSize: '1.25rem',
                    textAlign: 'center',
                    fontWeight: 'bold',

                    [preMuiTheme.breakpoints.only("sm")]: {
                        fontSize: '1.25rem',
                    },

                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '1rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    },
                },
                h6: {
                    [preMuiTheme.breakpoints.only("sm")]: {
                        fontSize: '1.25rem',
                    },

                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '1rem',
                    },
                },
                subtitle1: {
                    [preMuiTheme.breakpoints.only("sm")]: {
                        fontSize: '0.875rem',
                    },

                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '0.875rem',
                    },
                },
                body1: {
                    fontSize: '0.875rem',
                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '0.75rem',
                    },
                },
                body2: {
                    fontSize: '0.75rem',
                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '0.65rem',
                    },
                },
                caption: {
                    fontSize: '0.65rem',
                },
            },
            MuiMenuItem: {
                root: {
                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '0.75rem',
                        lineHeight: 1.5,
                        padding: '8px 13px',
                    },
                },
            },
            MuiSelect: {
                root: {
                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '0.75rem',
                        lineHeight: 1.5,
                    },
                },
            },
            MuiTableRow: {
                root: {
                    height: 40,
                },
            },
        },
    })

export default muiTheme
