import React from 'react'
import {compose} from 'recompose'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import ArrowRight from '@material-ui/icons/ChevronRight'

import ListSubheader from '@material-ui/core/ListSubheader'
import ListComponent from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import {
    PropTypes,
    setPropTypes,
    breakpoints,
    breakpointSM as sm,
    compareCurrentBreakpoint as ccb,
} from '../../App/helpers'

import {ListsInner} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    // Generic list item component generator
    renderItem =
        (isSponsor, idKey, titleKey, countKey, subPage, year, month) =>
        (x, classes, linkBuilder) =>
        <Link
            to={
                isSponsor
                ? linkBuilder(x.toLowerCase())
                : year && month
                ? linkBuilder(x.get(year), x.get(month)) // archive links
                : linkBuilder(x.get(subPage)) // niche link
            }
            key={isSponsor ? x : x.get(idKey)}
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
                    primary={isSponsor ? x : x.get(titleKey)}
                    secondary={isSponsor ? null : x.get(countKey)}
                    classes={{
                        root: classes.itemTextRoot,
                        primary: classes.primaryTypography
                    }}
                />
            </ListItem>
        </Link>,

    SponsorsListItem = renderItem(true),

    NichesListItem = renderItem(false, 'id', 'name', 'itemsCount', 'subPage'),

    ArchiveYearListItem =
        renderItem(false, 'archiveDate', 'month', 'itemsCount', 'subPage', 'year', 'monthNumber'),

    ModelsLetterListItem = renderItem(false, 'id', 'name', 'itemsCount', 'subPage', 'letter'),

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
        cb,
        maxHeight,

        sponsorsList,
        sponsorLinkBuilder,

        tagList,
        tagLinkBuilder,

        tagArchiveList,
        archiveLinkBuilder,

        modelsList,
        modelLinkBuilder,

        i18nListNichesHeader,
        i18nListArchiveHeader,
    }) =>
        ccb(cb, sm) === 1
            ? <ListsInner maxHeight={maxHeight}>
                { sponsorsList ? <ListComponent
                    component="nav"
                    subheader={
                        <ListSubheader classes={{
                            root: classes.listSubheader
                        }}>
                            {i18nListArchiveHeader}
                        </ListSubheader>
                    }
                >
                    {sponsorsList.map(x => SponsorsListItem(x, classes, sponsorLinkBuilder))}
                </ListComponent> : null }

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

export default compose(
    withStyles(muiStyles),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        cb: PropTypes.oneOf(breakpoints),
    })
)(Lists)
