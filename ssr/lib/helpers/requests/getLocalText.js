export default (languageId, key) => {
    switch (languageId) {
        case 'eng':
            return key === 'latest'
                ? 'Recent'
                : key === 'longest'
                ? 'Duration'
                : key === 'popular'
                ? 'Popularity'
                : key === 'galleries'
                ? 'Films'
                : key === 'models'
                ? 'Pornstars'
                : undefined
    }
}
