import React, {Fragment} from 'react'
import queryString from 'query-string'
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

    SortSelectMaterial = ({classes, search, sortList, chooseSort, currentSort}) => <Select
        classes={{
            select: classes.selectRoot
        }}
        value={currentSort}
        input={
            <OutlinedInput
                onChange={(event) => {
                    const
                        parsedQS = queryString.parse(search),
                        newSortValue = event.target.value

                    parsedQS.sort = newSortValue
                    chooseSort(newSortValue, `?${queryString.stringify(parsedQS)}`)
                }}
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

    SortSelectInlined = ({sortList, pageUrl, search}) => <InlinedSelectionWrap>
        <InlinedSelectionList>
            {sortList.map(x => {
                const parsedQS = queryString.parse(search)
                parsedQS.sort = x.get('value')
                const link = `${pageUrl}?${queryString.stringify(parsedQS)}`

                return <InlinedSelectionItem
                    key={x.get('value')}
                    href={link}
                    isActive={x.get('active')}
                >
                    {x.get('localText')}
                </InlinedSelectionItem>
            })}
        </InlinedSelectionList>
    </InlinedSelectionWrap>,

    ControlBar = ({
        classes,
        pageUrl,
        search,
        isSSR,
        chooseSort,
        pagesCount,
        pageNumber,
        sortList,
        currentSort,
        archiveFilms,
    }) => {
        const
            array = Array.from(Array(pagesCount).keys()),
            buttonsElements = array.map((x, idx) => {
                const parsedQS = queryString.parse(search)
                parsedQS.page = idx + 1
                const link = `${pageUrl}?${queryString.stringify(parsedQS)}`

                return <Link
                    key={idx + 1}
                    to={link}
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
                </Link>})

        return <Wrapper>
            {archiveFilms.get('active') === 0
                ? <Fragment>
                    <Button
                            variant="outlined"
                            color="primary"
                            classes={{
                                root: classes.buttonRoot
                            }}
                            href={`${pageUrl}/archive/${archiveFilms.get('monthForLink')}`}
                        >
                        previous month
                    </Button>
                    <ButtonsList>
                        {buttonsElements}
                    </ButtonsList>
                    <Button
                        variant="outlined"
                        color="primary"
                        classes={{
                            root: classes.buttonRoot
                        }}
                        href={`${pageUrl}/archive/${archiveFilms.get('monthForLink')}`}
                    >
                        next month
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        classes={{
                            root: classes.buttonRoot
                        }}
                        href={`${pageUrl}/archive/${archiveFilms.get('monthForLink')}`}
                    >
                        Top Films
                    </Button>
                </Fragment>
                : <Fragment>
                    <ButtonsList>
                        {buttonsElements}
                    </ButtonsList>
                    <Button
                        variant="outlined"
                        color="primary"
                        classes={{
                            root: classes.buttonRoot
                        }}
                        href={`${pageUrl}/archive/${archiveFilms.get('monthForLink')}`}
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
                                pageUrl={pageUrl}
                                search={search}
                            />
                            : <SortSelectMaterial
                                classes={classes}
                                sortList={sortList}
                                search={search}
                                chooseSort={chooseSort}
                                currentSort={currentSort}
                            />
                        }
                    </SortWrapper>
                </Fragment>
            }
        </Wrapper>
    }

export default withStyles(styles)(ControlBar)
