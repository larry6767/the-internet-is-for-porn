import {set} from 'lodash'

import {PropTypes, assertPropTypes, plainProvedGet as g} from '../App/helpers'
import {i18nModel} from '../App/models'

// only particular helper, because some of all helpers depends on this module
import deepFreeze from '../lib/helpers/deepFreeze'

const
    mapping = deepFreeze({
        eng: {
            labels: {
                providedBy: 'provided by',
                showing: 'Showing',
            },
            headers: {
                allNiches: 'All Niches',
                niches: 'Top Rated %ORIENTATION% Niches',
                listNiches: 'All %ORIENTATION% Films',
                listArchive: 'Archives',
                pornstars: 'Top Rated %ORIENTATION% Pornstars',
                relatedVideo: 'Click On Each Of These Related Films',
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
                prev: 'Prev',
                next: 'Next',
                previousMonth: 'Previous month',
                nextMonth: 'Next month',
                topFilms: 'Top films',
                backToMainPage: 'Back to main page',
                addToFavorite: 'Add to favorite',
                removeFromFavorite: 'Remove from favorite',
                cancel: 'Cancel',
            },
            footer: {
                forParents: 'Parents — Protect your children from adult content \
                    with these services:',
                disclaimer: 'Disclaimer: All models on this website are 18 years or older. \
                    videosection.com has a zero-tolerance policy against illegal pornography. \
                    We have no control over the content of these pages. All films and links \
                    are provided by 3rd parties. We take no responsibility for the content on any \
                    website which we link to, please use your own discretion.',
            },
            report: {
                title: 'Have you found a problem on the site? Please use this form to help us \
                    to fix it, or contact us directly',
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
                text: 'Take Note of: Our website is a completely automatic adult search engine \
                    focused on videos clips. We do not possess, produce, distribute or host \
                    any movies. All linked clips are automatically gathered and added into our \
                    system by our spider script. Thumbnails are auto-generated from the outside \
                    video contributors. All of the video content performed on our site \
                    are hosted and created by other websites that are not under our control. \
                    By your request we can remove thumbnail and link to the video, \
                    but not the original video file.',
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
            labels: {
                providedBy: 'zur Verfügung gestellt von',
                showing: 'Anzeigen',
            },
            headers: {
                allNiches: 'Alle Gruppen',
                niches: 'Die Besten %ORIENTATION% Gruppen',
                listNiches: 'Alle Verfügbaren %ORIENTATION% Video Clips',
                listArchive: 'Archiv',
                pornstars: 'Die Besten %ORIENTATION% Models',
                relatedVideo: 'Schau sie Dir an, diese ähnlichen Video Clips',
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
                prev: 'Vorh',
                next: 'Näch',
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
                disclaimer: 'Hinweis: Alle Models auf dieser Sex Seite sind 18 Jahre alt oder \
                    älter. de.videosection.com pflegt eine Null-Toleranz Einstellung gegenüber \
                    Pornografie die illegal ist. Wenn Du etwas entdecken solltest das illegal ist, \
                    schicke uns bitte den Link und wir werden diesen umgehend löschen. Alle \
                    Galerien, Links und Videos auf dieser Tube Seite unterliegen der Verantwortung \
                    Dritter, sichte diese bitten in eigener Verantwortung.',
            },
            report: {
                title: 'Bitte schicke uns eine Mitteilung mit dem Betreff "Missbrauch" \
                    mit dem direkten Link zu dem illegalen Material mit Hilfe \
                    dieses Eingabeformulars',
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
                text: 'Beachten Sie: Unsere Website ist eine vollautomatische Suchmaschine \
                    für Erwachsene, die sich auf Videoclips konzentriert. Wir besitzen, \
                    produzieren, vertreiben oder hosten keine Filme. Alle verknüpften Clips werden \
                    automatisch von unserem Spider-Skript erfasst und in unser System aufgenommen. \
                    Miniaturansichten werden automatisch von den externen Video-Mitwirkenden \
                    generiert. Alle auf unserer Website bereitgestellten Videoinhalte werden von \
                    anderen Websites gehostet und erstellt, die nicht unserer Kontrolle \
                    unterliegen. Auf Ihren Wunsch können wir Miniaturbilder und Links zum \
                    Video entfernen, nicht jedoch die Originalvideodatei.',
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
            labels: {
                providedBy: 'fornito da',
                showing: 'Mostrando',
            },
            headers: {
                allNiches: 'Tutte le Categorie',
                niches: 'Le %ORIENTATION% Categorie Più Votate',
                listNiches: 'Totale %ORIENTATION% Filmati',
                listArchive: 'Archivio',
                pornstars: 'Le %ORIENTATION% Pornostar Più Votate',
                relatedVideo: 'Sfoglia Questi Filmati Correlati',
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
                prev: 'Scor',
                next: 'Pros',
                previousMonth: 'Il mese scorso',
                nextMonth: 'Il prossimo mese',
                topFilms: 'Top film',
                backToMainPage: 'Torna alla pagina principale',
                addToFavorite: 'Aggiungi ai favoriti',
                removeFromFavorite: 'Rimuovi dai preferiti',
                cancel: 'Annulla',
            },
            footer: {
                forParents: 'Genitori – Proteggete i vostri bambini dai contenuti per adulti \
                    con questi servizi:',
                disclaimer: 'Disclaimer: it.videosection.com usa la politica di zero-tolleranza \
                    contro la pornografia illegale. Ogni materiale, incluse le gallerie e i link, \
                    sono forniti da terze parti e non sono controllati da noi. Non accettiamo \
                    nessuna responsabilità per il materiale dei siti ai quali colleghiamo. \
                    Vi preghiamo di usare la propria discrezione mentre guardate i link.',
            },
            report: {
                title: 'Hai trovato un problema sul sito? Utilizza questo modulo per aiutarci \
                    a risolverlo o contattaci direttamente',
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
                    completamente automatico, incentrato su clip video. Non possediamo, \
                    produciamo, distribuiamo o ospitiamo alcun film. Tutti i clip collegati \
                    vengono automaticamente raccolti e aggiunti nel nostro sistema dal nostro \
                    script spider. Le miniature sono generate automaticamente dai contributori \
                    video esterni. Tutti i contenuti video eseguiti sul nostro sito sono \
                    ospitati e creati da altri siti web che non sono sotto il nostro controllo. \
                    Tramite la tua richiesta, possiamo rimuovere la miniatura e il link al video, \
                    ma non il file video originale.`,
                succesText: 'Grazie per la segnalazione. Lo rivedremo presto',
                failureText: 'Qualcosa è andato storto. Riprovare più tardi',
                commentLabel: 'Commento',
                commentPlaceholder: 'Descrivi il problema',
            },
            orientation: {
                straight: 'Etero',
                gay: 'Gay',
                tranny: 'Transessuale',
            },
        },
        fra: {
            labels: {
                providedBy: 'fourni par',
                showing: 'Montrant',
            },
            headers: {
                allNiches: 'Toutes les Niches',
                niches: 'Les Niches %ORIENTATION% les Mieux Notée',
                listNiches: 'Tout %ORIENTATION% Scènes',
                listArchive: 'Les archives',
                pornstars: 'Les Pornstars %ORIENTATION% les Mieux Notée',
                relatedVideo: 'Regardez ces scènes au contenu lié',
            },
            search: {
                inputPlaceholder: 'Chercher sur Video Section',
                buttonTitle: 'Lancer une recherche',
            },
            navigation: {
                home: {title: 'Principale'},
                allNiches: {title: 'Toutes les Niches'},
                allMovies: {title: 'Tout les Tubes'},
                pornstars: {title: 'Pornstars'},
                favorite: {title: 'Favoris'},
            },
            ordering: {
                label: 'Genre',
                byDate: 'Date',
                byDuration: 'Longueur',
                byPopularity: 'Popularité',
                byRelevant: 'Pertinence',
            },
            buttons: {
                report: 'Signaler',
                favoriteMovies: 'Scènes',
                favoritePornstars: 'Pornstars',
                archive: 'Archive Scènes',
                prev: 'Préc',
                next: 'Proc',
                previousMonth: 'Le mois précédent',
                nextMonth: 'Le mois prochain',
                topFilms: 'Top Scènes',
                backToMainPage: 'Retour au menu',
                addToFavorite: 'À Favoris',
                removeFromFavorite: 'De Favoris',
                cancel: 'Annuler',
            },
            footer: {
                forParents: 'Protégez votre enfant et votre famille de la pornographie avec \
                    ces services:',
                disclaimer: 'Disclaimer: Tous les individus participant à ces vidéos sont \
                    majeures. fr.videosection.com a une politique de tolérance zéro \
                    contre la pornographie ILLEGALE. Si quoi que ce soit vous semble \
                    illégal, merci de nous en avertir par email au plus vite et nous \
                    retirerons la vidéo. Toutes les galeries et les liens sont pourvus \
                    par de tierces parties et non par nos soins.',
            },
            report: {
                title: `S'il vous plaît envoyez-nous une demande avec le sujet "Abuse" avec \
                    le lien direct vers le contenu illégal via ce formulaire`,
                duration: 'Durée',
                added: 'Ajoutée',
                hosted: 'Hébergé par',
                found: 'Trouvé sur la page',
                on: 'sur',
                radioLabel: 'Signaler la raison',
                radioButtons: {
                    other: 'Autre',
                    deleted: 'Le film a été supprimé',
                    doesntPlay: 'Le film ne joue pas',
                    badThumb: 'Basse qualité de la vignette',
                    young: 'La personne sur la vignette a l\'air trop jeune',
                    incest: 'Inceste',
                    animals: 'Bestialité (sexe avec des animaux)',
                    otherScat: 'Autres contenus inappropriés (viol, sang, sésame, etc ...)',
                    copyright: 'Violation de copyright',
                },
                text: `Prenez note de: Notre site Web est un moteur de recherche pour adultes \
                    entièrement automatique, centré sur les clips vidéo. Nous ne possédons, \
                    ne produisons, ne distribuons et n'hébergeons aucun film. Tous les clips \
                    liés sont automatiquement rassemblés et ajoutés à notre système par notre \
                    script spider. Les miniatures sont générées automatiquement à partir des \
                    contributeurs vidéo externes. Tout le contenu vidéo diffusé sur notre site \
                    est hébergé et créé par d'autres sites Web qui ne sont pas sous notre \
                    contrôle. À votre demande, nous pouvons supprimer les vignettes et les \
                    liens vers la vidéo, mais pas le fichier vidéo d'origine.`,
                succesText: 'Je vous remercie pour votre rapport. Nous allons le revoir bientôt',
                failureText: 'Quelque chose s\'est mal passé. Réessayez plus tard',
                commentLabel: 'Commentaire',
                commentPlaceholder: 'Décris le problème',
            },
            orientation: {
                straight: 'Hétéro',
                gay: 'Homo',
                tranny: 'Transexuel',
            },
        },
        spa: {
            labels: {
                providedBy: 'proporcionado por',
                showing: 'Demostración',
            },
            headers: {
                allNiches: 'Todas las Nichos',
                niches: 'Las Más Buscadas %ORIENTATION% Nichos',
                listNiches: '%ORIENTATION% Escenas Totales',
                listArchive: 'Archivo',
                pornstars: 'Las Más Buscadas %ORIENTATION% Pornstars',
                relatedVideo: 'Revisar los Escenas Relacionados',
            },
            search: {
                inputPlaceholder: 'Palabra va aquí ...',
                buttonTitle: 'Ejecutar búsqueda',
            },
            navigation: {
                home: {title: 'Principal'},
                allNiches: {title: 'Todas las Nichos'},
                allMovies: {title: 'Todas Películas'},
                pornstars: {title: 'Pornstars'},
                favorite: {title: 'Favoritos'},
            },
            ordering: {
                label: 'Ordenar',
                byDate: 'Cita',
                byDuration: 'Plazo',
                byPopularity: 'Distinguido',
                byRelevant: 'Principal',
            },
            buttons: {
                report: 'Informe',
                favoriteMovies: 'Escenas',
                favoritePornstars: 'Pornstars',
                archive: 'Archivo escenas',
                prev: 'Ante',
                next: 'Próx',
                previousMonth: 'Mes anterior',
                nextMonth: 'Próximo mes',
                topFilms: 'Mejores peliculas',
                backToMainPage: 'Volver a la Página Principal',
                addToFavorite: 'Agregar a "Favoritos',
                removeFromFavorite: 'Eliminar de favorito',
                cancel: 'Cancelar',
            },
            footer: {
                forParents: 'Los padres - Proteja a sus hijos del contenido para adultos con \
                    estos servicios:',
                disclaimer: 'Descargo de responsabilidad: Todo el contenido enviado por terceros \
                en es.videosection.com es responsabilidad exclusiva de dichos terceros. \
                Tenemos una política de tolerancia cero contra la pornografía ilegal. \
                No nos hacemos responsables por el contenido de cualquier sitio web que este \
                vinculado, por favor, utilice su propio criterio mientras navega por los enlaces.',
            },
            report: {
                title: `¿Has encontrado algún problema en el sitio? Utilice este formulario para \
                    ayudarnos a solucionarlo o contáctenos directamente`,
                duration: 'Duración',
                added: 'Adicional',
                hosted: 'Alojado por',
                found: 'Encontrado en la página',
                on: 'en',
                radioLabel: 'Motivo del informe',
                radioButtons: {
                    other: 'Otro',
                    deleted: 'La pelicula ha sido borrada',
                    doesntPlay: 'La pelicula no se reproduce',
                    badThumb: 'Baja calidad de la miniatura.',
                    young: 'La persona en la miniatura se ve muy joven',
                    incest: 'Incesto',
                    animals: 'Beastialidad (sexo con animales)',
                    otherScat: 'Otro contenido inapropiado (violación, sangre, excremento, \
                        etc ...)',
                    copyright: 'Violación de derechos de autor',
                },
                text: `Tome nota de: Nuestro sitio web es un motor de búsqueda para adultos \
                    completamente automático centrado en clips de videos. No poseemos, \
                    producimos, distribuimos ni alojamos películas. Todos los clips vinculados se \
                    recopilan automáticamente y se agregan a nuestro sistema mediante nuestro \
                    script Spider. Las miniaturas se generan automáticamente a partir de los \
                    colaboradores externos del video. Todo el contenido de video realizado en \
                    nuestro sitio está alojado y creado por otros sitios web que no están bajo \
                    nuestro control. Si lo solicita, podemos eliminar la miniatura y el enlace \
                    al video, pero no el archivo de video original.`,
                succesText: 'Gracias por tu informe. Lo revisaremos pronto',
                failureText: 'Algo salió mal. Inténtalo más tarde',
                commentLabel: 'Comentario',
                commentPlaceholder: 'Describe el problema',
            },
            orientation: {
                straight: 'Derecho',
                gay: 'Homosexual',
                tranny: 'Transexual',
            },
        },
        por: {
            labels: {
                providedBy: 'fornecido por',
                showing: 'Mostrando',
            },
            headers: {
                allNiches: 'Todas as Niches',
                niches: 'As Melhores Niches %ORIENTATION%',
                listNiches: 'Todos %ORIENTATION% Videos Tube',
                listArchive: 'Arquivos',
                pornstars: 'As Melhores Pornstars %ORIENTATION%',
                relatedVideo: 'Aprecia Estes Videos tube Relacionados',
            },
            search: {
                inputPlaceholder: 'Palavra chave ou pornstar nome',
                buttonTitle: 'Executar pesquisa',
            },
            navigation: {
                home: {title: 'Inicial'},
                allNiches: {title: 'Todas as Niches'},
                allMovies: {title: 'Todos os Vids tube'},
                pornstars: {title: 'Pornstars'},
                favorite: {title: 'Favoritos'},
            },
            ordering: {
                label: 'Tipo',
                byDate: 'Data',
                byDuration: 'Duração',
                byPopularity: 'Popular',
                byRelevant: 'Relacionado',
            },
            buttons: {
                report: 'Reportar',
                favoriteMovies: 'Videos Tube',
                favoritePornstars: 'Pornstars',
                archive: 'Arquivo videos tube',
                prev: 'Ante',
                next: 'Próx',
                previousMonth: 'Mês anterior',
                nextMonth: 'Próximo mês',
                topFilms: 'Top videos tube',
                backToMainPage: 'Voltar à Página Principal',
                addToFavorite: 'para Favoritos',
                removeFromFavorite: 'dos Favoritos',
                cancel: 'Cancelar',
            },
            footer: {
                forParents: 'Mantem as tuas crianças protegidas online, utiliza estes serviços \
                    para protejer a tua família:',
                disclaimer: 'Isenção de responsabilidade: Todo o conteúdo submetido por \
                    terceiros em pt.videosection.com é da exclusiva responsabilidade desses \
                    terceiros. Nós temos uma política de tolerância zero contra a pornografia \
                    ilegal. Não nos responsabilizamos pelo conteúdo de qualquer site ao qual nos \
                    vinculemos. Por favor, use seu próprio critério enquanto navega pelos links.',
            },
            report: {
                title: 'Você encontrou algum problema no site? Por favor, use este formulário \
                    para nos ajudar a corrigi-lo, ou entre em contato conosco diretamente',
                duration: 'Duração',
                added: 'Adicionado',
                hosted: 'Hospedado por',
                found: 'Encontrado na página',
                on: 'em',
                radioLabel: 'Comunicar razão',
                radioButtons: {
                    other: 'De outros',
                    deleted: 'Filme foi deletado',
                    doesntPlay: 'O filme não toca',
                    badThumb: 'Baixa qualidade da miniatura',
                    young: 'Pessoa na miniatura parece muito jovem',
                    incest: 'Incesto',
                    animals: 'Bialialidade (sexo com animais)',
                    otherScat: 'Outro conteúdo inadequado (estupro, sangue, sangue, etc ...)',
                    copyright: 'Violação de direitos autorais',
                },
                text: `Tome nota: O nosso site é um motor de busca para adultos totalmente \
                    automático, focado em vídeos. Nós não possuímos, produzimos, distribuímos \
                    nem hospedamos nenhum filme. Todos os clipes vinculados são automaticamente \
                    reunidos e adicionados ao nosso sistema pelo nosso script de aranha. As \
                    miniaturas são geradas automaticamente pelos colaboradores de vídeo externos. \
                    Todo o conteúdo de vídeo realizado em nosso site é hospedado e criado por \
                    outros sites que não estão sob nosso controle. A seu pedido, podemos \
                    remover a miniatura e o link para o vídeo, mas não o arquivo de vídeo \
                    original.`,
                succesText: 'Obrigado pelo seu relatório. Vamos revisá-lo em breve',
                failureText: 'Algo deu errado. Tente mais tarde',
                commentLabel: 'Comente',
                commentPlaceholder: 'Descreva o problema',
            },
            orientation: {
                straight: 'Heterossexual',
                gay: 'Gays',
                tranny: 'Travesti',
            },
        },
        swe: {
            labels: {
                providedBy: 'tillhandahålls av',
                showing: 'Som visar',
            },
            headers: {
                allNiches: 'Alla Kategorier',
                niches: 'Bästa %ORIENTATION% Kategorier',
                listNiches: 'Alla %ORIENTATION% Klipp',
                listArchive: 'Arkiv',
                pornstars: 'Bästa %ORIENTATION% Porrstjärnor',
                relatedVideo: 'Utforska Dessa Relaterade Klipp',
            },
            search: {
                inputPlaceholder: 'Skriv nyckelordet här...',
                buttonTitle: 'Kör sök',
            },
            navigation: {
                home: {title: 'Hemsida'},
                allNiches: {title: 'Alla Kategorier'},
                allMovies: {title: 'Alla Scener'},
                pornstars: {title: 'Porrstjärnor'},
                favorite: {title: 'Favoriter'},
            },
            ordering: {
                label: 'Sortera',
                byDate: 'Datum',
                byDuration: 'Varaktighet',
                byPopularity: 'Rankning',
                byRelevant: 'Instämmande',
            },
            buttons: {
                report: 'Rapportera',
                favoriteMovies: 'Klipp',
                favoritePornstars: 'Porrstjärnor',
                archive: 'Arkiv klipp',
                prev: 'Förr',
                next: 'Näst',
                previousMonth: 'Förra månaden',
                nextMonth: 'Nästa månad',
                topFilms: 'Top klipp',
                backToMainPage: 'Tillbaka till Huvudsidan',
                addToFavorite: 'från Favoriter',
                removeFromFavorite: 'till Favoriter',
                cancel: 'Annullera',
            },
            footer: {
                forParents: 'Barnsäkert och föräldrakontroll från vuxeninnehåll \
                    med dessa tjänster.:',
                disclaimer: 'Ansvarsfriskrivning: Allt innehåll som lämnats av tredje part \
                    på sv.videosection.com är ensam ansvar för dessa tredje parter. Vi har \
                    en nolltoleranspolitik mot olaglig pornografi. Vi ansvarar inte för \
                    innehållet på någon webbplats som vi länkar till, använd din egen \
                    diskretion när du surfar på länkarna.',
            },
            report: {
                title: 'Har du hittat ett problem på webbplatsen? Använd det här formuläret \
                    för att hjälpa oss att fixa det, eller kontakta oss direkt',
                duration: 'Varaktighet',
                added: 'Lagt till',
                hosted: 'Tillhandahålls av',
                found: 'Hittade på sidan',
                on: 'på',
                radioLabel: 'Anmäl rapport',
                radioButtons: {
                    other: 'Andra',
                    deleted: 'Filmen har raderats',
                    doesntPlay: 'Film spelas inte',
                    badThumb: 'Liten kvalitet på miniatyrbilden',
                    young: 'Personen på miniatyrbilden ser för ung ut',
                    incest: 'Incest',
                    animals: 'Beastiality (sex med djur)',
                    otherScat: 'Annat olämpligt innehåll (våldtäkt, blod, scat etc ...)',
                    copyright: 'Upphovsrättsintrång',
                },
                text: `Observera: Vår webbplats är en helt automatisk vuxen sökmotor med \
                    inriktning på videoklipp. Vi äger inte, producerar, distribuerar eller värd \
                    några filmer. Alla länkade klipp samlas automatiskt in och läggs till i vårt \
                    system av vårt spindelskript. Miniatyrbilder genereras automatiskt från de \
                    yttre videoprediterarna. Allt videoinnehåll som utförs på vår webbplats är \
                    värd och skapat av andra webbplatser som inte är under vår kontroll. På din \
                    begäran kan vi ta bort miniatyrbilden och länka till videon, men inte den \
                    ursprungliga videofilen.`,
                succesText: 'Tack för din rapport. Vi kommer att granska det snart',
                failureText: 'Något gick fel. Försök igen senare',
                commentLabel: 'Kommentar',
                commentPlaceholder: 'Beskriv problemet',
            },
            orientation: {
                straight: 'Straighta',
                gay: 'Bögiga',
                tranny: 'Shemale',
            },
        },
        nld: {
            labels: {
                providedBy: 'geleverd door',
                showing: 'Tonen',
            },
            headers: {
                allNiches: 'Alle Groepen',
                niches: 'Hoog Gewaardeerde %ORIENTATION% Groepen',
                listNiches: '%ORIENTATION% Vids - Samenvatting',
                listArchive: 'Archief',
                pornstars: 'Hoog Gewaardeerde %ORIENTATION% Modellen',
                relatedVideo: 'Bekijk Deze Gerelateerde Vids',
            },
            search: {
                inputPlaceholder: 'Zoekveld',
                buttonTitle: 'Voer een zoekopdracht uit',
            },
            navigation: {
                home: {title: 'Hoofd'},
                allNiches: {title: 'Alle Groepen'},
                allMovies: {title: 'Alle Video\'s'},
                pornstars: {title: 'Modellen'},
                favorite: {title: 'Favorieten'},
            },
            ordering: {
                label: 'Sorteer',
                byDate: 'Tijdsduur',
                byDuration: 'Lengte',
                byPopularity: 'Populariteit',
                byRelevant: 'Relevantie',
            },
            buttons: {
                report: 'Meld',
                favoriteMovies: 'Vids',
                favoritePornstars: 'Modellen',
                archive: 'Archief vids',
                prev: 'Vori',
                next: 'Volg',
                previousMonth: 'Vorige maand',
                nextMonth: 'Volgende maand',
                topFilms: 'Top Vids',
                backToMainPage: 'Terug naar de Hoofdpagina',
                addToFavorite: 'naar Favorieten',
                removeFromFavorite: 'uit Favorieten',
                cancel: 'Annuleren',
            },
            footer: {
                forParents: 'Kindveiligheid en ouderlijk toezicht op inhoud voor \
                    volwassenen met deze diensten:',
                disclaimer: 'Disclaimer: nl.videosection.com voert een zerotolerancebeleid \
                    tegen illegale pornografie. Alle modellen op deze website waren ouder dan \
                    18 toen de foto\'s gemaakt werden. De inhoud van deze website is niet \
                    geschikt voor minderjarigen. Probeer te voorkomen dat deze website \
                    bekeken wordt door mensen onder de 18 jaar. Alle galerieën en links \
                    worden door derde partijen ter beschikking gesteld en automatisch \
                    aan onze site toegevoegd.',
            },
            report: {
                title: 'Heb je een probleem gevonden op de site? Gebruik dit formulier om ons \
                    te helpen het probleem op te lossen, of neem direct contact met ons op',
                duration: 'Looptijd',
                added: 'Toegevoegd',
                hosted: 'Gepresenteerd door',
                found: 'Gevonden op pagina',
                on: 'op',
                radioLabel: 'Rapporteer reden',
                radioButtons: {
                    other: 'Anders',
                    deleted: 'Film is verwijderd',
                    doesntPlay: 'Film speelt niet',
                    badThumb: 'Lage kwaliteit van de miniatuur',
                    young: 'Persoon op de miniatuur ziet er te jong uit',
                    incest: 'Incest',
                    animals: 'Beastialiteit (seks met dieren)',
                    otherScat: 'Andere ongepaste inhoud (verkrachting, bloed, scat, enz ...)',
                    copyright: 'Schending van auteursrechten',
                },
                text: `Let op: onze website is een volledig automatische volwassen zoekmachine \
                    gericht op videoclips. We bezitten, produceren, distribueren of hosten geen \
                    films. Alle gekoppelde clips worden automatisch verzameld en toegevoegd aan \
                    ons systeem door ons spiderscript. Thumbnails worden automatisch gegenereerd \
                    door externe bijdragers. Alle video-inhoud die op onze site wordt uitgevoerd, \
                    wordt gehost en gemaakt door andere websites die niet onder onze controle \
                    vallen. Op uw verzoek kunnen we de miniatuur verwijderen en naar de video \
                    linken, maar niet het originele videobestand.`,
                succesText: 'Bedankt voor je verslag. We zullen het binnenkort beoordelen',
                failureText: 'Er is iets fout gegaan. Probeer het later opnieuw',
                commentLabel: 'Commentaar',
                commentPlaceholder: 'Beschrijf het probleem',
            },
            orientation: {
                straight: 'Hetero',
                gay: 'Gay',
                tranny: 'Shemale',
            },
        },
        fin: {
            labels: {
                providedBy: 'toimittamat',
                showing: 'Näytetään',
            },
            headers: {
                allNiches: 'Kaikki Nichet',
                niches: 'Suositut %ORIENTATION% Nichet',
                listNiches: 'Kaikki %ORIENTATION% Videoita',
                listArchive: 'Arkisto',
                pornstars: 'Suositut %ORIENTATION% Pornotähtiä',
                relatedVideo: 'Tsekkaa Nämä Vastaavat Videoita',
            },
            search: {
                inputPlaceholder: 'Hakulaatikko',
                buttonTitle: 'Suorita haku',
            },
            navigation: {
                home: {title: 'Etusivu'},
                allNiches: {title: 'Kaikki Nichet'},
                allMovies: {title: 'Leffat'},
                pornstars: {title: 'Pornotähtiä'},
                favorite: {title: 'Suosikki'},
            },
            ordering: {
                label: 'Lajittele',
                byDate: 'Päiväys',
                byDuration: 'Kesto',
                byPopularity: 'Suositut',
                byRelevant: 'Tärkeimmät',
            },
            buttons: {
                report: 'Ilmianna',
                favoriteMovies: 'Pornotähtiä',
                favoritePornstars: 'Videoita',
                archive: 'Arkisto videoita',
                prev: 'Viim',
                next: 'Ensi',
                previousMonth: 'Viime kuukausi',
                nextMonth: 'Ensikuussa',
                topFilms: 'Parhaat videoita',
                backToMainPage: 'Takaisin Etusivulle',
                addToFavorite: 'Suosikkeihin',
                removeFromFavorite: 'Suosikeista',
                cancel: 'Peruuttaa',
            },
            footer: {
                forParents: 'Vanhemmat - Suojelkaa lapsianne aikuissisällöltä näillä palveluilla:',
                disclaimer: 'Vastuuvapauslauseke: Kaikki tämän sivuston mallit ovat \
                18-vuotiaita tai vanhempia. fi.videosection.com noudattaa nollatoleranssia \
                LAITONTA pornografiaa vastaan. Jos löydät sivustolta jotain laitonta, ole \
                hyvä ja ilmoita siitä meille sähköpostilla, ja poistamme sen niin nopeasti kuin \
                mahdollista. Kaikki sivuston kuvagalleriat ja linkit tulevat meille kolmansien \
                osapuolien kautta. Me emme voi valvoa näiden sivujen sisältöä, sillä kaikki \
                aineisto lisätään automaattisesti.',
            },
            report: {
                title: 'Oletko löytänyt ongelman sivustolla? Käytä tätä lomaketta, jotta \
                    voimme korjata sen tai ottaa meihin yhteyttä suoraan',
                duration: 'Kesto',
                added: 'lisätty',
                hosted: 'Isännöi',
                found: 'Löydetty sivulla',
                on: 'päällä',
                radioLabel: 'Ilmoita syystä',
                radioButtons: {
                    other: 'Muut',
                    deleted: 'Elokuva on poistettu',
                    doesntPlay: 'Elokuva ei toista',
                    badThumb: 'Pienoiskuvan alhainen laatu',
                    young: 'Pikkukuvassa oleva henkilö näyttää liian nuorelta',
                    incest: 'insesti',
                    animals: 'Beastiality (sukupuoli eläinten kanssa)',
                    otherScat: 'Muu epäasianmukainen sisältö (raiskaus, veri, huijaus jne.)',
                    copyright: 'Tekijänoikeusrikkomus',
                },
                text: `Huomaa: Sivustomme on täysin automaattinen aikuisten hakukone, joka \
                    keskittyy videoleikkeisiin. Emme hallitse, tuota, levitä tai isännöi \
                    elokuvia. Kaikki linkitetyt leikkeet kerätään automaattisesti ja lisätään \
                    järjestelmään hämähäkkikirjoituksemme. Pikkukuvat luodaan automaattisesti \
                    ulkopuolisilta videokuvaajilta. Kaikki sivustossamme suoritetut videosisältöjä \
                    ylläpitävät ja luovat muut sivustot, jotka eivät ole meidän hallinnassamme. \
                    Pyydämme voimme poistaa pikkukuvan ja linkin videoon, \
                    mutta ei alkuperäistä videotiedostoa.`,
                succesText: 'Kiitos mietinnöstäsi. Tarkistamme sen pian',
                failureText: 'Jotain meni pieleen. Yritä myöhemmin uudelleen',
                commentLabel: 'Kommentti',
                commentPlaceholder: 'Kuvaile ongelmaa',
            },
            orientation: {
                straight: 'Hetero',
                gay: 'Homo',
                tranny: 'Shemale',
            },
        },
        rus: {
            labels: {
                providedBy: 'предоставлено',
                showing: 'Показано',
            },
            headers: {
                allNiches: 'Все Группы',
                niches: 'Лучшие %ORIENTATION% Группы',
                listNiches: 'Все %ORIENTATION% видео',
                listArchive: 'Архивы',
                pornstars: 'Модели',
                relatedVideo: 'Лучшие похожие ролики',
            },
            search: {
                inputPlaceholder: 'Искать на сайте',
                buttonTitle: 'Начать поиск',
            },
            navigation: {
                home: {title: 'Главная'},
                allNiches: {title: 'Все Группы'},
                allMovies: {title: 'Все Видео'},
                pornstars: {title: 'Модели'},
                favorite: {title: 'Избранное'},
            },
            ordering: {
                label: 'Сортировка',
                byDate: 'Новые',
                byDuration: 'Длительность',
                byPopularity: 'Рейтинг',
                byRelevant: 'Тематика',
            },
            buttons: {
                report: 'Жалоба',
                favoriteMovies: 'Видео',
                favoritePornstars: 'Модели',
                archive: 'Архив видео',
                prev: 'Пред',
                next: 'След',
                previousMonth: 'Предыдущий месяц',
                nextMonth: 'Следующий месяц',
                topFilms: 'Топ видео',
                backToMainPage: 'Вернуться на главную',
                addToFavorite: 'В избранное',
                removeFromFavorite: 'Из избранного',
                cancel: 'Отменить',
            },
            footer: {
                forParents: 'Родители - Защитите детей от посещения сайтов для взрослых с \
                    помощью этих сервисов:',
                disclaimer: 'Отказ от ответственности: ru.videosection.com имеет политику \
                    нетерпимости в отношении незаконной порнографии. На момент фотосъемки все \
                    модели, представленные на этом сайте, были старше 18 лет. Содержание этого \
                    сайта не подходит для несовершеннолетних. Все галереи и ссылки предоставлены \
                    третьими лицами и добавлены на наш сайт автоматически.',
            },
            report: {
                title: 'Вы нашли проблему на сайте? Пожалуйста, используйте эту форму, \
                    чтобы помочь нам исправить это, или свяжитесь с нами напрямую',
                duration: 'Продолжительность',
                added: 'Добавлено',
                hosted: 'Предоставлено',
                found: 'Найдено на странице',
                on: 'на',
                radioLabel: 'Причина жалобы',
                radioButtons: {
                    other: 'Другая',
                    deleted: 'Фильм был удален',
                    doesntPlay: 'Фильм не воспроизводится',
                    badThumb: 'Низкое качество миниатюры',
                    young: 'Человек на миниатюре выглядит слишком молодым',
                    incest: 'Инцест',
                    animals: 'Зоофилия (секс с животными)',
                    otherScat: 'Другое неприемлемое содержание (изнасилование, кровь и т. д.)',
                    copyright: 'Нарушение авторских прав',
                },
                text: `Обратите внимание: наш сайт представляет собой полностью автоматический \
                    поисковый движок для взрослых, ориентированный на видеоролики. Мы не владеем, \
                    не производим, не распространяем и не размещаем фильмы. Все связанные клипы \
                    автоматически собираются и добавляются в нашу систему с помощью нашего \
                    скрипта-паука. Миниатюры создаются автоматически из сторонних авторов видео. \
                    Весь видеоконтент, размещенный на нашем сайте, размещен и создан другими \
                    сайтами, которые не находятся под нашим контролем. По вашему запросу мы можем \
                    удалить миниатюру и ссылку на видео, но не оригинальный видеофайл.`,
                succesText: 'Спасибо за вашу жалобу. Мы скоро рассмотрим её',
                failureText: 'Что-то пошло не так. Попробуйте позже',
                commentLabel: 'Комментарий',
                commentPlaceholder: 'Опишите проблему',
            },
            orientation: {
                straight: 'Гетеро',
                gay: 'Геи',
                tranny: 'Транссексуал',
            },
        },
        tur: {
            labels: {
                providedBy: 'tarafından sunulan',
                showing: 'Gösterme',
            },
            headers: {
                allNiches: 'Tüm Gruplar',
                niches: 'En Popüler %ORIENTATION% Gruplar',
                listNiches: '%ORIENTATION% Videolar Toplam',
                listArchive: 'Arşiv',
                pornstars: 'En Popüler %ORIENTATION% Modeller',
                relatedVideo: 'Alakalı Olarak Şunlara Bir Bakın',
            },
            search: {
                inputPlaceholder: 'Video Section\'de Ara',
                buttonTitle: 'Arama çalıştır',
            },
            navigation: {
                home: {title: 'Anasayfa'},
                allNiches: {title: 'Tüm Gruplar'},
                allMovies: {title: 'Tüm Sahneler'},
                pornstars: {title: 'Modeller'},
                favorite: {title: 'Favoriler'},
            },
            ordering: {
                label: 'Sırala',
                byDate: 'Tarihe',
                byDuration: 'Süresine',
                byPopularity: 'Popüler',
                byRelevant: 'Alakalı',
            },
            buttons: {
                report: 'Rapor Et',
                favoriteMovies: 'Videolar',
                favoritePornstars: 'Modeller',
                archive: 'Arşiv videolar',
                prev: 'Geçt',
                next: 'Gele',
                previousMonth: 'Geçtiğimiz ay',
                nextMonth: 'Gelecek ay',
                topFilms: 'Top videolar',
                backToMainPage: 'Ana Sayfaya geri dön',
                addToFavorite: 'Favorilere git',
                removeFromFavorite: 'Favoriler den',
                cancel: 'Iptal etmek',
            },
            footer: {
                forParents: 'Çocuklarınızı internette güvende tutun. Aşağıdaki hizmetleri \
                    kullanarak ailenizi pornografiden koruyabilirsiniz:',
                disclaimer: 'Yasal Uyarı: Bu sitedeki tüm modeller 18 yaşının üstündedir. \
                    tr.videosection.com yasal olmayan pornografiye karşı sıfır tolerans \
                    politikası uygulamaktadır. Bu sayfaların içeriği üzerinde bir kontrolümüz \
                    bulunmamaktadır. Sitemizdeki tüm linkler ve galeriler üçüncü şahıslar \
                    tarafından sunulmakta olup, sitemize otomatik olarak yüklenmektedir. \
                    Link verilen hiçbir sitenin içeriğinden sorumlu olmadığımızdan, kendi \
                    tercihinizle bu siteleri ziyaret edeceğinizi hatırlatmak isteriz.',
            },
            report: {
                title: 'Sitede bir sorun mu buldunuz? Lütfen bu formu düzeltmemize yardımcı \
                    olmak için kullanın veya doğrudan bizimle iletişime geçin.',
                duration: 'Süre',
                added: 'Katma',
                hosted: 'Tarafından barındırılan',
                found: 'Sayfada bulundu',
                on: 'üzerinde',
                radioLabel: 'Sebep bildir',
                radioButtons: {
                    other: 'Diğer',
                    deleted: 'Film silindi',
                    doesntPlay: 'Film oynamıyor',
                    badThumb: 'Küçük resmin kalitesi',
                    young: 'Küçük resimdeki kişi çok genç görünüyor',
                    incest: 'Ensest',
                    animals: 'Hayvancılık (hayvanlarla seks)',
                    otherScat: 'Diğer uygunsuz içerik (tecavüz, kan, scat vb.)',
                    copyright: 'Telif hakkı ihlali',
                },
                text: `Dikkat: Web sitemiz video kliplere odaklanan tamamen otomatik bir yetişkin \
                    arama motorudur. Herhangi bir filme sahip değiliz, üretmiyoruz, dağıtmıyoruz \
                    veya barındırmıyoruz. Bağlantılı tüm klipler otomatik olarak toplanır ve \
                    örümcek senaryomuzla sistemimize eklenir. Küçük resimler, dış video \
                    katılımcılarından otomatik olarak oluşturulur. Sitemizde yapılan tüm video \
                    içerikleri, kontrolümüz altında olmayan diğer web siteleri tarafından \
                    barındırılmaktadır. İsteğinize göre, küçük videoyu kaldırabilir ve videonun \
                    bağlantısını ancak orijinal video dosyasını kaldırabiliriz.`,
                succesText: 'Raporun için teşekkür ederim. Yakında gözden geçireceğiz',
                failureText: 'Bir şeyler yanlış gitti. Daha sonra tekrar deneyin',
                commentLabel: 'Yorum Yap',
                commentPlaceholder: 'Sorunu tarif et',
            },
            orientation: {
                straight: 'Hetero',
                gay: 'Gayler',
                tranny: 'Travestiler',
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
