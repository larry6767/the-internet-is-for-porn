import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Tabs, Tab} from '@material-ui/core'
import css from './assets/_.module.scss'
import {navigation} from './fixtures'

import {compose} from 'recompose'
import {connect} from 'react-redux'
import {toggleNavigation} from './actions'

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

    Navigation = ({classes, location, toggleNavigationAction}) => {
        return <div className={css.navigation}>
            <Tabs
                value={Object.keys(navigation).indexOf(location.get('pathname'))}
                onChange={toggleNavigationAction}
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
        </div>
    }

export default compose(
    connect(
        state => ({
            ui: state.getIn(['app', 'mainHeader', 'navigation', 'ui']),
            location: state.getIn(['router', 'location'])
        }),
        dispatch => ({
            toggleNavigationAction: (event, value) => dispatch(toggleNavigation(value))
        })
    ),
    withStyles(styles)
)(Navigation)
