import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Tabs, Tab} from '@material-ui/core'
import {navigation} from './fixtures'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import actions from './actions'
import {Nav} from './assets'

const
    styles = {
        labelRoot: {
            minWidth: 'auto'
        },
        label: {
            textTransform: 'none',
            fontSize: 14
        }
    },

    Navigation = ({classes, location, setNewPathAction}) => <Nav>
        <Tabs
            value={Object.keys(navigation).indexOf(location.get('pathname'))}
            onChange={setNewPathAction}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="off"
        >
            {
                Object.keys(navigation).map((item, index) => {
                    return <Tab
                        key={index}
                        label={navigation[`${item}`]}
                        classes={{
                            root: classes.labelRoot,
                            label: classes.label
                        }}
                    />
                })
            }
        </Tabs>
    </Nav>

export default compose(
    connect(
        state => ({
            location: state.getIn(['router', 'location'])
        }),
        dispatch => ({
            setNewPathAction: (event, value) => dispatch(actions.setNewPath(value))
        })
    ),
    withStyles(styles)
)(Navigation)
