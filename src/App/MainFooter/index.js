import React from 'react'
import {compose, setPropTypes} from 'recompose'
import {connect} from 'react-redux'
import {Typography} from '@material-ui/core'

import {immutableProvedGet as ig} from '../helpers'
import {immutableI18nFooterModel, immutableI18nButtonsModel} from '../models'
import {IMG_PATH} from '../../config'
import {linksToProtect} from './fixtures'
import {
    Footer,
    FooterInner,
    TextBlock,
    LinkList,
    LinkItem,
    Link,
    QRCodeBlock
} from './assets'

const
    MainFooter = ({i18nFooter, i18nButtons}) => <Footer>
        <FooterInner>
            <TextBlock>
                <LinkList>
                    <LinkItem>
                        <Link href={'#'}>
                            {ig(i18nButtons, 'report')}
                        </Link>
                    </LinkItem>
                </LinkList>

                <Typography variant="body2" gutterBottom>
                    {ig(i18nFooter, 'forParents')}
                </Typography>

                <LinkList>
                    {
                        linksToProtect.map(link => <LinkItem key={link.id}>
                            <Link
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.text}
                            </Link>
                        </LinkItem>
                    )}
                </LinkList>

                <Typography variant="body2" gutterBottom color="textSecondary">
                    {ig(i18nFooter, 'disclaimer')}
                </Typography>
                <Typography variant="body2" gutterBottom color="textSecondary">
                    {(new Date()).getFullYear()} &copy;&nbsp;Copyright videosection.com
                </Typography>
            </TextBlock>
            <QRCodeBlock>
                <img src={`${IMG_PATH}qrcode.svg`} alt="qrcode"/>
            </QRCodeBlock>
        </FooterInner>
    </Footer>

export default compose(
    connect(
        state => ({
            i18nFooter: ig(state, 'app', 'locale', 'i18n', 'footer'),
            i18nButtons: ig(state, 'app', 'locale', 'i18n', 'buttons'),
        })
    ),
    setPropTypes({
        i18nFooter: immutableI18nFooterModel,
        i18nButtons: immutableI18nButtonsModel,
    }),
)(MainFooter)
