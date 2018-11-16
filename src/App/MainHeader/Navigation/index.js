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

    Navigation = ({classes, pathname, setNewPathAction}) => {
        const value = Object.keys(navigation).reduce((target, item) => {
            return (~pathname.indexOf(item)) ? target = item : target
        }, 0)

        return <Nav>
            <Tabs
                value={value}
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
                            value={item}
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
    }

export default compose(
    connect(
        state => ({
            pathname: state.getIn(['router', 'location', 'pathname'])
        }),
        dispatch => ({
            setNewPathAction: (event, value) => dispatch(actions.setNewPath(value))
        })
    ),
    withStyles(styles)
)(Navigation)
