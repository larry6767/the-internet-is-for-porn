import React from 'react'
import {compose, onlyUpdateForKeys, withPropsOnChange} from 'recompose'
import {withStyles} from '@material-ui/core/styles'
import ArrowRight from '@material-ui/icons/ChevronRight'

import ListSubheader from '@material-ui/core/ListSubheader'
import ListComponent from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import {
    PropTypes,
    ImmutablePropTypes,
    setPropTypes,
    breakpoints,
    breakpointSM as sm,
    plainProvedGet as g,
    compareCurrentBreakpoint as ccb,
} from '../../App/helpers'

import {
    immutableNichesListModel,
    immutableTagArchiveListModel,
    immutableModelsListWithLetterModel
} from '../../App/models'
import {ListsInner, StyledLink, Section, SectionInner} from './assets'
import {muiStyles} from './assets/muiStyles'

const
    // Generic list item component generator
    renderItem = (isSponsor, idKey, titleKey, countKey, subPage, year, month) =>
        (x, classedBounds, linkBuilder) => <StyledLink
            to={
                isSponsor
                ? linkBuilder(x.toLowerCase())
                : year && month
                ? linkBuilder(x.get(year), x.get(month)) // archive links
                : linkBuilder(x.get(subPage)) // niche link
            }
            key={isSponsor ? x : x.get(idKey)}
        >
            <ListItem button classes={g(classedBounds, 'item')}>
                <ListItemIcon classes={g(classedBounds, 'icon')}>
                    <ArrowRight/>
                </ListItemIcon>
                <ListItemText
                    inset
                    primary={isSponsor ? x : x.get(titleKey)}
                    secondary={isSponsor ? null : x.get(countKey)}
                    classes={g(classedBounds, 'listItemText')}
                />
            </ListItem>
        </StyledLink>,

    SponsorsListItem = renderItem(true),

    NichesListItem = renderItem(false, 'id', 'name', 'itemsCount', 'subPage'),

    ArchiveYearListItem =
        renderItem(false, 'archiveDate', 'month', 'itemsCount', 'subPage', 'year', 'monthNumber'),

    ModelsLetterListItem = renderItem(false, 'id', 'name', 'itemsCount', 'subPage', 'letter'),

    ArchiveList = ({classedBounds, tagArchiveList, linkBuilder, i18nListArchiveHeader}) => {
        const
            years = tagArchiveList
                .groupBy(x => x.get('year'))
                .sortBy((v, year) => year, (a, b) => a < b ? 1 : -1)
                .map(x => x.sortBy(y => y.get('archiveDate')))

        return <ListComponent component="nav" subheader={<li/>}>
            {years.map((listByYear, year) =>
                <Section key={`section-${year}`}>
                    <SectionInner>
                        <ListSubheader classes={g(classedBounds, 'listSubheader')}>
                            {`${i18nListArchiveHeader} ${year}`}
                        </ListSubheader>
                        {listByYear.map(x => ArchiveYearListItem(x, classedBounds, linkBuilder))}
                    </SectionInner>
                </Section>
            ).toList()}
        </ListComponent>
    },

    ModelsList = ({classedBounds, modelsList, linkBuilder}) => {
        const
            letters = modelsList
                .groupBy(x => x.get('letter'))
                .sortBy((v, year) => year, (a, b) => a < b ? 1 : -1)
                .reverse()
                .map(x => x.sortBy(y => y.get('name')))

        return <ListComponent component="nav" subheader={<li/>}>
            {letters.map((listByYear, letter) =>
                <Section key={`section-${letter}`}>
                    <SectionInner>
                        <ListSubheader classes={g(classedBounds, 'listSubheader')}>
                            {`${letter}`}
                        </ListSubheader>
                        {listByYear.map(x => ModelsLetterListItem(x, classedBounds, linkBuilder))}
                    </SectionInner>
                </Section>
            ).toList()}
        </ListComponent>
    },

    Lists = ({
        classedBounds,
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
                        <ListSubheader classes={g(classedBounds, 'listSubheader')}>
                            {i18nListArchiveHeader}
                        </ListSubheader>
                    }
                >
                    {sponsorsList.map(x => SponsorsListItem(x, classedBounds, sponsorLinkBuilder))}
                </ListComponent> : null }

                { tagList ? <ListComponent
                    component="nav"
                    subheader={
                        <ListSubheader classes={g(classedBounds, 'listSubheader')}>
                            {i18nListNichesHeader}
                        </ListSubheader>
                    }
                >
                    {tagList.map(x => NichesListItem(x, classedBounds, tagLinkBuilder))}
                </ListComponent> : null }

                { tagArchiveList ? <ArchiveList
                    classedBounds={classedBounds}
                    tagArchiveList={tagArchiveList}
                    linkBuilder={archiveLinkBuilder}
                    i18nListArchiveHeader={i18nListArchiveHeader}
                /> : null }
                { modelsList ? <ModelsList
                    classedBounds={classedBounds}
                    modelsList={modelsList}
                    linkBuilder={modelLinkBuilder}
                /> : null }
            </ListsInner> : null

export default compose(
    onlyUpdateForKeys([]),
    withStyles(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            listSubheader: Object.freeze({root: g(props, 'classes', 'listSubheader')}),
            item: Object.freeze({root: g(props, 'classes', 'itemRoot')}),
            icon: Object.freeze({root: g(props, 'classes', 'iconRoot')}),
            listItemText: Object.freeze({
                root: g(props, 'classes', 'itemTextRoot'),
                primary: g(props, 'classes', 'primaryTypography'),
            })
        }),
    })),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            listSubheader: PropTypes.string,
            itemRoot:PropTypes.string,
            iconRoot: PropTypes.string,
            itemTextRoot: PropTypes.string,
            primaryTypography: PropTypes.string,
        }),
        classedBounds: PropTypes.exact({
            listSubheader: PropTypes.object,
            item: PropTypes.object,
            icon: PropTypes.object,
            listItemText: PropTypes.object,
        }),

        cb: PropTypes.oneOf(breakpoints),
        maxHeight: PropTypes.nullable(PropTypes.number),

        sponsorsList: ImmutablePropTypes.listOf(PropTypes.string).isOptional,
        sponsorLinkBuilder: PropTypes.func.isOptional,

        tagList: immutableNichesListModel.isOptional,
        tagLinkBuilder: PropTypes.func.isOptional,

        tagArchiveList: immutableTagArchiveListModel.isOptional,
        archiveLinkBuilder: PropTypes.func.isOptional,

        modelsList: immutableModelsListWithLetterModel.isOptional,
        modelLinkBuilder: PropTypes.func.isOptional,

        i18nListNichesHeader: PropTypes.string.isOptional,
        i18nListArchiveHeader: PropTypes.string.isOptional,
    })
)(Lists)
