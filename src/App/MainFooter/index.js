import React from 'react'
import {Typography} from '@material-ui/core'

// TODO FIXME refactor this temporary hack for SSR
//import css from './assets/_.module.scss'

import {IMG_PATH} from '../../config'
import {links, linksToProtect} from './fixtures'

// TODO FIXME refactor this temporary hack for SSR
const css = {}

const
    SimpleAppBar = () => <div className={css.footer}>
        <div className={css.footerInner}>
            <div className={css.textBlock}>
                <ul className={css.linkList}>
                    {
                        links.map(link => <li className={css.linkItem} key={link.id}>
                            <a
                                href={link.href}
                                className={css.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.text}
                            </a>
                        </li>
                    )}
                </ul>

                <Typography variant="body2" gutterBottom>
                    Parents&nbsp;&mdash; Protect your children from adult content with these services:
                </Typography>

                <ul className={css.linkList}>
                    {
                        linksToProtect.map(link => <li className={css.linkItem} key={link.id}>
                            <a
                                href={link.href}
                                className={css.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.text}
                            </a>
                        </li>
                    )}
                </ul>

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
            </div>
            <div className={css.QRCodeBlock}>
                <img src={`${IMG_PATH}qrcode.svg`} alt="qrcode"/>
            </div>
        </div>
    </div>

export default SimpleAppBar
