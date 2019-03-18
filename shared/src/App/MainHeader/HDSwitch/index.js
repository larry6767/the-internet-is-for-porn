import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

// local libs
import actions from 'src/App/MainHeader/HDSwitch/actions'
import {muiStyles} from 'src/App/MainHeader/HDSwitch/assets/muiStyles'

const
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
    withStyles(muiStyles)
)(HDSwitch)
