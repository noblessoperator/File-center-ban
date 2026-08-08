/* =========================================================
WA REPORT FILE CENTER
SCRIPT.JS
VERSION 2.0 — 2026
========================================================= */

"use strict";

/* =========================================================
CONFIGURATION
========================================================= */

/*
=========================================================
FICHIERS

Pour chaque fichier :

name        = nom affiché
type        = type du fichier
size        = taille affichée
url         = lien réel du fichier
available   = true/false
description = description courte

IMPORTANT :
Tu peux remplacer les URLs ci-dessous par tes propres
liens MediaFire, Google Drive, Dropbox, GitHub, etc.
=========================================================

*/

const FILES = [

{
    name: "WA_REPORT_FILE_01.txt",
    type: "TXT",
    size: "1.05 KB",
    url: "https://www.mediafire.com/file/hxqjutwvuqth1ki/WA-REPORT-FILE-1.txt/file",
    available: true,
    description: "Document TXT de démonstration."
},

{
    name: "WA_REPORT_FILE_02.txt",
    type: "TXT",
    size: "483.00 B",
    url: "https://www.mediafire.com/file/bz0y4w5tb9vtf4c/WA-REPORT-FILE-2.txt/file",
    available: true,
    description: "Document TXT de démonstration."
},

{
    name: "WA_REPORT_FILE_03.txt",
    type: "TXT",
    size: "1.62 KB",
    url: "https://www.mediafire.com/file/rjxls953gp62xao/WA-REPORT-FILE-3.txt/file",
    available: true,
    description: "Document TXT de démonstration."
},

{
    name: "WA_REPORT_FILE_04.txt",
    type: "TXT",
    size: "1.00 KB",
    url: "https://www.mediafire.com/file/blujjqq29l2k6da/WA-REPORT-FILE-4.txt/file",
    available: true,
    description: "Document TXT de démonstration."
},

{
    name: "WA_REPORT_FILE_05.txt",
    type: "TXT",
    size: "1.61 KB",
    url: "https://www.mediafire.com/file/1df2szy1fukauju/WA-REPORT-FILE-5.txt/file",
    available: true,
    description: "Document TXT de démonstration."
},

{
    name: "WA_REPORT_FILE_06.txt",
    type: "TXT",
    size: "3.88 KB",
    url: "https://www.mediafire.com/file/7kx8z9rp5y12r5p/WA-REPORT-FILE-6.txt/file",
    available: true,
    description: "Document TXT de démonstration."
},

{
    name: "WA_REPORT_FILE_07.txt",
    type: "TXT",
    size: "1.34 KB",
    url: "https://www.mediafire.com/file/a3lzm10bvdunf4r/WA-REPORT-FILE-7.txt/file",
    available: true,
    description: "Document TXT de démonstration."
},

{
    name: "WA_REPORT_FILE_08.txt",
    type: "TXT",
    size: "1.02 KB",
    url: "https://www.mediafire.com/file/3o1gbfn4b0rt79g/WA-REPORT-FILE-8.txt/file",
    available: true,
    description: "Document TXT de démonstration."
},

{
    name: "WA_REPORT_FILE_09.txt",
    type: "TXT",
    size: "888.09 B",
    url: "https://www.mediafire.com/file/e7gwy32krmn5b2v/WA-REPORT-FILE-9.txt/file",
    available: true,
    description: "Document TXT de démonstration."
},

{
    name: "WA_REPORT_FILE_10.txt",
    type: "TXT",
    size: "2.52 KB",
    url: "https://www.mediafire.com/file/y0r6q5aqlxnprxe/WA-REPORT-FILE-10.txt/file",
    available: true,
    description: "Document TXT de démonstration."
}

];

/*
=========================================================
5 LIENS EXTERNES

Remplace les URLs par tes propres liens.
Ils seront automatiquement affichés dans l'onglet LINKS.
=========================================================

*/

