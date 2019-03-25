import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle, withHandlers, withPropsOnChange, onlyUpdateForKeys} from 'recompose'
import Typography from '@material-ui/core/Typography'

// local libs
import {
    getHeaderWithOrientation,
    withStylesProps,
    getRouterContext,
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    PropTypes,
    ImmutablePropTypes,
    getPageRequestParams,
    doesItHaveToBeReloaded,
    lazyImage,
    imagesRandomWidth,
    compareCurrentBreakpoint as ccb,
    breakpointSM as sm,
    breakpointXS as xs,
    breakpointXXS as xxs,
    breakpoints,
} from 'src/App/helpers'

import {immutableI18nOrderingModel, routerContextModel} from 'src/App/models'
import {model} from 'src/App/Home/models'
import routerGetters from 'src/App/routerGetters'
import PageTextHelmet from 'src/generic/PageTextHelmet'
import sectionPortal from 'src/App/MainHeader/Navigation/sectionPortal'
import orientationPortal from 'src/App/MainHeader/Niche/orientationPortal'
import loadingWrapper from 'src/generic/loadingWrapper'
import PornstarList from 'src/generic/PornstarList'
import {muiStyles} from 'src/App/Home/assets/muiStyles'
import actions from 'src/App/Home/actions'

import {
    PageWrapper,
    NichesList,
    Niche,
    NicheImage,
    StyledLink,
    AllPornstarsButton,
    AllPornstarsQuantity,
} from './assets'

const
    NicheWrapper = compose(
        lazyImage,
        onlyUpdateForKeys(['x', 'previewStyle'])
    )((props) => <Niche style={g(props, 'style')}>
        <StyledLink
            to={routerGetters.niche.link(
                g(props, 'routerContext'),
                ig(props.x, 'subPage'),
                null
            )}
            key={ig(props.x, 'id')}
        >
            <NicheImage ref={g(props, 'setRef')} style={g(props, 'previewStyle')}/>
            <Typography
                variant="body1"
                gutterBottom
                classes={g(props, 'classedBounds', 'nicheTitleTypography')}
            >{ig(props.x, 'name')}</Typography>
        </StyledLink>
    </Niche>),

    Home = props => <Fragment>
        <PageTextHelmet htmlLang={g(props, 'htmlLang')} pageText={ig(props.data, 'pageText')}/>
        <PageWrapper>
            <Typography variant="h4" paragraph>
                {g(props, 'i18nNichesHeader')}
            </Typography>
            {<NichesList>
                { ! g(props, 'styledBounds') ? null :
                    ig(props.data, 'nichesListWithThumb').map((x, idx) => <NicheWrapper
                        key={ig(x, 'id')}
                        x={x}
                        classedBounds={g(props, 'classedBounds')}
                        style={ig(props.styledBounds, `${idx}`)}
                        routerContext={g(props, 'routerContext')}
                    />)}
            </NichesList>}
            <Typography variant="h4" paragraph>
                {g(props, 'i18nPornstarsHeader')}
            </Typography>
            <PornstarList
                linkBuilder={g(props, 'pornstarLinkBuilder')}
                pornstarList={g(props, 'pornstarList')}
            />
            <AllPornstarsButton
                to={props.getPornstarsLink()}
            >
                {`browse all models`}
                <AllPornstarsQuantity>
                    {`(${ig(props.data, 'allPornstarsQuantity')})`}
                </AllPornstarsQuantity>
            </AllPornstarsButton>
        </PageWrapper>
    </Fragment>,

    loadPageFlow = ({data, loadPage, routerContext, match}) => {
        const
            pageRequestParams = getPageRequestParams(routerContext, match)

        if (doesItHaveToBeReloaded(data, pageRequestParams))
            loadPage(pageRequestParams)
   }

