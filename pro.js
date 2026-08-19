(function () {
  "use strict";

  // ========== DOM refs ==========
  const editorTextarea = document.getElementById("codeEditor");
  const previewIframe = document.getElementById("proPreview");
  const deviceFrame = document.getElementById("deviceFrame");
  const codeTabs = document.querySelectorAll(".code-tab");
  const deviceButtons = document.querySelectorAll(".device-button");
  const editorHint = document.getElementById("editorHint");
  const resetBtn = document.getElementById("resetCode");
  const runBtn = document.getElementById("runButton");
  const downloadBtn = document.getElementById("downloadPro");
  const consoleOutput = document.getElementById("consoleOutput");
  const clearConsoleBtn = document.getElementById("clearConsole");
  const resetModal = document.getElementById("resetModal");
  const cancelReset = document.getElementById("cancelReset");
  const confirmReset = document.getElementById("confirmReset");

  // ========== Default templates ==========
  const defaultCode = {
    html: `<!--\nIsi struktur website kamu di sini.\nKamu tidak perlu menulis <html>,\n<head>, atau <body>.\nMH.DEV akan mengurus bagian itu.\n\nContoh:\n-->\n\n<header class="hero">\n    <p class="eyebrow">website aku</p>\n    <h1>Halo 👋</h1>\n    <p>Ini website yang sedang aku buat.</p>\n    <a href="#tentang" class="button">Kenalan yuk</a>\n</header>\n\n<main>\n    <section id="tentang">\n        <h2>Sedikit tentang aku</h2>\n        <p>Aku sedang belajar membuat website dan mencoba hal-hal baru.</p>\n    </section>\n    <section>\n        <h2>Yang aku suka</h2>\n        <div class="cards">\n            <article><h3>Web</h3><p>Membuat website dari nol.</p></article>\n            <article><h3>Visual</h3><p>Bermain dengan tampilan.</p></article>\n            <article><h3>Eksperimen</h3><p>Mencoba ide random.</p></article>\n        </div>\n    </section>\n</main>\n\n<footer>© 2026 Website Aku</footer>`,
    css: `* { box-sizing: border-box; }\nhtml { scroll-behavior: smooth; }\nbody {\n    margin: 0;\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n    background: #f5f5f7;\n    color: #1d1d1f;\n}\n.hero {\n    min-height: 85vh;\n    padding: 80px 24px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n}\n.eyebrow {\n    color: #777;\n    font-size: 13px;\n    text-transform: uppercase;\n    letter-spacing: .12em;\n}\nh1 {\n    margin: 20px 0 0;\n    font-size: clamp(50px, 9vw, 110px);\n    line-height: .9;\n    letter-spacing: -.07em;\n}\n.hero > p {\n    max-width: 550px;\n    color: #666;\n    font-size: 18px;\n    line-height: 1.6;\n}\n.button {\n    margin-top: 20px;\n    padding: 13px 20px;\n    display: inline-block;\n    background: #1d1d1f;\n    color: #fff;\n    border-radius: 999px;\n    text-decoration: none;\n}\nsection {\n    max-width: 1000px;\n    margin: auto;\n    padding: 100px 24px;\n}\nsection h2 {\n    font-size: 48px;\n    letter-spacing: -.05em;\n}\nsection p {\n    max-width: 650px;\n    color: #666;\n    line-height: 1.7;\n}\n.cards {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 16px;\n}\n.cards article {\n    padding: 28px;\n    background: #fff;\n    border-radius: 20px;\n}\n.cards article p { color: #666; }\nfooter {\n    padding: 50px 24px;\n    color: #777;\n    text-align: center;\n}\n@media (max-width: 700px) {\n    .cards { grid-template-columns: 1fr; }\n    section h2 { font-size: 40px; }\n}`,
    js: `const button = document.querySelector(".button");\nbutton?.addEventListener("click", () => {\n    console.log("Tombol diklik!");\n});`,
  };

  // ========== State ==========
  const codeState = {
    html: "",
    css: "",
    js: "",
  };

  let currentMode = "html";
  let editor = null;
  let previewTimer = null;

  const hints = {
    html: "Struktur halaman website kamu.",
    css: "Tampilan, warna, ukuran, dan layout website.",
    js: "Interaksi dan perilaku website kamu.",
  };

  // ========== Load from localStorage ==========
  function loadFromStorage() {
    const stored = {
      html: localStorage.getItem("mhdev-pro-html"),
      css: localStorage.getItem("mhdev-pro-css"),
      js: localStorage.getItem("mhdev-pro-js"),
    };
    codeState.html = stored.html !== null ? stored.html : defaultCode.html;
    codeState.css = stored.css !== null ? stored.css : defaultCode.css;
    codeState.js = stored.js !== null ? stored.js : defaultCode.js;
  }

  function saveToStorage() {
    localStorage.setItem("mhdev-pro-html", codeState.html);
    localStorage.setItem("mhdev-pro-css", codeState.css);
    localStorage.setItem("mhdev-pro-js", codeState.js);
  }

  // ========== Initialize CodeMirror ==========
  function initEditor() {
    editor = CodeMirror.fromTextArea(editorTextarea, {
      mode: "xml",
      theme: "mhdev",
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      lineWrapping: false,
      autoCloseBrackets: true,
      matchBrackets: true,
      styleActiveLine: true,
      extraKeys: {
        "Ctrl-Enter": runPreview,
        "Cmd-Enter": runPreview,
        "Ctrl-S": function (cm) {
          saveCurrentCode();
          saveToStorage();
          editorHint.textContent = "✓ Disimpan ke lokal";
          setTimeout(() => {
            editorHint.textContent = hints[currentMode];
          }, 1500);
        },
        "Cmd-S": function (cm) {
          saveCurrentCode();
          saveToStorage();
          editorHint.textContent = "✓ Disimpan ke lokal";
          setTimeout(() => {
            editorHint.textContent = hints[currentMode];
          }, 1500);
        },
      },
    });

    loadCode("html");
  }

  // ========== Code management ==========
  function saveCurrentCode() {
    if (!editor) return;
    const value = editor.getValue();
    codeState[currentMode] = value;
    clearTimeout(window._saveTimer);
    window._saveTimer = setTimeout(() => {
      saveToStorage();
    }, 500);
  }

  function loadCode(mode) {
    currentMode = mode;
    if (!editor) return;
    editor.setValue(codeState[mode]);
    editor.setOption(
      "mode",
      mode === "html" ? "xml" : mode === "css" ? "css" : "javascript",
    );
    editorHint.textContent = hints[mode];
    setTimeout(() => editor.refresh(), 10);
    runPreview();
  }

  // ========== Build preview document ==========
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
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<base href="about:blank">
<style>${css}</style>
</head>
<body>
${html}

<script>
(function() {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    function send(type, args) {
        const message = args.map(arg => {
            try {
                return String(arg);
            } catch(e) {
                return '[unable to stringify]';
            }
        }).join(' ');
        window.parent.postMessage({ type: 'console', method: type, content: message }, '*');
    }

    console.log = function(...args) { send('log', args); originalLog.apply(console, args); };
    console.error = function(...args) { send('error', args); originalError.apply(console, args); };
    console.warn = function(...args) { send('warn', args); originalWarn.apply(console, args); };
    console.info = function(...args) { send('info', args); originalInfo.apply(console, args); };

    window.addEventListener('error', function(event) {
        const msg = event.message + ' at ' + event.filename + ':' + event.lineno + ':' + event.colno;
        console.error(msg);
        send('error', [msg]);
        return false;
    });

    window.addEventListener('unhandledrejection', function(event) {
        const msg = 'Unhandled Promise rejection: ' + event.reason;
        console.error(msg);
        send('error', [msg]);
        return false;
    });

    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href) return;
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if (href.startsWith('http://') || href.startsWith('https://')) {
            e.preventDefault();
            window.open(href, '_blank', 'noopener,noreferrer');
            return;
        }
        e.preventDefault();
    }, true);

    try {
        ${js}
    } catch (error) {
        console.error('Preview Error:', error.message);
    }
})();
<\/script>
</body>
</html>`;
  }

  // ========== Run preview ==========
  function runPreview() {
    saveCurrentCode();
    clearTimeout(previewTimer);
    previewTimer = setTimeout(() => {
      const doc = buildPreviewDocument();
      previewIframe.srcdoc = doc;
    }, 80);
  }

  // ========== Console messages from iframe ==========
  function handleConsoleMessage(event) {
    if (event.source !== previewIframe.contentWindow) return;
    const data = event.data;
    if (!data || data.type !== "console") return;
    const method = data.method || "log";
    const content = data.content || "";
    const cls = "console-" + method;
    const line = document.createElement("div");
    line.className = "console-line " + cls;
    line.textContent = "▸ " + content;
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
    while (consoleOutput.children.length > 100) {
      consoleOutput.removeChild(consoleOutput.firstChild);
    }
  }

  window.addEventListener("message", handleConsoleMessage);

  clearConsoleBtn.addEventListener("click", function () {
    consoleOutput.innerHTML =
      '<div class="console-line console-info">▸ Console cleared</div>';
  });

  // ========== Tabs ==========
  codeTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const mode = this.dataset.code;
      if (mode === currentMode) return;
      saveCurrentCode();
      codeTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      loadCode(mode);
    });
  });

  // ========== Device switcher ==========
  deviceButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const device = this.dataset.device;
      deviceButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      deviceFrame.className = "device-frame " + device;
    });
  });

  // ========== Reset modal ==========
  function showResetModal() {
    resetModal.style.display = "flex";
  }
  function hideResetModal() {
    resetModal.style.display = "none";
  }

  resetBtn.addEventListener("click", showResetModal);
  cancelReset.addEventListener("click", hideResetModal);
  confirmReset.addEventListener("click", function () {
    codeState.html = defaultCode.html;
    codeState.css = defaultCode.css;
    codeState.js = defaultCode.js;
    saveToStorage();
    loadCode(currentMode);
    hideResetModal();
    consoleOutput.innerHTML =
      '<div class="console-line console-info">▸ Editor reset to template</div>';
  });
  resetModal.addEventListener("click", function (e) {
    if (e.target === this) hideResetModal();
  });

  // ========== Download ==========
  function buildDownloadDocument() {
    return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Website Aku</title>
<style>${codeState.css}</style>
</head>
<body>
${cleanHTML(codeState.html)}
<script>
${codeState.js}
<\/script>
</body>
</html>`;
  }

  downloadBtn.addEventListener("click", function () {
    saveCurrentCode();
    const content = buildDownloadDocument();
    downloadFile("website-aku.html", content);
  });

  function downloadFile(filename, content) {
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  // ========== Run button ==========
  runBtn.addEventListener("click", runPreview);

  // ========== Init ==========
  loadFromStorage();
  initEditor();
  setTimeout(runPreview, 200);

  window.addEventListener("resize", function () {
    if (editor) {
      clearTimeout(window._resizeTimer);
      window._resizeTimer = setTimeout(() => editor.refresh(), 100);
    }
  });
})();
