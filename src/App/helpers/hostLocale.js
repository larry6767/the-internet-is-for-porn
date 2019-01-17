export const
    testHostReg = /(^test\.|\.test\.)/g,
    getPureDomain = host => host.replace(testHostReg, '').replace(/:\d+$/, '')
