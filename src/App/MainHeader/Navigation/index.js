import React from 'react'
import {compose, setPropTypes} from 'recompose'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import {Tabs, Tab} from '@material-ui/core'

import {
    getValueForNavigation,
    immutableProvedGet as ig,
    plainProvedGet as g,
    PropTypes,
} from '../../helpers'

import {muiStyles} from './assets/muiStyles'
import {Nav} from './assets'
import actions from './actions'

import {navigation} from './fixtures'

const
    Navigation = ({classes, pathname, goToPath}) => {
        const value = getValueForNavigation(navigation, pathname)

        return <Nav>
            <Tabs
                value={value}
                onChange={goToPath}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="off"
            >
                {Object.keys(navigation).map((item, index) =>
                    /* WARNING! <a> with `href` attribute is important to give bare links to SSR */
                    <Tab
                        key={index}
                        href={item}
                        value={item}
                        label={g(navigation, `${item}`)}
                        classes={{
                            root: g(classes, 'labelRoot'),
                            label: g(classes, 'label'),
                        }}
                    />
                )}
            </Tabs>
        </Nav>
    }

export default compose(
    connect(
        state => ({
            pathname: ig(state, 'router', 'location', 'pathname'),
        }),
        dispatch => ({
            goToPath: (event, value) => {
                event.preventDefault()
                dispatch(actions.setNewPath(value))
            }
        })
    ),
    withStyles(muiStyles),
    setPropTypes({
        classes: PropTypes.object,
        pathname: PropTypes.string,
        goToPath: PropTypes.func,
    })
)(Navigation)
