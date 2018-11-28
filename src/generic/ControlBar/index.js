import React, {Fragment} from 'react'
import queryString from 'query-string'
import {withStyles} from '@material-ui/core/styles'
import {
    Typography,
    Button,
    Select,
    MenuItem,
    OutlinedInput,
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {
    Wrapper,
    ControlButtons,
    ButtonsList,
    SortWrapper,
    InlinedSelectionWrap,
    InlinedSelectionList,
    InlinedSelectionItem,
} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    SortSelectMaterial = ({
        classes,
        search,
        sortList,
        chooseSort,
        currentSort,
    }) => <Select
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

    SortSelectInlined = ({
        sortList,
        pageUrl,
        search,
    }) => <InlinedSelectionWrap>
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

    WrappedButton = ({
        classes,
        link,
        text
    }) => <Link
        to={link}
        className={classes.link}
    >
        <Button
            variant="outlined"
            color="primary"
            classes={{
                root: classes.buttonRoot
            }}
        >
            {text}
        </Button>
    </Link>,

    NicheControlBar = ({
        classes,
        pageUrl,
        search,
        isSSR,
        chooseSort,
        buttonsElements,
        sortList,
        currentSort,
        archiveFilms,
    }) => <Fragment>
        <ButtonsList>
            {buttonsElements}
        </ButtonsList>
        <WrappedButton
            classes={classes}
            link={`${pageUrl}/archive/${archiveFilms.get('monthForLink')}`}
            text="Archive films"
        />
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
    </Fragment>,

    ArchiveControlBar = ({
        classes,
        currentNiche,
        buttonsElements,
        tagArchiveListOlder,
        tagArchiveListNewer,
    }) => <Fragment>
        {tagArchiveListOlder.size
            ? <WrappedButton
                classes={classes}
                link={`/all-niches/${currentNiche}/archive/${
                    tagArchiveListOlder.get('year')}-${tagArchiveListOlder.get('month')}`}
                text="previous month"
            /> : null
        }
        <ButtonsList>
            {buttonsElements}
        </ButtonsList>
        {tagArchiveListNewer.size
            ? <WrappedButton
                classes={classes}
                link={`/all-niches/${currentNiche}/archive/${
                    tagArchiveListNewer.get('year')}-${tagArchiveListNewer.get('month')}`}
                text="next month"
            />
            : null
        }

        <WrappedButton
            classes={classes}
            link={`/all-niches/${currentNiche}`}
            text="Top Films"
        />
    </Fragment>,

    ShowedElements = ({itemsCount, pageNumber}) => <Typography variant="body1" gutterBottom>
        {`Showing ${itemsCount * pageNumber - (itemsCount - 1)} - ${itemsCount * pageNumber}`}
    </Typography>,

    ControlBar = ({
        classes,
        pageUrl,
        search,
        isSSR,
        chooseSort,
        currentNiche,
        pagesCount,
        pageNumber,
        itemsCount,
        sortList,
        currentSort,
        archiveFilms,
        tagArchiveListOlder,
        tagArchiveListNewer,
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
            <ControlButtons>
                {archiveFilms.get('current') !== 0
                    ? <ArchiveControlBar
                        classes={classes}
                        currentNiche={currentNiche}
                        buttonsElements={buttonsElements}
                        tagArchiveListOlder={tagArchiveListOlder}
                        tagArchiveListNewer={tagArchiveListNewer}
                    />
                    : <NicheControlBar
                        classes={classes}
                        pageUrl={pageUrl}
                        search={search}
                        isSSR={isSSR}
                        chooseSort={chooseSort}
                        buttonsElements={buttonsElements}
                        sortList={sortList}
                        currentSort={currentSort}
                        archiveFilms={archiveFilms}
                    />
                }
            </ControlButtons>
            <ShowedElements
                itemsCount={itemsCount}
                pageNumber={pageNumber}
            />
        </Wrapper>
    }

export default withStyles(muiStyles)(ControlBar)