const EXTERNAL_LINKS = [

{
    name: "Website Ban X",
    url: "https://example.com/",
    description: "Site web principal.",
    icon: "🪩"
},


    {
        name: "Help",
        url: "https://wa.me/qr/2BLXPZNJR6VED1",
        description: "Contactez-moi.",
        icon: "↩️"
    },


{
    name: "Whatsapp Group",
    url: "https://chat.whatsapp.com/GYKP8XoPbwIEqqwDwt6cmy",
    description: "Team Nobless.",
    icon: "👥"
},

{
    name: "WhatsApp Channel",
    url: "https://whatsapp.com/channel/0029VbAzHEiA2pLFh3XWps0x",
    description: "Plus Tools & Actus.",
    icon: "🏟"
},

{
    name: "Telegram",
    url: "https://t.me/Nobless_Tolls_Free",
    description: "Canal et communauté.",
    icon: "➤"
}

];

/* =========================================================
DOM
========================================================= */

const DOM = {

pages:
    document.querySelectorAll(".page"),

navButtons:
    document.querySelectorAll(".nav-button"),

footerButtons:
    document.querySelectorAll(".footer-links button"),

fileList:
    document.getElementById("fileList"),

linksList:
    document.getElementById("linksList"),

search:
    document.getElementById("search"),

clearSearch:
    document.getElementById("clearSearch"),

emptyState:
    document.getElementById("emptyState"),

fileCount:
    document.getElementById("fileCount"),

totalFiles:
    document.getElementById("totalFiles"),

availableFiles:
    document.getElementById("availableFiles"),

totalDownloads:
    document.getElementById("totalDownloads"),

totalLinks:
    document.getElementById("totalLinks"),

toast:
    document.getElementById("toast")

};

/* =========================================================
STATE
========================================================= */

const STATE = {

currentPage: "files",

searchTerm: "",

downloads: 0

};

/* =========================================================
STORAGE
========================================================= */

function loadDownloadCount() {

try {

    const stored =
        localStorage.getItem(
            "wa_report_downloads"
        );

    const number =
        Number.parseInt(
            stored,
            10
        );

    if (
        Number.isFinite(number) &&
        number >= 0
    ) {

        STATE.downloads = number;

    }

} catch (error) {

    STATE.downloads = 0;

}

}

function saveDownloadCount() {

try {

    localStorage.setItem(
        "wa_report_downloads",
        String(STATE.downloads)
    );

} catch (error) {

    /*
        localStorage peut être indisponible
        dans certains navigateurs.
    */

}

}

/* =========================================================
UTILITY
========================================================= */

function escapeHTML(value) {

return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}

function safeURL(value) {

try {

    const url =
        new URL(
            String(value),
            window.location.href
        );

    const allowedProtocols = [
        "http:",
        "https:"
    ];

    if (
        !allowedProtocols.includes(
            url.protocol
        )
    ) {

        return "#";

    }

    return url.href;

} catch (error) {

    return "#";

}

}

/* =========================================================
TOAST
========================================================= */

let toastTimer = null;

function showToast(message) {

if (!DOM.toast) {

    return;

}

DOM.toast.textContent =
    String(message);

DOM.toast.classList.add("show");

clearTimeout(toastTimer);

toastTimer =
    setTimeout(
        () => {

            DOM.toast.classList.remove(
                "show"
            );

        },
        2800
    );

}

/* =========================================================
NAVIGATION
========================================================= */

function openPage(pageName) {

const target =
    document.getElementById(
        pageName
    );

if (!target) {

    return;

}


DOM.pages.forEach(
    page => {

        page.classList.toggle(
            "active",
            page.id === pageName
        );

    }
);


DOM.navButtons.forEach(
    button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageName
        );

    }
);


STATE.currentPage =
    pageName;


/*
    Le scroll revient en haut
    lors du changement de section.
*/

window.scrollTo({
    top: 0,
    behavior: "smooth"
});


/*
    Met à jour les données si nécessaire.
*/

if (pageName === "stats") {

    updateStats();

}


if (pageName === "links") {

    renderLinks();

}


if (pageName === "files") {

    renderFiles(
        STATE.searchTerm
    );

}


/*
    Met à jour l'URL sans recharger
    la page.

    Exemple :
    /#stats
    /#about
*/

try {

    history.replaceState(
        null,
        "",
        "#" + pageName
    );

} catch (error) {

    /* Rien à faire */

}

}

/* =========================================================
NAVIGATION EVENTS
========================================================= */

