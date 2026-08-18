const codeEditor = document.getElementById("codeEditor");
const highlightLayer = document.getElementById("highlightLayer");
const lineNumbers = document.getElementById("lineNumbers");

const proPreview = document.getElementById("proPreview");
const deviceFrame = document.getElementById("deviceFrame");

const codeTabs = document.querySelectorAll(".code-tab");
const deviceButtons = document.querySelectorAll(".device-button");

const editorHint = document.getElementById("editorHint");

const defaultCode = {
  html: `<!--
Isi struktur website kamu di sini.
Kamu tidak perlu menulis <html>,
<head>, atau <body>.
MH.DEV akan mengurus bagian itu.

Contoh:
-->

<header class="hero">

    <p class="eyebrow">
        website aku
    </p>

    <h1>
        Halo 👋
    </h1>

    <p>
        Ini website yang sedang aku buat.
    </p>

    <a
        href="#tentang"
        class="button"
    >
        Kenalan yuk
    </a>

</header>


<main>

    <section id="tentang">

        <h2>
            Sedikit tentang aku
        </h2>

        <p>
            Aku sedang belajar membuat website
            dan mencoba hal-hal baru.
        </p>

    </section>


    <section>

        <h2>
            Yang aku suka
        </h2>

        <div class="cards">

            <article>
                <h3>
                    Web
                </h3>

                <p>
                    Membuat website dari nol.
                </p>
            </article>


            <article>
                <h3>
                    Visual
                </h3>

                <p>
                    Bermain dengan tampilan.
                </p>
            </article>


            <article>
                <h3>
                    Eksperimen
                </h3>

                <p>
                    Mencoba ide random.
                </p>
            </article>

        </div>

    </section>

</main>


<footer>

    © 2026 Website Aku

</footer>`,

  css: `* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;

    font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;

    background: #f5f5f7;
    color: #1d1d1f;
}

.hero {
    min-height: 85vh;

    padding: 80px 24px;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    text-align: center;
}

.eyebrow {
    color: #777;

    font-size: 13px;

    text-transform: uppercase;

    letter-spacing: .12em;
}

h1 {
    margin: 20px 0 0;

    font-size:
        clamp(50px, 9vw, 110px);

    line-height: .9;

    letter-spacing: -.07em;
}

.hero > p {
    max-width: 550px;

    color: #666;

    font-size: 18px;

    line-height: 1.6;
}

.button {
    margin-top: 20px;

    padding: 13px 20px;

    display: inline-block;

    background: #1d1d1f;

    color: #fff;

    border-radius: 999px;

    text-decoration: none;
}

section {
    max-width: 1000px;

    margin: auto;

    padding: 100px 24px;
}

section h2 {
    font-size: 48px;

    letter-spacing: -.05em;
}

section p {
    max-width: 650px;

    color: #666;

    line-height: 1.7;
}

.cards {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 16px;
}

.cards article {
    padding: 28px;

    background: #fff;

    border-radius: 20px;
}

.cards article p {
    color: #666;
}

footer {
    padding: 50px 24px;

    color: #777;

    text-align: center;
}

@media (max-width: 700px) {

    .cards {
        grid-template-columns: 1fr;
    }

    section h2 {
        font-size: 40px;
    }

}`,

  js: `const button =
    document.querySelector(".button");

button?.addEventListener(
    "click",
    () => {

        console.log(
            "Tombol diklik!"
        );

    }
);`,
};

const codeState = {
  html: defaultCode.html,
  css: defaultCode.css,
  js: defaultCode.js,
};

let currentCode = "html";

const hints = {
  html: "Struktur halaman website kamu.",
  css: "Tampilan, warna, ukuran, dan layout website.",
  js: "Interaksi dan perilaku website kamu.",
};

/* ESCAPE */

function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* SYNTAX HIGHLIGHT */

