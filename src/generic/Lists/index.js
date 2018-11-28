import React from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {
    ListSubheader,
    List as ListComponent,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'
import ArrowRight from '@material-ui/icons/ChevronRight'
import {
    ListsInner
} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    // Generic list item component generator
    renderListItem = (idKey, titleKey, countKey, subPage, year, monthNumber) => (x, classes, pageUrl) => <Link
        to={x.get(subPage)
            ? `/all-niches/${x.get(subPage)}`
            : `${pageUrl}/${year && monthNumber ? `archive/${x.get(year)}-${x.get(monthNumber)}` : ''}`
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
    ArchiveYearListItem = renderListItem('archiveDate', 'month', 'itemsCount', 'subPage', 'year', 'monthNumber'),

    ArchiveList = ({classes, tagArchiveList, pageUrl}) => {
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
                            {`Archives ${year}`}
                        </ListSubheader>
                        {listByYear.map(x => ArchiveYearListItem(x, classes, pageUrl))}
                    </ul>
                </li>
            ).toList()}
        </ListComponent>
    },

    Lists = ({classes, pageUrl, tagList, tagArchiveList}) => <ListsInner>
        <ListComponent
            component="nav"
            subheader={
                <ListSubheader classes={{
                    root: classes.listSubheader
                }}>
                    All straight films
                </ListSubheader>
            }
        >
            {tagList.map(x => NichesListItem(x, classes))}
        </ListComponent>
        <ArchiveList
            classes={classes}
            tagArchiveList={tagArchiveList}
            pageUrl={pageUrl}
        />
    </ListsInner>

export default withStyles(muiStyles)(Lists)
