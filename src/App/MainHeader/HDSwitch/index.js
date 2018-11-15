import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import {compose} from 'recompose'
import {connect} from 'react-redux'
import actions from './actions'

const
    styles = theme => ({
        labelRoot: {
            marginRight: 0
        },
        label: {
            color: '#a1a7b1'
        },
        iOSSwitchBase: {
            '&$iOSChecked': {
                color: theme.palette.common.white,
                '& + $iOSBar': {
                    backgroundColor: '#52d869',
                },
            },
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.sharp,
            }),
        },
        iOSChecked: {
            transform: 'translateX(15px)',
            '& + $iOSBar': {
                opacity: 1,
                border: 'none',
            },
        },
        iOSBar: {
            borderRadius: 13,
            width: 42,
            height: 26,
            marginTop: -13,
            marginLeft: -21,
            border: 'solid 1px',
            borderColor: theme.palette.grey[400],
            backgroundColor: theme.palette.grey[400],
            opacity: 1,
            transition: theme.transitions.create(['background-color', 'border']),
        },
        iOSIcon: {
            width: 24,
            height: 24,
        },
        iOSIconChecked: {
            boxShadow: theme.shadows[1],
        },
    }),

    HDSwitch = ({classes, hdState, toggleHdAction}) => <FormGroup row>
        <FormControlLabel
            classes={{
                root: classes.labelRoot,
                label: classes.label
            }}
            control={
                <Switch
                    classes={{
                        root: classes.iOSRoot,
                        switchBase: classes.iOSSwitchBase,
                        bar: classes.iOSBar,
                        icon: classes.iOSIcon,
                        iconChecked: classes.iOSIconChecked,
                        checked: classes.iOSChecked,
                    }}
                    disableRipple
                    value="HD"
                    checked={hdState}
                    onChange={toggleHdAction}
                />
            }
            label="Only HD"
        />
    </FormGroup>

export default compose(
    connect(
        state => ({
            hdState: state.getIn(['app', 'mainHeader', 'HDSwitch', 'hdState'])
        }),
        dispatch => ({
            toggleHdAction: event => dispatch(actions.toggleHd(event.target.checked))
        })
    ),
    withStyles(styles)
)(HDSwitch)
