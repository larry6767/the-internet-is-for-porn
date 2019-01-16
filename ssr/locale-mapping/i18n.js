import {set} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../App/helpers'
import {i18nModel} from '../App/models'

// only particular helper, because some of all helpers depends on this module
import deepFreeze from '../lib/helpers/deepFreeze'

const
    mapping = deepFreeze({
        eng: {
            search: {
                inputPlaceholder: 'Search box',
                buttonTitle: 'Run search',
            },
            navigation: {
                home: {title: 'Home'},
                allNiches: {title: 'All Niches'},
                allMovies: {title: 'All Movies'},
                pornstars: {title: 'Pornstars'},
                favorite: {title: 'Favorite'},
            },
            allNiches: {
                pageHeader: 'All Niches',
            },
            ordering: {
                label: 'Sort',
                byDate: 'Recent',
                byDuration: 'Duration',
                byPopularity: 'Popularity',
                byRelevant: 'Relevant',
            },
            buttons: {
                report: 'Report',
                favoriteMovies: 'Films',
                favoritePornstars: 'Pornstars',
                archive: 'Archive films',
                previousMonth: 'Previous month',
                nextMonth: 'Next month',
                topFilms: 'Top films',
                backToMainPage: 'Back to main page',
                addToFavorite: 'Add to favorite',
                removeFromFavorite: 'Remove from favorite',
                cancel: 'Cancel',
            },
            footer: {
                forParents: 'Parents — Protect your children from adult content with these services:',
                disclaimer: `Disclaimer: All models on this website are 18 years or older. \
                videosection.com has a zero-tolerance policy against illegal pornography. \
                We have no control over the content of these pages. All films and links \
                are provided by 3rd parties. We take no responsibility for the content on any \
                website which we link to, please use your own discretion.`,
            }
        },
        deu: {
            search: {
                inputPlaceholder: 'Stichworte hinzufügen',
                buttonTitle: 'Suche starten',
            },
            navigation: {
                home: {title: 'Hauptseite'},
                allNiches: {title: 'Alle Gruppen'},
                allMovies: {title: 'Alle Vids'},
                pornstars: {title: 'Models'},
                favorite: {title: 'Favorisierten'},
            },
            allNiches: {
                pageHeader: 'Alle Gruppen',
            },
            ordering: {
                label: 'Sortiert',
                byDate: 'Das Neueste',
                byDuration: 'Dauer',
                byPopularity: 'Popularität',
                byRelevant: 'Ähnlich',
            },
            buttons: {
                report: 'Bericht',
                favoriteMovies: 'Filme',
                favoritePornstars: 'Pornostars',
                archive: 'Archivfilme',
                previousMonth: 'Vorheriger Monat',
                nextMonth: 'Nächsten Monat',
                topFilms: 'Top-Filme',
                backToMainPage: 'Zurück zur Hauptseite',
                addToFavorite: 'Zu den Favoriten hinzufügen',
                removeFromFavorite: 'Aus Favoriten entfernen',
                cancel: 'Stornieren',
            },
            footer: {
                forParents: 'Eltern - Schützen sie Ihre Kinder vor Pornografie mit der Hilfe \
                folgender Service Anbieter:',
                disclaimer: `Hinweis: Alle Models auf dieser Sex Seite sind 18 Jahre alt oder \
                älter. de.videosection.com pflegt eine Null-Toleranz Einstellung gegenüber \
                Pornografie die illegal ist. Wenn Du etwas entdecken solltest das illegal ist, \
                schicke uns bitte den Link und wir werden diesen umgehend löschen. Alle Galerien, \
                Links und Videos auf dieser Tube Seite unterliegen der Verantwortung Dritter, \
                sichte diese bitten in eigener Verantwortung.`,
            }
        },
        ita: {
            search: {
                inputPlaceholder: 'Inserisci parole chiave...',
                buttonTitle: 'Esegui la ricerca',
            },
            navigation: {
                home: {title: 'Principale'},
                allNiches: {title: 'Tutte le Categorie'},
                allMovies: {title: 'Tutti I Film'},
                pornstars: {title: 'Pornostar '},
                favorite: {title: 'Preferiti'},
            },
            allNiches: {
                pageHeader: 'Tutte le Categorie',
            },
            ordering: {
                label: 'Ordina',
                byDate: 'Più Recenti',
                byDuration: 'I più lunghi',
                byPopularity: 'Popolari',
                byRelevant: 'Correlati',
            },
            buttons: {
                report: 'Rapporto',
                favoriteMovies: 'Cinema',
                favoritePornstars: 'Pornstar',
                archive: 'Film d\'archivio',
                previousMonth: 'Il mese scorso',
                nextMonth: 'Il prossimo mese',
                topFilms: 'Top film',
                backToMainPage: 'Torna alla pagina principale',
                addToFavorite: 'Aggiungi ai favoriti',
                removeFromFavorite: 'Rimuovi dai preferiti',
                cancel: 'Annulla',
            },
            footer: {
                forParents: `Genitori – Proteggete i vostri bambini dai contenuti per adulti \
                con questi servizi:`,
                disclaimer: `Disclaimer: it.videosection.com usa la politica di zero-tolleranza \
                contro la pornografia illegale. Ogni materiale, incluse le gallerie e i link, \
                sono forniti da terze parti e non sono controllati da noi. Non accettiamo nessuna \
                responsabilità per il materiale dei siti ai quali colleghiamo. Vi preghiamo \
                di usare la propria discrezione mentre guardate i link.`,
            }
        },
        fra: { // TODO
            search: {
                inputPlaceholder: '',
                buttonTitle: '',
            },
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
                byRelevant: '',
            },
            buttons: {
                report: '',
                favoriteMovies: '',
                favoritePornstars: '',
                archive: '',
                previousMonth: '',
                nextMonth: '',
                topFilms: '',
                backToMainPage: '',
                addToFavorite: '',
                removeFromFavorite: '',
                cancel: '',
            },
            footer: {
                forParents: '',
                disclaimer: '',
            },
        },
        spa: { // TODO
            search: {
                inputPlaceholder: '',
                buttonTitle: '',
            },
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
                byRelevant: '',
            },
            buttons: {
                report: '',
                favoriteMovies: '',
                favoritePornstars: '',
                archive: '',
                previousMonth: '',
                nextMonth: '',
                topFilms: '',
                backToMainPage: '',
                addToFavorite: '',
                removeFromFavorite: '',
                cancel: '',
            },
            footer: {
                forParents: '',
                disclaimer: '',
            },
        },
        por: { // TODO
            search: {
                inputPlaceholder: '',
                buttonTitle: '',
            },
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
                byRelevant: '',
            },
            buttons: {
                report: '',
                favoriteMovies: '',
                favoritePornstars: '',
                archive: '',
                previousMonth: '',
                nextMonth: '',
                topFilms: '',
                backToMainPage: '',
                addToFavorite: '',
                removeFromFavorite: '',
                cancel: '',
            },
            footer: {
                forParents: '',
                disclaimer: '',
            },
        },
        swe: { // TODO
            search: {
                inputPlaceholder: '',
                buttonTitle: '',
            },
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
                byRelevant: '',
            },
            buttons: {
                report: '',
                favoriteMovies: '',
                favoritePornstars: '',
                archive: '',
                previousMonth: '',
                nextMonth: '',
                topFilms: '',
                backToMainPage: '',
                addToFavorite: '',
                removeFromFavorite: '',
                cancel: '',
            },
            footer: {
                forParents: '',
                disclaimer: '',
            },
        },
        nld: { // TODO
            search: {
                inputPlaceholder: '',
                buttonTitle: '',
            },
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
                byRelevant: '',
            },
            buttons: {
                report: '',
                favoriteMovies: '',
                favoritePornstars: '',
                archive: '',
                previousMonth: '',
                nextMonth: '',
                topFilms: '',
                backToMainPage: '',
                addToFavorite: '',
                removeFromFavorite: '',
                cancel: '',
            },
            footer: {
                forParents: '',
                disclaimer: '',
            },
        },
        fin: { // TODO
            search: {
                inputPlaceholder: '',
                buttonTitle: '',
            },
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
                byRelevant: '',
            },
            buttons: {
                report: '',
                favoriteMovies: '',
                favoritePornstars: '',
                archive: '',
                previousMonth: '',
                nextMonth: '',
                topFilms: '',
                backToMainPage: '',
                addToFavorite: '',
                removeFromFavorite: '',
                cancel: '',
            },
            footer: {
                forParents: '',
                disclaimer: '',
            },
        },
        rus: { // TODO
            search: {
                inputPlaceholder: '',
                buttonTitle: '',
            },
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
                byRelevant: '',
            },
            buttons: {
                report: '',
                favoriteMovies: '',
                favoritePornstars: '',
                archive: '',
                previousMonth: '',
                nextMonth: '',
                topFilms: '',
                backToMainPage: '',
                addToFavorite: '',
                removeFromFavorite: '',
                cancel: '',
            },
            footer: {
                forParents: '',
                disclaimer: '',
            },
        },
        tur: { // TODO
            search: {
                inputPlaceholder: '',
                buttonTitle: '',
            },
            navigation: {
                home: {title: ''},
                allNiches: {title: ''},
                allMovies: {title: ''},
                pornstars: {title: ''},
                favorite: {title: ''},
            },
            allNiches: {
                pageHeader: '',
            },
            ordering: {
                label: '',
                byDate: '',
                byDuration: '',
                byPopularity: '',
                byRelevant: '',
            },
            buttons: {
                report: '',
                favoriteMovies: '',
                favoritePornstars: '',
                archive: '',
                previousMonth: '',
                nextMonth: '',
                topFilms: '',
                backToMainPage: '',
                addToFavorite: '',
                removeFromFavorite: '',
                cancel: '',
            },
            footer: {
                forParents: '',
                disclaimer: '',
            },
        },
    })

/*
    A helper which could be used during application initialization to validate locales from server
    with own data structure.
*/
export const validate = siteLocales => {
    // generating model of every language code received from backend
    const mappingModel = PropTypes.exact(
        siteLocales.reduce((obj, x) => set(obj, g(x, 'code'), i18nModel), {})
    )

    assertPropTypes(mappingModel, mapping, 'api-locale-mapping', 'validate')
}

export default mapping
