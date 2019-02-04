import {range} from 'lodash'
import React from 'react'
import {Link} from 'react-router-dom'
import {compose, withState, lifecycle, withHandlers} from 'recompose'
import {withStyles} from '@material-ui/core/styles'

import {Button} from '@material-ui/core'

import {
    plainProvedGet as g,
    PropTypes,
    setPropTypes,
    compareCurrentBreakpoint as ccb,
    breakpointSM as sm,
    breakpoints,
} from '../../App/helpers'

import WrappedButton from '../WrappedButton'
import {muiStyles} from './assets/muiStyles'
import {
    ButtonsListWrapper,
    ButtonsList,
} from './assets'

const
    Pagination = ({
        classes, cb, pageNumber, pagesCount, linkBuilder,
        setButtonRef, setWrapperRef
    }) => {
        const
            // pagination
            buttonsElements = range(1, pagesCount + 1).map(n =>
                <Link
                    key={n}
                    to={linkBuilder({pagination: n})}
                    className={g(classes, 'paginationLink')}
                >
                    <Button
                        buttonRef={ccb(cb, sm) === -1 && n === pageNumber
                            ? g(setButtonRef, []) : null}
                        classes={{
                            root: g(classes, 'paginationButtonRoot'),
                        }}
                        variant={n === pageNumber ? 'contained' : 'outlined'}
                        color="primary"
                    >
                        {n}
                    </Button>
                </Link>
            )

        return <ButtonsListWrapper>
            {ccb(cb, sm) === -1 && pageNumber !== 1
                ? <WrappedButton
                    link={linkBuilder({pagination: pageNumber - 1})}
                    text={'prev'}
                />
                : null}

            <ButtonsList ref={ccb(cb, sm) === -1 ? g(setWrapperRef, []) : null}>
                {buttonsElements}
            </ButtonsList>

            {ccb(cb, sm) === -1 && pageNumber !== pagesCount
                ? <WrappedButton
                    link={linkBuilder({pagination: pageNumber + 1})}
                    text={'next'}
                    marginRight0={true}
                />
                : null}
        </ButtonsListWrapper>
    }

export default compose(
    withState('buttonRef', 'setButtonRef', null),
    withState('wrapperRef', 'setWrapperRef', null),
    withHandlers({
        scrollToCurrentPageButton: props => () => {
            const
                buttonOffset = g(props, 'buttonRef', 'offsetLeft'),
                wrapperOffset = g(props, 'wrapperRef', 'offsetLeft')

            g(props, 'wrapperRef').scrollTo(buttonOffset - wrapperOffset, 0)
        }
    }),
    lifecycle({
        componentDidUpdate(prevProps) {
            if (ccb(g(this.props, 'cb'), sm) === -1 && g(this.props, 'buttonRef') !== null)
                this.props.scrollToCurrentPageButton()
        },
    }),
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.shape({
            paginationButtonRoot: PropTypes.string,
            paginationLink: PropTypes.string,
        }),
        cb: PropTypes.oneOf(breakpoints),
        pageNumber: PropTypes.number,
        pagesCount: PropTypes.number,
        buttonRef: PropTypes.nullable(PropTypes.object),
        wrapperRef: PropTypes.nullable(PropTypes.object),

        linkBuilder: PropTypes.func,
        setButtonRef: PropTypes.func,
        setWrapperRef: PropTypes.func,
    }),
)(Pagination)