function setupNavigation() {

DOM.navButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const page =
                    button.dataset.page;

                openPage(page);

            }
        );

    }
);


DOM.footerButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const page =
                    button.dataset.page;

                openPage(page);

            }
        );

    }
);

}

/* =========================================================
FILE RENDER
========================================================= */

function renderFiles(searchTerm = "") {

if (!DOM.fileList) {

    return;

}


const query =
    String(searchTerm)
        .trim()
        .toLowerCase();


const filteredFiles =
    FILES.filter(
        file => {

            const searchableText = [

                file.name,

                file.type,

                file.size,

                file.description

            ]
                .join(" ")
                .toLowerCase();


            return searchableText.includes(
                query
            );

        }
    );


DOM.fileList.innerHTML = "";


if (DOM.fileCount) {

    DOM.fileCount.textContent =
        `${filteredFiles.length} FILES`;

}


if (
    filteredFiles.length === 0
) {

    if (DOM.emptyState) {

        DOM.emptyState.classList.remove(
            "hidden"
        );

    }

    return;

}


if (DOM.emptyState) {

    DOM.emptyState.classList.add(
        "hidden"
    );

}


filteredFiles.forEach(
    file => {

        const index =
            FILES.indexOf(file);


        const article =
            document.createElement(
                "article"
            );


        article.className =
            "file-item";


        article.innerHTML = `

            <div class="file-icon">
                🗂
            </div>

            <div class="file-info">

                <div class="file-name"
                     title="${escapeHTML(file.name)}">

                    ${escapeHTML(file.name)}

                </div>

                <div class="file-meta">

                    <span>
                        ${escapeHTML(file.type)}
                    </span>

                    <span>
                        •
                    </span>

                    <span>
                        ${escapeHTML(file.size)}
                    </span>

                    <span>
                        •
                    </span>

                    <span>
                        ${file.available ? "AVAILABLE" : "OFFLINE"}
                    </span>

                </div>

            </div>

            <button
                type="button"
                class="download-btn"
                data-file-index="${index}"
                ${file.available ? "" : "disabled"}>

                ↓

                <span class="download-text">
                    DOWNLOAD
                </span>

            </button>

        `;


        const button =
            article.querySelector(
                ".download-btn"
            );


        if (button) {

            button.addEventListener(
                "click",
                () => {

                    downloadFile(
                        index
                    );

                }
            );

        }


        DOM.fileList.appendChild(
            article
        );

    }
);

}

/* =========================================================
FILE DOWNLOAD
========================================================= */

function downloadFile(index) {

const file =
    FILES[index];


if (!file) {

    showToast(
        "Fichier introuvable."
    );

    return;

}


if (!file.available) {

    showToast(
        "Ce fichier est actuellement indisponible."
    );

    return;

}


const url =
    safeURL(file.url);


if (url === "#") {

    showToast(
        "Lien de téléchargement invalide."
    );

    return;

}


/*
    Compteur local.
*/

STATE.downloads += 1;

saveDownloadCount();

updateStats();


/*
    Ouverture du fichier.

    target="_blank" est utilisé pour éviter
    de casser la page principale lorsque
    le serveur externe ne force pas un
    téléchargement direct.
*/

const link =
    document.createElement(
        "a"
    );

link.href =
    url;

link.target =
    "_blank";

link.rel =
    "noopener noreferrer";


document.body.appendChild(
    link
);


link.click();


link.remove();


showToast(
    `Ouverture de ${file.name}`
);

}

/* =========================================================
SEARCH
========================================================= */

function setupSearch() {

if (!DOM.search) {

    return;

}


DOM.search.addEventListener(
    "input",
    event => {

        STATE.searchTerm =
            event.target.value;

        renderFiles(
            STATE.searchTerm
        );

    }
);


if (DOM.clearSearch) {

    DOM.clearSearch.addEventListener(
        "click",
        () => {

            DOM.search.value =
                "";

            STATE.searchTerm =
                "";

            renderFiles("");

            DOM.search.focus();

        }
    );

}


DOM.search.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            DOM.search.value =
                "";

            STATE.searchTerm =
                "";

            renderFiles("");

        }

    }
);

}

/* =========================================================
STATS
========================================================= */

