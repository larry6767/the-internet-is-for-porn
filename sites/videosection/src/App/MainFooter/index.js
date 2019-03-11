import React from 'react'
import {compose, withHandlers, onlyUpdateForKeys} from 'recompose'
import {connect} from 'react-redux'
import {Typography} from '@material-ui/core'

import {
    plainProvedGet as g,
    immutableProvedGet as ig,
    setPropTypes,
    PropTypes,
    getDomain
} from '../helpers'

import {immutableI18nFooterModel, immutableI18nButtonsModel} from '../models'
import reportDialogActions from '../ReportDialog/actions'
import {linksToProtect} from './fixtures'

import {
    Footer,
    FooterInner,
    TextBlock,
    LinkList,
    LinkItem,
    Link,
} from './assets'

const
    startYear = 2019,
    currentYear = (new Date()).getFullYear(),

    MainFooter = props => <Footer>
        <FooterInner>
            <TextBlock>
                {g(props, 'isSSR') ? null : <LinkList>
                    <LinkItem>
                        <Link href={'#'} onClick={g(props, 'toggleReportDialogHandler')}>
                            {ig(props.i18nButtons, 'report')}
                        </Link>
                    </LinkItem>
                </LinkList>}

                <Typography variant="body2" gutterBottom>
                    {ig(props.i18nFooter, 'forParents')}
                </Typography>

                <LinkList>
                    {linksToProtect.map(link => <LinkItem key={g(link, 'id')}>
                        <Link href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.text}
                        </Link>
                    </LinkItem>)}
                </LinkList>

                <Typography variant="body2" gutterBottom color="textSecondary">
                    {ig(props.i18nFooter, 'disclaimer')}
                </Typography>

                <Typography variant="body2" gutterBottom color="textSecondary">
                    {currentYear > startYear ? `${startYear}–${currentYear}` : startYear}
                    &nbsp;&copy;&nbsp;Copyright&nbsp;{g(props, 'domain')}
                </Typography>
            </TextBlock>
        </FooterInner>
    </Footer>

export default compose(
    connect(
        state => ({
            isSSR: ig(state, 'app', 'ssr', 'isSSR'),
            i18nFooter: ig(state, 'app', 'locale', 'i18n', 'footer'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
            domain: getDomain(state),
        }),
        {
            toggleReportDialogFlow: g(reportDialogActions, 'toggleReportDialogFlow'),
        }
    ),
    onlyUpdateForKeys([]),
    withHandlers({
        toggleReportDialogHandler: props => event => {
            event.preventDefault()
            props.toggleReportDialogFlow()
        }
    }),
    setPropTypes(process.env.NODE_ENV === 'production' ? null : {
        isSSR: PropTypes.bool,
        i18nFooter: immutableI18nFooterModel,
        i18nButtons: immutableI18nButtonsModel,
        domain: PropTypes.string,

        toggleReportDialogFlow: PropTypes.func,
        toggleReportDialogHandler: PropTypes.func,
    }),
)(MainFooter)
