import {backendUrl} from 'ssr/lib/helpers/backendUrl';
import {plainProvedGet as g} from 'src/App/helpers';
import {default as router} from 'ssr/locale-mapping/router';
import {default as backendAPI} from 'ssr/locale-mapping/backend-api';

import fetch from "node-fetch";
import {format, parse} from "url";

const util = require('util');
const ejs = require('ejs');
const fs = require('fs');
const os = require('os');

const fileTTL = 1; // Количество секунд в течение которого файл считается не требующим обновления

let gSiteLocales = [], gSiteLocaleCode = '', gHost = '';

const
    escapeUri = (url) => {
        url = parse(url);
        url.pathname = url.pathname.split(/\//).map(x => encodeURIComponent(x)).join('/');
        return format(url);
    },
    // Получает информацию из API
    getInfo = (url, params) => {
        params = params || {};
        params.url = escapeUri(url);

        return fetch(
            backendUrl(gSiteLocales, gSiteLocaleCode),
            {
                method: 'POST',
                body: JSON.stringify({operation: "getPageDataByUrl", params: params}),
            }
        ).then(res => res.json())
            .catch((err) => {
                console.error(err);
                console.error(params.url);
            })
    },
    // Возвращает список sub_url сущностей, сгрупированный по ориентациям
    getInfoByLetters = (suffixes, path, params) => {
        return new Promise((resolve, reject) => {
            const orientations = g(backendAPI, gSiteLocaleCode, 'orientationPrefixes') || {};

            let depends = [];
            let keys = [];

            Object.keys(orientations).forEach((key) => {
                const url = orientations[key],
                    urlSuffix = suffixes.hasOwnProperty(key) ? suffixes[key] : '';
                keys.push(key);
                depends.push(getInfo(url + urlSuffix, params));
            });

            Promise.all(depends)
                .then((values) => {
                    let result = {};
                    keys.forEach((k, index) => {
                        result[k] = [];
                        const byLetters = g(values[index], path);
                        Object.keys(byLetters).forEach((letter) => {
                            const bySingleLetter = byLetters[letter];
                            Object.keys(bySingleLetter).forEach((key) => {
                                result[k].push(g(bySingleLetter[key], 'sub_url'));
                            });
                        });
                    });
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    },
    // Получает список sub_url ниш, сгрупированный по ориентациям
    getNiches = () => {
        const orientations = g(backendAPI, gSiteLocaleCode, 'orientationPrefixes') || {};
        let suffixes = {};
        Object.keys(orientations).forEach((orientation) => {
            suffixes[orientation] = '/?categories';
        });

        return getInfoByLetters(
            suffixes,
            ['page', 'EXTENDED_TAGS_BY_LETTERS', 'letters'],
            {
                options: {
                    blocks: {
                        extendedTagsBlock: 1
                    }
                }
            }
        );
    },
    // Получает список sub_url звезд, сгрупированный по ориентациям
    getPornstars = () => {
        const suffixes = g(backendAPI, [gSiteLocaleCode, 'pageCode', 'pornstars', 'code']) || {};
        let result = {};
        Object.keys(suffixes).forEach((orientation) => {
            result[orientation] = '/' + suffixes[orientation] + '.html';
        });

        return getInfoByLetters(
            result,
            ['page', 'MODELS_BY_LETTERS', 'letters'],
            {}
        );
    },
    // Возвращает список url роликов
    getVideos = () => {
        return new Promise((resolve, reject) => {
            const orientations = g(backendAPI, gSiteLocaleCode, 'orientationPrefixes') || {};

            let depends = [];
            let keys = [];

            Object.keys(orientations).forEach((key) => {
                const url = orientations[key];
                keys.push(key);
                const suffix = g(backendAPI, [gSiteLocaleCode, 'pageCode', 'allMovies', 'code', key]) || '';
                depends.push(getInfo(url + '/' + suffix + '.html'));
            });

            const re = new RegExp('vid-(.*)\/(.*)\.htm');


            Promise.all(depends)
                .then((values) => {
                    let result = {};
                    keys.forEach((k, index) => {
                        result[k] = [];
                        const items = g(values[index], 'page', 'GALS_INFO', 'items');
                        Object.keys(items).forEach((id) => {
                            const item = items[id],
                                url = g(item, 'url'),
                                founded = url.match(re);
                            if (founded) {
                                result[k].push(founded[1] + '/' + founded[2]);
                            }
                        });
                    });
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    },

    // Получает всю информацию и строит файл
    refreshFile = (sitemapPath) => {
        return new Promise((resolve, reject) => {
            try {
                Promise.all([getNiches(), getPornstars(), getVideos()])
                    .then((values) => {
                        const data = {
                                host: gHost,
                                router: router[gSiteLocaleCode],
                                niches: values[0],
                                stars: values[1],
                                videos: values[2],
                            },
                            templatePath = util.format('%s/sitemap-template.ejs', __dirname),
                            template = fs.readFileSync(templatePath, 'utf-8'),
                            html = ejs.render(template, data);
                        fs.writeFileSync(sitemapPath, html, 'utf8');
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } catch (err) {
                reject(err);
            }
        });
    };

export default (siteLocales, defaultSiteLocaleCode) => (req, res) => {
    gSiteLocales = siteLocales;
    gSiteLocaleCode = defaultSiteLocaleCode;
    gHost = util.format('%s://%s', req.protocol, req.headers.host);

    // Строим файл для текущего языка
    const sitemapXml = util.format('%s/%s_sitemap.xml', os.tmpdir(), defaultSiteLocaleCode);

    // Если файл есть:
    //      - отдаем существующий
    //      - проверяем его дату модификации - если слишком старый - запускаем генерацию
    // Если файла нет - генерируем его и отдаем клиенту
    try {
        if (fs.existsSync(sitemapXml)) {
            res.sendFile(sitemapXml);
            const stats = fs.statSync(sitemapXml);
            const seconds = (new Date().getTime() - new Date(stats.mtime).getTime()) / 1000;
            if (seconds > fileTTL) {
                refreshFile(sitemapXml);
            }
        } else {
            refreshFile(sitemapXml)
                .then(() => {
                    res.sendFile(sitemapXml);
                })
        }
    } catch (err) {
        refreshFile(sitemapXml)
            .then(() => {
                res.sendFile(sitemapXml);
            })
    }
};