function updateStats() {

const total =
    FILES.length;


const available =
    FILES.filter(
        file =>
            file.available === true
    ).length;


if (DOM.totalFiles) {

    DOM.totalFiles.textContent =
        String(total);

}


if (DOM.availableFiles) {

    DOM.availableFiles.textContent =
        String(available);

}


if (DOM.totalDownloads) {

    DOM.totalDownloads.textContent =
        String(
            STATE.downloads
        );

}


if (DOM.totalLinks) {

    DOM.totalLinks.textContent =
        String(
            EXTERNAL_LINKS.length
        );

}

}

/* =========================================================
LINKS RENDER
========================================================= */

function renderLinks() {

if (!DOM.linksList) {

    return;

}


DOM.linksList.innerHTML =
    "";


EXTERNAL_LINKS
    .slice(0, 5)
    .forEach(
        linkData => {

            const url =
                safeURL(
                    linkData.url
                );


            const anchor =
                document.createElement(
                    "a"
                );


            anchor.className =
                "external-link";


            anchor.href =
                url;


            anchor.target =
                "_blank";


            anchor.rel =
                "noopener noreferrer";


            anchor.innerHTML = `

                <div class="external-link-icon">

                    ${escapeHTML(
                        linkData.icon || "↗"
                    )}

                </div>

                <div class="external-link-info">

                    <div class="external-link-name">

                        ${escapeHTML(
                            linkData.name
                        )}

                    </div>

                    <div
                        class="external-link-description">

                        ${escapeHTML(
                            linkData.description
                        )}

                    </div>

                </div>

                <div class="external-link-arrow">

                    ↗

                </div>

            `;


            DOM.linksList.appendChild(
                anchor
            );

        }
    );


if (DOM.totalLinks) {

    DOM.totalLinks.textContent =
        String(
            EXTERNAL_LINKS.length
        );

}

}

/* =========================================================
HASH NAVIGATION
========================================================= */

function loadHashPage() {

const hash =
    window.location.hash
        .replace("#", "")
        .trim()
        .toLowerCase();


const allowedPages = [
    "files",
    "stats",
    "about",
    "links"
];


if (
    allowedPages.includes(hash)
) {

    openPage(hash);

} else {

    openPage("files");

}

}

/* =========================================================
KEYBOARD SHORTCUTS
========================================================= */

function setupKeyboard() {

document.addEventListener(
    "keydown",
    event => {

        /*
            Ctrl + K
            ouvre la recherche.
        */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (DOM.search) {

                openPage("files");

                DOM.search.focus();

            }

        }


        /*
            Échap
            ferme/efface la recherche.
        */

        if (
            event.key === "Escape"
        ) {

            if (
                document.activeElement ===
                DOM.search
            ) {

                DOM.search.blur();

            }

        }

    }
);

}

/* =========================================================
PREVENT INVALID DATA
========================================================= */

function validateConfiguration() {

if (
    !Array.isArray(FILES)
) {

    console.error(
        "FILES doit être un tableau."
    );

    return false;

}


if (
    !Array.isArray(
        EXTERNAL_LINKS
    )
) {

    console.error(
        "EXTERNAL_LINKS doit être un tableau."
    );

    return false;

}


return true;

}

/* =========================================================
INITIALIZATION
========================================================= */

function init() {

/*
    Vérification de configuration.
*/

if (
    !validateConfiguration()
) {

    showToast(
        "Erreur de configuration."
    );

    return;

}


/*
    Chargement du compteur.
*/

loadDownloadCount();


/*
    Navigation.
*/

setupNavigation();


/*
    Recherche.
*/

setupSearch();


/*
    Raccourcis clavier.
*/

setupKeyboard();


/*
    Premier affichage.
*/

renderFiles("");


renderLinks();


updateStats();


/*
    Lecture du hash.
*/

loadHashPage();


/*
    Écoute des changements de hash.
*/

window.addEventListener(
    "hashchange",
    loadHashPage
);


/*
    Message console.
*/

console.log(
    "WA REPORT FILE CENTER V2 — READY"
);

}

/* =========================================================
START
========================================================= */

if (
document.readyState === "loading"
) {

document.addEventListener(
    "DOMContentLoaded",
    init
);

} else {

init();

}
