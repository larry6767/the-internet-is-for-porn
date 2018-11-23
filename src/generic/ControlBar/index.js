import React from 'react'
import {withStyles} from '@material-ui/core/styles'
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
    SortWrapper,
    InlinedSelectionWrap,
    InlinedSelectionList,
    InlinedSelectionItem,
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

    SortSelectMaterial = ({classes, sortList, chooseSort, currentSort}) => <Select
        classes={{
            select: classes.selectRoot
        }}
        value={currentSort}
        input={
            <OutlinedInput
                onChange={chooseSort}
                labelWidth={0}
                name="sort"
                id="sort"
            />
        }
    >
        {sortList.map(x =>
            <MenuItem
                key={x.get('value')}
                value={x.get('value')}
            >
                {x.get('localText')}
            </MenuItem>
        )}
    </Select>,

    SortSelectInlined = ({sortList}) => <InlinedSelectionWrap>
        <InlinedSelectionList>
            {sortList.map(x =>
                <InlinedSelectionItem
                    key={x.get('value')}
                    href={x.get('url')}
                    isActive={x.get('active')}
                >
                    {x.get('localText')}
                </InlinedSelectionItem>
            )}
        </InlinedSelectionList>
    </InlinedSelectionWrap>,

    ControlBar = ({
        classes,
        isSSR,
        pagesCount,
        pageUrl,
        pageNumber,
        sortList,
        currentSort,
        chooseSort
    }) => {
        const
            array = Array.from(Array(pagesCount).keys()),
            buttonsElements = array.map((x, idx) => <Link
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
            </Link>)

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
                {isSSR
                    ? <SortSelectInlined
                        sortList={sortList}
                    />
                    : <SortSelectMaterial
                        classes={classes}
                        sortList={sortList}
                        chooseSort={chooseSort}
                        currentSort={currentSort}
                    />
                }
            </SortWrapper>
        </Wrapper>
    }

export default withStyles(styles)(ControlBar)
