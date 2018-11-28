import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Tabs, Tab} from '@material-ui/core'
import {navigation} from './fixtures'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import actions from './actions'
import {Nav} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    Navigation = ({classes, pathname, goToPath}) => {
        // checking if we're on exact page or on nested child one.
        // main page supposed to be excluded from nested children pages check
        // (every page is child relative to main page `/`), so by adding another slash in second
        // condition we're just broking it (`//...` will never be the case, it's already done).
        const value =
            Object.keys(navigation).find(x => x === pathname || pathname.indexOf(`${x}/`) === 0)

        return <Nav>
            <Tabs
                value={value}
                onChange={goToPath}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="off"
            >
                {Object.keys(navigation).map((item, index) =>
                    /* WARNING! <a> with `href` attribute is important to give bare links to SSR */
                    <Tab
                        key={index}
                        href={item}
                        value={item}
                        label={navigation[`${item}`]}
                        classes={{
                            root: classes.labelRoot,
                            label: classes.label
                        }}
                    />
                )}
            </Tabs>
        </Nav>
    }

export default compose(
    connect(
        state => ({
            pathname: state.getIn(['router', 'location', 'pathname'])
        }),
        dispatch => ({
            goToPath: (event, value) => {
                event.preventDefault()
                dispatch(actions.setNewPath(value))
            }
        })
    ),
    withStyles(muiStyles)
)(Navigation)
