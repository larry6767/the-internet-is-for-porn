import React from 'react'
import {Typography} from '@material-ui/core'
import {IMG_PATH} from '../../config'
import {links, linksToProtect} from './fixtures'
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
    SimpleAppBar = () => <Footer>
        <FooterInner>
            <TextBlock>
                <LinkList>
                    {
                        links.map(link => <LinkItem key={link.id}>
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

                <Typography variant="body2" gutterBottom>
                    Parents&nbsp;&mdash; Protect your children from adult content with these services:
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
                    Disclaimer: All models on&nbsp;this website are 18&nbsp;years or&nbsp;older.
                    videosection.com has a&nbsp;zero-tolerance policy against illegal pornography.
                    We&nbsp;have no&nbsp;control over the content of&nbsp;these pages.
                    All films and links are provided by&nbsp;3rd parties.
                    We&nbsp;take no&nbsp;responsibility for the content on&nbsp;any website which
                    we&nbsp;link&nbsp;to, please use your own discretion.
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

export default SimpleAppBar
