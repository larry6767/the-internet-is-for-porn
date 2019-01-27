import React from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import ArrowRight from '@material-ui/icons/ChevronRight'

import {
    ListSubheader,
    List as ListComponent,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'

import {ListsInner} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    // Generic list item component generator
    renderListItem =
        (idKey, titleKey, countKey, subPage, year, month) =>
        (x, classes, linkBuilder) =>
        <Link
            to={
                year && month
                ? linkBuilder(x.get(year), x.get(month)) // archive links
                : linkBuilder(x.get(subPage)) // niche link
            }
            key={x.get(idKey)}
            className={classes.routerLink}
        >
            <ListItem
                button
                classes={{
                    root: classes.itemRoot
                }}
            >
                <ListItemIcon classes={{
                    root: classes.iconRoot
                }}>
                    <ArrowRight/>
                </ListItemIcon>
                <ListItemText
                    inset
                    primary={x.get(titleKey)}
                    secondary={x.get(countKey)}
                    classes={{
                        root: classes.itemTextRoot,
                        primary: classes.primaryTypography
                    }}
                />
            </ListItem>
        </Link>,

    NichesListItem = renderListItem('id', 'name', 'itemsCount', 'subPage'),

    ArchiveYearListItem =
        renderListItem('archiveDate', 'month', 'itemsCount', 'subPage', 'year', 'monthNumber'),

    ModelsLetterListItem = renderListItem('id', 'name', 'itemsCount', 'subPage', 'letter'),

    ArchiveList = ({classes, tagArchiveList, linkBuilder, i18nListArchiveHeader}) => {
        const
            years = tagArchiveList
                .groupBy(x => x.get('year'))
                .sortBy((v, year) => year, (a, b) => a < b ? 1 : -1)
                .map(x => x.sortBy(y => y.get('archiveDate')))

        return <ListComponent component="nav" subheader={<li/>}>
            {years.map((listByYear, year) =>
                <li
                    key={`section-${year}`}
                    className={classes.listSection}
                >
                    <ul className={classes.ul}>
                        <ListSubheader classes={{
                            root: classes.listSubheader
                        }}>
                            {`${i18nListArchiveHeader} ${year}`}
                        </ListSubheader>
                        {listByYear.map(x => ArchiveYearListItem(x, classes, linkBuilder))}
                    </ul>
                </li>
            ).toList()}
        </ListComponent>
    },

    ModelsList = ({classes, modelsList, linkBuilder}) => {
        const
            letters = modelsList
                .groupBy(x => x.get('letter'))
                .sortBy((v, year) => year, (a, b) => a < b ? 1 : -1)
                .reverse()
                .map(x => x.sortBy(y => y.get('name')))

        return <ListComponent component="nav" subheader={<li/>}>
            {letters.map((listByYear, letter) =>
                <li
                    key={`section-${letter}`}
                    className={classes.listSection}
                >
                    <ul className={classes.ul}>
                        <ListSubheader classes={{
                            root: classes.listSubheader
                        }}>
                            {`${letter}`}
                        </ListSubheader>
                        {listByYear.map(x => ModelsLetterListItem(x, classes, linkBuilder))}
                    </ul>
                </li>
            ).toList()}
        </ListComponent>
    },

    Lists = ({
        classes,
        currentBreakpoint,

        tagList,
        tagLinkBuilder,

        tagArchiveList,
        archiveLinkBuilder,

        modelsList,
        modelLinkBuilder,

        i18nListNichesHeader,
        i18nListArchiveHeader,
    }) =>
        currentBreakpoint === 'md'
        || currentBreakpoint === 'lg'
        || currentBreakpoint === 'XL'
            ? <ListsInner>
                { tagList ? <ListComponent
                    component="nav"
                    subheader={
                        <ListSubheader classes={{
                            root: classes.listSubheader
                        }}>
                            {i18nListNichesHeader}
                        </ListSubheader>
                    }
                >
                    {tagList.map(x => NichesListItem(x, classes, tagLinkBuilder))}
                </ListComponent> : null }

                { tagArchiveList ? <ArchiveList
                    classes={classes}
                    tagArchiveList={tagArchiveList}
                    linkBuilder={archiveLinkBuilder}
                    i18nListArchiveHeader={i18nListArchiveHeader}
                /> : null }
                { modelsList ? <ModelsList
                    classes={classes}
                    modelsList={modelsList}
                    linkBuilder={modelLinkBuilder}
                /> : null }
            </ListsInner> : null

export default withStyles(muiStyles)(Lists)
