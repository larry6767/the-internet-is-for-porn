import {set} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../App/helpers'
import {i18nModel} from '../App/models'

// only particular helper, because some of all helpers depends on this module
import deepFreeze from '../lib/helpers/deepFreeze'

const
    mapping = deepFreeze({
        eng: {
            headers: {
                allNiches: 'All Niches',
                niches: 'Top Rated %ORIENTATION% Niches',
                listNiches: 'All %ORIENTATION% Films',
                listArchive: 'Archives',
                pornstars: 'Top Rated %ORIENTATION% Pornstars',
            },
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
            },
            report: {
                title: `Have you found a problem on the site? Please use this form to help us \
                to fix it, or contact us directly`,
                duration: 'Duration',
                added: 'Added',
                hosted: 'Hosted by',
                found: 'Found on page',
                on: 'on',
                radioLabel: 'Report reason',
                radioButtons: {
                    other: 'Other',
                    deleted: 'Movie has been deleted',
                    doesntPlay: 'Movie doesn\'t play',
                    badThumb: 'Low quality of the thumbnail',
                    young: 'Person on the thumbnail looks too young',
                    incest: 'Incest',
                    animals: 'Beastiality (sex with animals)',
                    otherScat: 'Other inappropriate content (rape, blood, scat, etc...)',
                    copyright: 'Copyright violation',
                },
                text: `Take Note of: Our website is a completely automatic adult search engine \
                focused on videos clips. We do not possess, produce, distribute or host \
                any movies. All linked clips are automatically gathered and added into our \
                system by our spider script. Thumbnails are auto-generated from the outside \
                video contributors. All of the video content performed on our site \
                are hosted and created by other websites that are not under our control. By your \
                request we can remove thumbnail and link to the video, \
                but not the original video file.`,
                succesText: 'Thank you for your report. We will review it soon',
                failureText: 'Something went wrong. Try again later',
                commentLabel: 'Comment',
                commentPlaceholder: 'Describe the problem',
            },
            orientation: {
                straight: 'Straight',
                gay: 'Gays',
                tranny: 'Shemales',
            },
        },
        deu: {
            headers: {
                allNiches: 'Alle Gruppen',
                niches: 'Die Besten %ORIENTATION% Gruppen',
                listNiches: 'Alle Verfügbaren %ORIENTATION% Video Clips',
                listArchive: 'Archiv',
                pornstars: 'Die Besten %ORIENTATION% Models',
            },
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
            },
            report: {
                title: `Bitte schicke uns eine Mitteilung mit dem Betreff "Missbrauch" \
                mit dem direkten Link zu dem illegalen Material mit Hilfe dieses Eingabeformulars`,
                duration: 'Dauer',
                added: 'Hinzugefügt',
                hosted: 'Veranstaltet von',
                found: 'Gefunden auf der Seite',
                on: 'auf',
                radioLabel: 'Grund melden',
                radioButtons: {
                    other: 'Andere',
                    deleted: 'Film wurde gelöscht',
                    doesntPlay: 'Film wird nicht abgespielt',
                    badThumb: 'Niedrige Qualität der Miniaturansicht',
                    young: 'Die Person auf der Miniaturansicht sieht zu jung aus',
                    incest: 'Inzest',
                    animals: 'Bestie (Sex mit Tieren)',
                    otherScat: 'Andere unangemessene Inhalte (Vergewaltigung, Blut, Scat usw.)',
                    copyright: 'Urheberrechtsverletzung',
                },
                text: `Beachten Sie: Unsere Website ist eine vollautomatische Suchmaschine \
                für Erwachsene, die sich auf Videoclips konzentriert. Wir besitzen, produzieren, \
                vertreiben oder hosten keine Filme. Alle verknüpften Clips werden automatisch \
                von unserem Spider-Skript erfasst und in unser System aufgenommen. \
                Miniaturansichten werden automatisch von den externen Video-Mitwirkenden \
                generiert. Alle auf unserer Website bereitgestellten Videoinhalte werden von \
                anderen Websites gehostet und erstellt, die nicht unserer Kontrolle unterliegen. \
                Auf Ihren Wunsch können wir Miniaturbilder und Links zum Video entfernen, \
                nicht jedoch die Originalvideodatei.`,
                succesText: 'Vielen Dank für Ihren Bericht. Wir werden es bald überprüfen',
                failureText: 'Etwas ist schief gelaufen. Versuchen Sie es später noch einmal',
                commentLabel: 'Kommentar',
                commentPlaceholder: 'Beschreibe das Problem',
            },
            orientation: {
                straight: 'Hetero',
                gay: 'Gay',
                tranny: 'Transe',
            },
        },
        ita: {
            headers: {
                allNiches: 'Tutte le Categorie',
                niches: 'Le %ORIENTATION% Categorie Più Votate',
                listNiches: 'Totale %ORIENTATION% Filmati',
                listArchive: 'archivio',
                pornstars: 'Le %ORIENTATION% Pornostar Più Votate',
            },
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
            },
            report: {
                title: `Hai trovato un problema sul sito? Utilizza questo modulo per aiutarci \
                a risolverlo o contattaci direttamente`,
                duration: 'Durata',
                added: 'Aggiunto',
                hosted: 'Ospitato da',
                found: 'Trovato a pagina',
                on: 'sopra',
                radioLabel: 'Segnala un motivo',
                radioButtons: {
                    other: 'Altro',
                    deleted: 'Il film è stato cancellato',
                    doesntPlay: 'Il film non suona',
                    badThumb: 'Bassa qualità della miniatura',
                    young: 'La persona sull\'anteprima sembra troppo giovane',
                    incest: 'Incesto',
                    animals: 'Beastiality (sesso con animali)',
                    otherScat: 'Altri contenuti inappropriati (stupro, sangue, scat, ecc ...)',
                    copyright: 'violazione di copyright',
                },
                text: `Prendi nota di: Il nostro sito Web è un motore di ricerca per adulti \
                completamente automatico, incentrato su clip video. Non possediamo, produciamo, \
                distribuiamo o ospitiamo alcun film. Tutti i clip collegati vengono \
                automaticamente raccolti e aggiunti nel nostro sistema dal nostro script spider. \
                Le miniature sono generate automaticamente dai contributori video esterni. \
                Tutti i contenuti video eseguiti sul nostro sito sono ospitati e creati da altri \
                siti web che non sono sotto il nostro controllo. Tramite la tua richiesta, \
                possiamo rimuovere la miniatura e il link al video, ma non il file video originale.`,
                succesText: 'Grazie per la segnalazione. Lo rivedremo presto',
                failureText: 'Qualcosa è andato storto. Riprovare più tardi',
                commentLabel: 'Commento',
                commentPlaceholder: 'Descrivi il problema',
            },
            orientation: {
                straight: 'Straight',
                gay: 'Gay',
                tranny: 'Transessuale',
            },
        },
        fra: { // TODO
            headers: {
                allNiches: '',
                niches: '',
                listNiches: '',
                listArchive: '',
                pornstars: '',
            },
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
            report: {
                title: ``,
                duration: '',
                added: '',
                hosted: '',
                found: '',
                on: '',
                radioLabel: '',
                radioButtons: {
                    other: '',
                    deleted: '',
                    doesntPlay: '',
                    badThumb: '',
                    young: '',
                    incest: '',
                    animals: '',
                    otherScat: '',
                    copyright: '',
                },
                text: ``,
                succesText: '',
                failureText: '',
                commentLabel: '',
                commentPlaceholder: '',
            },
            orientation: {
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        spa: { // TODO
            headers: {
                allNiches: '',
                niches: '',
                listNiches: '',
                listArchive: '',
                pornstars: '',
            },
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
            report: {
                title: ``,
                duration: '',
                added: '',
                hosted: '',
                found: '',
                on: '',
                radioLabel: '',
                radioButtons: {
                    other: '',
                    deleted: '',
                    doesntPlay: '',
                    badThumb: '',
                    young: '',
                    incest: '',
                    animals: '',
                    otherScat: '',
                    copyright: '',
                },
                text: ``,
                succesText: '',
                failureText: '',
                commentLabel: '',
                commentPlaceholder: '',
            },
            orientation: {
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        por: { // TODO
            headers: {
                allNiches: '',
                niches: '',
                listNiches: '',
                listArchive: '',
                pornstars: '',
            },
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
            report: {
                title: ``,
                duration: '',
                added: '',
                hosted: '',
                found: '',
                on: '',
                radioLabel: '',
                radioButtons: {
                    other: '',
                    deleted: '',
                    doesntPlay: '',
                    badThumb: '',
                    young: '',
                    incest: '',
                    animals: '',
                    otherScat: '',
                    copyright: '',
                },
                text: ``,
                succesText: '',
                failureText: '',
                commentLabel: '',
                commentPlaceholder: '',
            },
            orientation: {
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        swe: { // TODO
            headers: {
                allNiches: '',
                niches: '',
                listNiches: '',
                listArchive: '',
                pornstars: '',
            },
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
            report: {
                title: ``,
                duration: '',
                added: '',
                hosted: '',
                found: '',
                on: '',
                radioLabel: '',
                radioButtons: {
                    other: '',
                    deleted: '',
                    doesntPlay: '',
                    badThumb: '',
                    young: '',
                    incest: '',
                    animals: '',
                    otherScat: '',
                    copyright: '',
                },
                text: ``,
                succesText: '',
                failureText: '',
                commentLabel: '',
                commentPlaceholder: '',
            },
            orientation: {
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        nld: { // TODO
            headers: {
                allNiches: '',
                niches: '',
                listNiches: '',
                listArchive: '',
                pornstars: '',
            },
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
            report: {
                title: ``,
                duration: '',
                added: '',
                hosted: '',
                found: '',
                on: '',
                radioLabel: '',
                radioButtons: {
                    other: '',
                    deleted: '',
                    doesntPlay: '',
                    badThumb: '',
                    young: '',
                    incest: '',
                    animals: '',
                    otherScat: '',
                    copyright: '',
                },
                text: ``,
                succesText: '',
                failureText: '',
                commentLabel: '',
                commentPlaceholder: '',
            },
            orientation: {
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        fin: { // TODO
            headers: {
                allNiches: '',
                niches: '',
                listNiches: '',
                listArchive: '',
                pornstars: '',
            },
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
            report: {
                title: ``,
                duration: '',
                added: '',
                hosted: '',
                found: '',
                on: '',
                radioLabel: '',
                radioButtons: {
                    other: '',
                    deleted: '',
                    doesntPlay: '',
                    badThumb: '',
                    young: '',
                    incest: '',
                    animals: '',
                    otherScat: '',
                    copyright: '',
                },
                text: ``,
                succesText: '',
                failureText: '',
                commentLabel: '',
                commentPlaceholder: '',
            },
            orientation: {
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        rus: { // TODO
            headers: {
                allNiches: '',
                niches: '',
                listNiches: '',
                listArchive: '',
                pornstars: '',
            },
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
            report: {
                title: ``,
                duration: '',
                added: '',
                hosted: '',
                found: '',
                on: '',
                radioLabel: '',
                radioButtons: {
                    other: '',
                    deleted: '',
                    doesntPlay: '',
                    badThumb: '',
                    young: '',
                    incest: '',
                    animals: '',
                    otherScat: '',
                    copyright: '',
                },
                text: ``,
                succesText: '',
                failureText: '',
                commentLabel: '',
                commentPlaceholder: '',
            },
            orientation: {
                straight: '',
                gay: '',
                tranny: '',
            },
        },
        tur: { // TODO
            headers: {
                allNiches: '',
                niches: '',
                listNiches: '',
                listArchive: '',
                pornstars: '',
            },
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
            report: {
                title: ``,
                duration: '',
                added: '',
                hosted: '',
                found: '',
                on: '',
                radioLabel: '',
                radioButtons: {
                    other: '',
                    deleted: '',
                    doesntPlay: '',
                    badThumb: '',
                    young: '',
                    incest: '',
                    animals: '',
                    otherScat: '',
                    copyright: '',
                },
                text: ``,
                succesText: '',
                failureText: '',
                commentLabel: '',
                commentPlaceholder: '',
            },
            orientation: {
                straight: '',
                gay: '',
                tranny: '',
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