function highlightHTML(code) {
  let output = escapeHTML(code);

  output = output.replace(
    /(&lt;!--[\s\S]*?--&gt;)/g,
    '<span class="token-comment">$1</span>',
  );

  output = output.replace(
    /(&lt;\/?)([a-zA-Z0-9-]+)/g,
    '$1<span class="token-tag">$2</span>',
  );

  output = output.replace(
    /(\s)([a-zA-Z_:][-a-zA-Z0-9_:.]*)(=)/g,
    '$1<span class="token-attr">$2</span>$3',
  );

  output = output.replace(
    /(&quot;.*?&quot;|&#039;.*?&#039;)/g,
    '<span class="token-string">$1</span>',
  );

  return output;
}

function highlightCSS(code) {
  let output = escapeHTML(code);

  output = output.replace(
    /(\/\*[\s\S]*?\*\/)/g,
    '<span class="token-comment">$1</span>',
  );

  output = output.replace(
    /([.#]?[a-zA-Z_-][a-zA-Z0-9_-]*)(\s*\{)/g,
    '<span class="token-tag">$1</span>$2',
  );

  output = output.replace(
    /([a-zA-Z-]+)(\s*:)/g,
    '<span class="token-property">$1</span>$2',
  );

  output = output.replace(
    /(#(?:[a-fA-F0-9]{3,8})\b)/g,
    '<span class="token-string">$1</span>',
  );

  output = output.replace(
    /(\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|deg)?\b)/g,
    '<span class="token-number">$1</span>',
  );

  return output;
}

function highlightJS(code) {
  let output = escapeHTML(code);

  output = output.replace(
    /(\/\/.*$)/gm,
    '<span class="token-comment">$1</span>',
  );

  output = output.replace(
    /('.*?'|".*?"|`.*?`)/g,
    '<span class="token-string">$1</span>',
  );

  output = output.replace(
    /\b(const|let|var|function|return|if|else|for|while|new|class|true|false|null|undefined)\b/g,
    '<span class="token-keyword">$1</span>',
  );

  output = output.replace(
    /\b(\d+(?:\.\d+)?)\b/g,
    '<span class="token-number">$1</span>',
  );

  output = output.replace(
    /\b([a-zA-Z_$][\w$]*)(?=\()/g,
    '<span class="token-function">$1</span>',
  );

  return output;
}

function highlightCode(code, type) {
  if (!code) {
    return "";
  }

  if (type === "html") {
    return highlightHTML(code);
  }

  if (type === "css") {
    return highlightCSS(code);
  }

  return highlightJS(code);
}

/* LINE NUMBERS */

function updateLineNumbers() {
  const count = codeEditor.value.split("\n").length;

  const numbers = [];

  for (let i = 1; i <= count; i++) {
    numbers.push(i);
  }

  lineNumbers.textContent = numbers.join("\n");
}

/* HIGHLIGHT */

function updateHighlight() {
  highlightLayer.innerHTML =
    highlightCode(codeEditor.value, currentCode) + "\n";
}

/* LOAD */

function loadCode(type) {
  currentCode = type;

  codeEditor.value = codeState[type];

  editorHint.textContent = hints[type];

  updateLineNumbers();
  updateHighlight();

  codeEditor.scrollTop = 0;
  highlightLayer.scrollTop = 0;

  updatePreview();
}

/* SAVE */

function saveCurrentCode() {
  codeState[currentCode] = codeEditor.value;
}

/* EDITOR INPUT */

codeEditor.addEventListener("input", () => {
  saveCurrentCode();

  updateLineNumbers();
  updateHighlight();

  updatePreview();
});

/* SCROLL */

codeEditor.addEventListener("scroll", () => {
  lineNumbers.scrollTop = codeEditor.scrollTop;

  highlightLayer.scrollTop = codeEditor.scrollTop;

  highlightLayer.scrollLeft = codeEditor.scrollLeft;
});

/* TABS */

codeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    saveCurrentCode();

    codeTabs.forEach((item) => {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    loadCode(tab.dataset.code);
  });
});

/* TAB INDENT */

codeEditor.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") {
    return;
  }

  event.preventDefault();

  const start = codeEditor.selectionStart;

  const end = codeEditor.selectionEnd;

  const selected = codeEditor.value.substring(start, end);

  if (selected.includes("\n")) {
    const indented = selected
      .split("\n")
      .map((line) => "    " + line)
      .join("\n");

    codeEditor.value =
      codeEditor.value.substring(0, start) +
      indented +
      codeEditor.value.substring(end);

    codeEditor.selectionStart = start;

    codeEditor.selectionEnd = start + indented.length;
  } else {
    codeEditor.value =
      codeEditor.value.substring(0, start) +
      "    " +
      codeEditor.value.substring(end);

    codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
  }

  saveCurrentCode();

  updateLineNumbers();
  updateHighlight();

  updatePreview();
});

/* BUILD PREVIEW */

function cleanHTML(html) {
  return html
    .replace(/<!doctype[\s\S]*?>/gi, "")
    .replace(/<html[^>]*>/gi, "")
    .replace(/<\/html>/gi, "")
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    .replace(/<body[^>]*>/gi, "")
    .replace(/<\/body>/gi, "")
    .trim();
}

function buildPreviewDocument() {
  const html = cleanHTML(codeState.html);

  const css = codeState.css;

  const js = codeState.js;

  return `<!DOCTYPE html>

<html lang="id">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<base href="about:blank">

<style>

${css}

</style>

</head>

<body>

${html}


<script>

(() => {

    const originalOpen =
        window.open;

    document.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest("a");

            if (!link) {
                return;
            }

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }

            if (
                href.startsWith("#") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {
                return;
            }

            if (
                href.startsWith("http://") ||
                href.startsWith("https://")
            ) {

                event.preventDefault();

                originalOpen(
                    href,
                    "_blank",
                    "noopener,noreferrer"
                );

                return;
            }

            event.preventDefault();

        },
        true
    );

    try {

        ${js}

    } catch (error) {

        console.error(
            "MH.DEV Preview:",
            error
        );

    }

})();

<\/script>

</body>

</html>`;
}

/* UPDATE PREVIEW */

let previewTimer = null;

function updatePreview() {
  clearTimeout(previewTimer);

  previewTimer = setTimeout(() => {
    proPreview.srcdoc = buildPreviewDocument();
  }, 80);
}

/* DEVICE */

deviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const device = button.dataset.device;

    deviceButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    deviceFrame.className = `device-frame ${device}`;
  });
});

/* RESET */

document.getElementById("resetCode").addEventListener("click", () => {
  const confirmed = window.confirm("Reset semua kode ke contoh awal?");

  if (!confirmed) {
    return;
  }

  codeState.html = defaultCode.html;

  codeState.css = defaultCode.css;

  codeState.js = defaultCode.js;

  loadCode("html");
});

/* DOWNLOAD */

document.getElementById("downloadPro").addEventListener("click", () => {
  saveCurrentCode();

  const html = buildDownloadDocument();

  downloadFile("website-aku.html", html);
});

function buildDownloadDocument() {
  return `<!DOCTYPE html>

<html lang="id">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>Website Aku</title>

<style>

${codeState.css}

</style>

</head>

<body>

${cleanHTML(codeState.html)}


<script>

${codeState.js}

<\/script>

</body>

</html>`;
}

function downloadFile(filename, content) {
  const blob = new Blob([content], {
    type: "text/html;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 500);
}

/* INITIAL */

loadCode("html");
