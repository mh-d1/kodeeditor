const easyPreview = document.getElementById("easyPreview");

const easyNavs = document.querySelectorAll(".easy-nav");
const easyCards = document.querySelectorAll(".easy-card");

const easyInputs = document.querySelectorAll(
  "#easyMode input, #easyMode textarea, #easyMode select",
);

const heroLinkType = document.getElementById("heroLinkType");
const heroLinkCustom = document.getElementById("heroLinkCustom");

const contactLinkType = document.getElementById("contactLinkType");
const contactEmail = document.getElementById("contactEmail");
const contactLinkCustom = document.getElementById("contactLinkCustom");

function value(id) {
  const element = document.getElementById(id);

  return element ? element.value : "";
}

function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getHeroLink() {
  const type = heroLinkType.value;

  if (type === "about") {
    return "#tentang";
  }

  if (type === "features") {
    return "#fitur";
  }

  if (type === "contact") {
    return "#kontak";
  }

  return heroLinkCustom.value.trim() || "#";
}

function getContactLink() {
  const type = contactLinkType.value;

  if (type === "email") {
    const email = contactEmail.value.trim();

    return email ? `mailto:${email}` : "#";
  }

  return contactLinkCustom.value.trim() || "#";
}

/* EASY NAVIGATION */

easyNavs.forEach((nav) => {
  nav.addEventListener("click", () => {
    const section = nav.dataset.section;

    easyNavs.forEach((item) => {
      item.classList.remove("active");
    });

    easyCards.forEach((card) => {
      card.classList.remove("active");
    });

    nav.classList.add("active");

    const target = document.querySelector(
      `.easy-card[data-editor="${section}"]`,
    );

    if (target) {
      target.classList.add("active");
    }
  });
});

/* LINK OPTIONS */

heroLinkType.addEventListener("change", () => {
  heroLinkCustom.classList.toggle("show", heroLinkType.value === "custom");

  updateEasyPreview();
});

contactLinkType.addEventListener("change", () => {
  const custom = contactLinkType.value === "custom";

  contactLinkCustom.classList.toggle("show", custom);
  contactEmail.style.display = custom ? "none" : "block";

  updateEasyPreview();
});

/* INPUT */

easyInputs.forEach((input) => {
  input.addEventListener("input", updateEasyPreview);

  input.addEventListener("change", updateEasyPreview);
});

/* EASY PREVIEW */

function updateEasyPreview() {
  const html = `<!DOCTYPE html>

<html lang="id">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>Website Aku</title>

<style>

* {
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

    color: #1d1d1f;
    background: #f5f5f7;
}

.hero {
    min-height: 90vh;

    padding: 80px 24px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;
}

.hero small {
    color: #777;

    text-transform: uppercase;
    letter-spacing: .12em;
}

h1 {
    max-width: 900px;

    margin: 20px 0 0;

    font-size:
        clamp(48px, 8vw, 100px);

    line-height: .9;
    letter-spacing: -.07em;
}

.hero > p {
    max-width: 600px;

    margin-top: 28px;

    color: #666;

    font-size: 18px;
    line-height: 1.6;
}

.button {
    display: inline-block;

    margin-top: 24px;

    padding: 13px 20px;

    background: #1d1d1f;
    color: #fff;

    border-radius: 999px;

    text-decoration: none;

    transition:
        transform .25s ease;
}

.button:hover {
    transform: translateY(-3px);
}

section {
    max-width: 1000px;

    margin: auto;

    padding: 100px 24px;
}

section h2 {
    font-size: 48px;
    letter-spacing: -.06em;
}

section > p {
    max-width: 650px;

    color: #666;

    font-size: 17px;
    line-height: 1.7;
}

.cards {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 16px;
}

.card {
    padding: 28px;

    background: #fff;

    border-radius: 20px;

    box-shadow:
        0 15px 40px rgba(0,0,0,.05);
}

.card p {
    color: #666;
    line-height: 1.6;
}

.contact {
    text-align: center;
}

.contact > p {
    margin-left: auto;
    margin-right: auto;
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

}

</style>

</head>

<body>

<header class="hero">

    <small>
        website aku
    </small>

    <h1>
        ${escapeHTML(value("heroTitle"))}
    </h1>

    <p>
        ${escapeHTML(value("heroText"))}
    </p>

    <a
        class="button"
        href="${escapeHTML(getHeroLink())}"
        data-preview-link
    >
        ${escapeHTML(value("heroButton"))}
    </a>

</header>


<main>

<section id="tentang">

    <h2>
        ${escapeHTML(value("aboutTitle"))}
    </h2>

    <p>
        ${escapeHTML(value("aboutText"))}
    </p>

</section>


<section id="fitur">

    <h2>
        Hal yang aku punya
    </h2>

    <div class="cards">

        <article class="card">

            <h3>
                ${escapeHTML(value("feature1Title"))}
            </h3>

            <p>
                ${escapeHTML(value("feature1Text"))}
            </p>

        </article>


        <article class="card">

            <h3>
                ${escapeHTML(value("feature2Title"))}
            </h3>

            <p>
                ${escapeHTML(value("feature2Text"))}
            </p>

        </article>


        <article class="card">

            <h3>
                ${escapeHTML(value("feature3Title"))}
            </h3>

            <p>
                ${escapeHTML(value("feature3Text"))}
            </p>

        </article>

    </div>

</section>


<section
    class="contact"
    id="kontak"
>

    <h2>
        ${escapeHTML(value("contactTitle"))}
    </h2>

    <p>
        ${escapeHTML(value("contactText"))}
    </p>

    <a
        class="button"
        href="${escapeHTML(getContactLink())}"
    >
        ${escapeHTML(value("contactButton"))}
    </a>

</section>

</main>


<footer>

    ${escapeHTML(value("footerText"))}

</footer>


<script>

document.querySelectorAll("[data-preview-link]").forEach(link => {

    link.addEventListener("click", event => {

        const href = link.getAttribute("href");

        if (!href || href === "#") {
            event.preventDefault();
            return;
        }

        if (
            href.startsWith("#") ||
            href.startsWith("mailto:")
        ) {
            return;
        }

        event.preventDefault();

        window.open(
            href,
            "_blank",
            "noopener,noreferrer"
        );

    });

});

</script>

</body>
</html>`;

  easyPreview.srcdoc = html;
}

/* DOWNLOAD */

document.getElementById("downloadEasy").addEventListener("click", () => {
  const content = easyPreview.srcdoc;

  downloadFile("website-aku.html", content);
});

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

updateEasyPreview();
