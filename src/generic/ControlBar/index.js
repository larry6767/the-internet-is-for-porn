import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {pick, map} from 'lodash'
import {
    Typography,
    Button,
    Select,
    MenuItem,
    OutlinedInput
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {
    Wrapper,
    ButtonsList,
    SortWrapper
} from './assets'

const
    styles = {
        link: {
            textDecoration: 'none'
        },
        paginationButtonRoot: {
            padding: 8,
            minWidth: 36,
            marginRight: 5
        },
        buttonRoot: {
            margin: '0 15px'
        },
        typographyRoot: {
            marginRight: 15
        },
        menuItemRoot: {
            display: 'flex'
        },
        selectRoot: {
            paddingTop: 9,
            paddingBottom: 9,
            display: 'flex',
            alignItems: 'center'
        },
        notchedOutlineRoot: {
            border: 'none'
        }
    },

    ControlBar = ({classes, pagesCount, pageUrl, pageNumber, sortList = [1,2,3]}) => {
        const
            array = Array.from(Array(pagesCount).keys()),
            buttonsElements = array.map((x, idx) => {
                return <Link
                    key={idx + 1}
                    to={idx === 0 ? pageUrl : `${pageUrl}-${idx}`}
                    className={classes.link}
                >
                    <Button
                        classes={{
                            root: classes.paginationButtonRoot
                        }}
                        variant={(idx + 1 === pageNumber) ? 'contained' : 'outlined'}
                        color="primary"
                    >
                        {idx + 1}
                    </Button>
                </Link>
            })

        return <Wrapper>
            <ButtonsList>
                {buttonsElements}
            </ButtonsList>
            <Button
                variant="outlined"
                color="primary"
                classes={{
                    root: classes.buttonRoot
                }}
            >
                Archive films
            </Button>
            <SortWrapper>
                <Typography
                    variant="body1"
                    gutterBottom
                    classes={{
                        root: classes.typographyRoot
                    }}
                >
                    sort:
                </Typography>
                <Select
                    classes={{
                        select: classes.selectRoot
                    }}
                    value={Object.keys(sortList)[0]}
                    input={
                        <OutlinedInput
                            onChange={console.log(0)}
                            labelWidth={0}
                            name="sort"
                            id="sort"
                        />
                    }
                >
                    {Object.keys(sortList).map((x, idx) =>
                        <MenuItem
                            key={idx}
                            classes={{
                                root: classes.menuItemRoot
                            }}
                            value={x}
                        >
                            {x}
                        </MenuItem>
                    )}
                </Select>
            </SortWrapper>
        </Wrapper>
    }

export default withStyles(styles)(ControlBar)