export default compose(
    orientationPortal,
    sectionPortal,
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            cb: ig(state, 'app', 'ui', 'currentBreakpoint'),
            data: ig(state, 'app', 'home'),
            routerContext: getRouterContext(state),
            htmlLang: ig(state, 'app', 'locale', 'i18n', 'htmlLangAttribute'),
            i18nOrdering: ig(state, 'app', 'locale', 'i18n', 'ordering'),
            i18nNichesHeader: getHeaderWithOrientation(state, 'niches'),
            i18nPornstarsHeader: getHeaderWithOrientation(state, 'pornstars'),
            randomWidthList: ig(state, 'app', 'home', 'randomWidthList'),
        }),
        {
            loadPageRequest: g(actions, 'loadPageRequest'),
            setRandomWidthList: g(actions, 'setRandomWidthList'),
        }
    ),
    onlyUpdateForKeys(['data', 'cb']),
    withPropsOnChange(['data', 'cb'], props => {
        const
            size = ccb(g(props, 'cb'), sm) === 0 ? 12
                : ccb(g(props, 'cb'), xs) === 0 ? 6
                : ccb(g(props, 'cb'), xxs) === 0 ? 4
                : null

        return {
            pornstarList: size
                ? ig(props.data, 'pornstarsList').setSize(size)
                : ig(props.data, 'pornstarsList')
        }
    }),
    withHandlers({
        loadPage: props => pageRequestParams => props.loadPageRequest({pageRequestParams}),

        getPornstarsLink: props => () => routerGetters.pornstars.link(g(props, 'routerContext')),

        pornstarLinkBuilder: props => child =>
            routerGetters.pornstar.link(g(props, 'routerContext'), g(child, []), null),
    }),
    lifecycle({
        componentDidMount() {
            loadPageFlow(this.props)
        },

        componentWillReceiveProps(nextProps) {
            loadPageFlow(nextProps)
        },
    }),
    withStylesProps(muiStyles),
    withPropsOnChange([], props => ({
        classedBounds: Object.freeze({
            listComponent: Object.freeze({root: g(props, 'classes', 'listComponentRoot')}),
            listItem: Object.freeze({gutters: g(props, 'classes', 'itemGutters')}),
            listItemText: Object.freeze({
                root: g(props, 'classes', 'listItemTextRoot'),
                primary: g(props, 'classes', 'primaryTypography'),
                secondary: g(props, 'classes', 'secondaryTypography'),
            }),
            nicheTitleTypography: Object.freeze({root: g(props, 'classes', 'nicheTitleTypography')}),
        }),
    })),
    withPropsOnChange(['data'], props => ({
        randomWidthListSize: g(ig(props.data, 'nichesListWithThumb'), 'size'),
    })),
    imagesRandomWidth,
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        classes: PropTypes.exact({
            listComponentRoot: PropTypes.string,
            itemGutters: PropTypes.string,
            listItemTextRoot: PropTypes.string,
            primaryTypography: PropTypes.string,
            secondaryTypography: PropTypes.string,
            nicheTitleTypography: PropTypes.string,
        }),
        classedBounds: PropTypes.exact({
            listComponent: PropTypes.object,
            listItem: PropTypes.object,
            listItemText: PropTypes.object,
            nicheTitleTypography: PropTypes.object,
        }),

        randomWidthList: PropTypes.nullable(ImmutablePropTypes.listOf(PropTypes.number)),
        randomWidthListSize: PropTypes.number,
        styledBounds: PropTypes.nullable(ImmutablePropTypes.listOf(PropTypes.exact({
            width: PropTypes.string,
        }))),

        isSSR: PropTypes.bool,
        cb: PropTypes.oneOf(breakpoints),
        data: model,
        routerContext: routerContextModel,
        htmlLang: PropTypes.string,
        i18nOrdering: immutableI18nOrderingModel,
        i18nNichesHeader: PropTypes.string,
        i18nPornstarsHeader: PropTypes.string,

        loadPageRequest: PropTypes.func,
        loadPage: PropTypes.func,
        setNewText: PropTypes.func,
        setRandomWidthList: PropTypes.func,
        pornstarLinkBuilder: PropTypes.func,
        getPornstarsLink: PropTypes.func,
    }),
    loadingWrapper({
        isHome: true,
    })
)(Home)
