import React from 'react'
import {Link} from 'react-router-dom'
import {compose} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

// local libs
import {
    plainProvedGet as g,
    PropTypes,
    setPropTypes,
} from 'src/App/helpers'

import {muiStyles} from 'src/generic/WrappedButton/assets/muiStyles'

const
    WrappedButton = ({
        classes,
        link,
        text,
        marginRight0 = false,
        variant,
    }) => <Link to={link} className={g(classes, 'link')}>
        <Button
            variant={variant ? variant : 'outlined'}
            color="primary"
            classes={{
                root: marginRight0 ? g(classes, 'buttonRootMR0') : g(classes, 'buttonRoot'),
            }}
        >
            {text}
        </Button>
    </Link>

export default compose(
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.shape({
            link: PropTypes.string,
            buttonRoot: PropTypes.string,
            buttonRootMR0: PropTypes.string,
        }),
        link: PropTypes.string,
        text: PropTypes.string,
        marginRight0: PropTypes.bool.isOptional,
        variant: PropTypes.string.isOptional,
    }),
)(WrappedButton)
