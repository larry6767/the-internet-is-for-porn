import React from 'react'

import ig from './immutable/provedGet'

export default pageText => [
    <title>{ig(pageText, 'title')}</title>,
    <meta name="keywords" content={ig(pageText, 'keywords') || ''}/>,
    <meta name="description" content={ig(pageText, 'description') || ''}/>,
]
