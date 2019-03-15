const path = require('path')
const {override, babelInclude} = require('customize-cra')

module.exports = (config, env) =>
    Object.assign(config, override(
        babelInclude([
            path.resolve('.'),
            path.resolve('../../shared/'),
        ])
    )(config, env))
