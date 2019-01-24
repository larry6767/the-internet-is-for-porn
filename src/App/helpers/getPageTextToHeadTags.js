import React from 'react'
import {immutableProvedGet as ig} from '.'

export default pageText => [
    <title>{ig(pageText, 'title')}</title>,
].concat(
    ig(pageText, 'keywords') === null ? [] :
    <meta name="keywords" content={ig(pageText, 'keywords')}/>
).concat(
    ig(pageText, 'description') === null ? [] :
    <meta name="description" content={ig(pageText, 'description')}/>
)
