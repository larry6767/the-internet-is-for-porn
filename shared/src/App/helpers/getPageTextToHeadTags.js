import React from 'react'

// local libs
import ig from 'src/App/helpers/immutable/provedGet'

export default pageText => [
    <title>{ig(pageText, 'title')}</title>,
    <meta name="keywords" content={ig(pageText, 'keywords') || ''}/>,
    <meta name="description" content={ig(pageText, 'description') || ''}/>,
]
