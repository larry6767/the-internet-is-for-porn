# About helpers

## Helpers modules

To avoid recursive dependencies and bugs which are hard to debug just import particular modules and
**DO NOT** import `index.js` where all helpers extracted as single module. Import `helpers/index.js`
only from some component or a module outside `helpers` directory.

Also some helpers depends on modules which are placed upper than `helpers` directory (for example
[src/App/models.js](../src/App/models.js)). To avoid recursive dependencies import only particular
helpers modules (not `helpers/index.js`), **DO NOT** import such modules from used helpers and add a
warning about possible recursive dependencies. An example:

```js
// WARNING! Some helper(s) depend(s) on this module, avoid recursive dependencies!
import {PropTypes} from './helpers/propTypes'
import {ImmutablePropTypes} from './helpers/propTypes/immutable'
```
