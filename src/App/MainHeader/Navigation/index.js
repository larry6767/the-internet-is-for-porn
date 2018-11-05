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

    Navigation = ({classes, ui, toggleNavigationAction}) => <div className={css.navigation}>
        <Tabs
            value={ui.get('currentPage')}
            onChange={toggleNavigationAction}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="off"
        >
            {
                navigation.map(item => {
                    return <Tab
                        key={item}
                        label={item}
                        classes={{
                            root: classes.labelRoot,
                            label: classes.label
                        }}
                    />
                })
            }
        </Tabs>
    </div>

export default compose(
    connect(
        state => ({
            ui: state.getIn(['app', 'mainHeader', 'navigation', 'ui'])
        }),
        dispatch => ({
            toggleNavigationAction: (event, value) => dispatch(toggleNavigation(value))
        })
    ),
    withStyles(styles)
)(Navigation)
