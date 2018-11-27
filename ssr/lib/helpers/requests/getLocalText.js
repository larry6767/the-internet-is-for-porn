export default (languageId, key) => {
    switch (languageId) {
        case 'eng':
            return key === 'latest'
                ? 'Recent'
                : key === 'longest'
                ? 'Duration'
                : key === 'popular'
                ? 'Popularity'
                : undefined
    }
}
