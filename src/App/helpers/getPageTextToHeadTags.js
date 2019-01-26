import React from 'react'

import ig from './immutable/provedGet'

export default pageText => [
    <title>{ig(pageText, 'title')}</title>,
].concat(
    <meta name="keywords" content={ig(pageText, 'keywords') || ''}/>
).concat(
    <meta name="description" content={ig(pageText, 'description') || ''}/>
)
