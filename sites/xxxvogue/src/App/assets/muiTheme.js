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
                    fontSize: '18px',
                    textAlign: 'center',
                    fontWeight: 'bold',

                    [preMuiTheme.breakpoints.only("md")]: {
                        fontSize: '16px',
                    },

                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '16px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    },
                },
                h6: {
                    [preMuiTheme.breakpoints.only("md")]: {
                        fontSize: '18px',
                    },

                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '16px',
                    },
                },
                subtitle1: {
                    [preMuiTheme.breakpoints.only("md")]: {
                        fontSize: '10px',
                    },

                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '10px',
                    },
                },
                body1: {
                    fontSize: '14px',
                    [preMuiTheme.breakpoints.down("md")]: {
                        fontSize: '12px',
                    },
                },
                body2: {
                    fontSize: '12px',
                    [preMuiTheme.breakpoints.down("md")]: {
                        fontSize: '10px',
                    },
                },
                caption: {
                    fontSize: '10px',
                },
            },
            MuiMenuItem: {
                root: {
                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '12px',
                        lineHeight: 1.5,
                        padding: '8px 13px',
                    },
                },
            },
            MuiSelect: {
                root: {
                    fontSize: '14px',
                    [preMuiTheme.breakpoints.down("md")]: {
                        fontSize: '12px',
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
