import theme from './theme'
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
        },
        typography: {
            useNextVariants: true,
        },
        overrides: {
            MuiTypography: {
                h4: {
                    fontSize: '2.125rem',

                    [preMuiTheme.breakpoints.only("sm")]: {
                        fontSize: '1.5rem',
                    },

                    [preMuiTheme.breakpoints.down("xs")]: {
                        fontSize: '1.25rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    },
                }
            }
        },
    })

export default muiTheme
