import g from './plain/provedGet'

export const
    testHostReg = /(^test\.|\.test(?=\.))/g,
    getPureDomain = host => host.replace(testHostReg, '').replace(/:\d+$/, ''),

    patchSiteLocales = (siteLocales, defaultSiteLocaleCode) => req =>
        !testHostReg.test(req.get('host')) ? siteLocales : siteLocales.map(x =>
            g(x, 'code') === defaultSiteLocaleCode
                ? {...x, host: `test.${g(x, 'host')}`}
                : {...x, host: g(x, 'host').replace(/^([^.]+)\./, '$1.test.')}
        )
