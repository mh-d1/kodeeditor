/**
 * MH.DEV – Easy Mode
 * Dengan dukungan template dan sidebar hitam.
 */

// ===== DOM ELEMEN =====
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
const downloadBtn = document.getElementById("downloadEasy");
const feedbackEl = document.getElementById("downloadFeedback");
const previewStatus = document.getElementById("previewStatus");
const templateSelect = document.getElementById("templateSelect");

// ===== TEMPLATE DATA =====
const templates = {
  umkm: {
    heroTitle: "Toko Bahagia 🛒",
    heroText:
      "Jualan perlengkapan rumah tangga, camilan, dan kebutuhan sehari-hari dengan harga ramah.",
    heroButton: "Lihat Produk",
    heroLinkType: "features",
    aboutTitle: "Tentang Toko Kami",
    aboutText:
      "Toko Bahagia berdiri sejak 2020. Kami menyediakan produk berkualitas dengan pelayanan yang ramah. Belanja di sini dijamin murah dan menyenangkan!",
    feature1Title: "Perlengkapan Rumah",
    feature1Text:
      "Mulai dari peralatan dapur, alat kebersihan, hingga dekorasi rumah.",
    feature2Title: "Camilan & Makanan",
    feature2Text: "Aneka snack, minuman, dan makanan ringan favorit keluarga.",
    feature3Title: "Kebutuhan Sehari-hari",
    feature3Text:
      "Sabun, sampo, pasta gigi, dan barang kebutuhan lain tersedia lengkap.",
    contactTitle: "Hubungi Kami",
    contactText:
      "Ada pertanyaan atau mau pesan? Hubungi kami lewat WhatsApp atau email.",
    contactButton: "Chat WhatsApp",
    contactLinkType: "custom",
    contactLinkCustom: "https://wa.me/6281234567890",
    footerText: "© 2026 Toko Bahagia – Belanja Murah & Ramah",
  },
  kelas: {
    heroTitle: "Kelas 6B 🏫",
    heroText:
      "Belajar bersama, tumbuh bersama. Selamat datang di halaman kelas kita.",
    heroButton: "Lihat Jadwal",
    heroLinkType: "features",
    aboutTitle: "Tentang Kelas 6B",
    aboutText:
      "Kelas 6B adalah kelas yang penuh semangat. Kami berjumlah 28 siswa dan 2 guru. Kami suka belajar sambil bermain.",
    feature1Title: "Jadwal Pelajaran",
    feature1Text:
      "Senin-Jumat: 07.30–13.00. Mata pelajaran: Matematika, IPA, Bahasa, dan lainnya.",
    feature2Title: "Proyek Kelas",
    feature2Text:
      "Kami sedang membuat majalah dinding dan kebun mini di halaman sekolah.",
    feature3Title: "Info Guru",
    feature3Text: "Wali kelas: Ibu Siti. Guru pendamping: Pak Budi.",
    contactTitle: "Hubungi Wali Kelas",
    contactText:
      "Orang tua/wali dapat menghubungi ibu guru melalui WhatsApp atau email.",
    contactButton: "Hubungi Ibu Siti",
    contactLinkType: "custom",
    contactLinkCustom: "https://wa.me/6281234567890",
    footerText: "© 2026 Kelas 6B – Belajar Bersama",
  },
  portofolio: {
    heroTitle: "Karya Saya 🎨",
    heroText:
      "Halo! Saya suka membuat ilustrasi, desain grafis, dan konten visual.",
    heroButton: "Lihat Karya",
    heroLinkType: "features",
    aboutTitle: "Tentang Saya",
    aboutText:
      "Saya seorang desainer grafis dan ilustrator. Menggambar adalah caraku bercerita. Saat ini saya sedang belajar membuat website juga!",
    feature1Title: "Ilustrasi Digital",
    feature1Text: "Karakter, pemandangan, dan komik digital dengan gaya khas.",
    feature2Title: "Desain Grafis",
    feature2Text: "Logo, poster, dan materi branding untuk berbagai klien.",
    feature3Title: "Konten Kreatif",
    feature3Text: "Video pendek, motion graphic, dan konten media sosial.",
    contactTitle: "Hubungi Saya",
    contactText:
      "Tertarik bekerja sama atau sekadar ingin ngobrol? Kirim email atau DM saya.",
    contactButton: "Kirim Email",
    contactLinkType: "email",
    contactEmail: "halo@karyasaya.com",
    footerText: "© 2026 Karya Saya – Terus Berkarya",
  },
  event: {
    heroTitle: "Festival Rakyat 🎉",
    heroText:
      "Acara tahunan yang merayakan budaya, musik, dan kuliner Nusantara.",
    heroButton: "Daftar Sekarang",
    heroLinkType: "contact",
    aboutTitle: "Tentang Acara",
    aboutText:
      "Festival Rakyat akan digelar pada 15-17 Agustus 2026 di Lapangan Merdeka. Ada panggung musik, bazar kuliner, dan lomba tradisional.",
    feature1Title: "Panggung Musik",
    feature1Text:
      "Penampilan dari 10 grup musik lokal dan nasional. Genre: pop, jazz, dangdut, dan tradisional.",
    feature2Title: "Bazar Kuliner",
    feature2Text: "Lebih dari 50 stan makanan dan minuman khas daerah.",
    feature3Title: "Lomba & Games",
    feature3Text:
      "Lomba balap karung, makan kerupuk, dan games seru untuk semua usia.",
    contactTitle: "Daftar & Info",
    contactText:
      "Pendaftaran peserta dan stan dibuka sampai 1 Agustus. Hubungi panitia untuk info lebih lanjut.",
    contactButton: "Hubungi Panitia",
    contactLinkType: "custom",
    contactLinkCustom: "https://wa.me/6281234567890",
    footerText: "© 2026 Festival Rakyat – Merayakan Bersama",
  },
};

// ===== FUNGSI UTILITY =====
function value(id) {
  const el = document.getElementById(id);
  return el ? el.value : "";
}
function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
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
  if (type === "about") return "#tentang";
  if (type === "features") return "#fitur";
  if (type === "contact") return "#kontak";
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

// ===== NOTIFIKASI =====
let notifTimer = null;
function showNotification(message, type = "success") {
  feedbackEl.textContent = message;
  feedbackEl.className = "feedback-message " + type;
  clearTimeout(notifTimer);
  notifTimer = setTimeout(() => {
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback-message";
  }, 4000);
}

// ===== TERAPKAN TEMPLATE =====
function applyTemplate(name) {
  const tpl = templates[name];
  if (!tpl) return;
  setValue("heroTitle", tpl.heroTitle || "");
  setValue("heroText", tpl.heroText || "");
  setValue("heroButton", tpl.heroButton || "");
  if (tpl.heroLinkType) {
    heroLinkType.value = tpl.heroLinkType;
    heroLinkCustom.classList.toggle("show", tpl.heroLinkType === "custom");
  }
  setValue("heroLinkCustom", tpl.heroLinkCustom || "");
  setValue("aboutTitle", tpl.aboutTitle || "");
  setValue("aboutText", tpl.aboutText || "");
  setValue("feature1Title", tpl.feature1Title || "");
  setValue("feature1Text", tpl.feature1Text || "");
  setValue("feature2Title", tpl.feature2Title || "");
  setValue("feature2Text", tpl.feature2Text || "");
  setValue("feature3Title", tpl.feature3Title || "");
  setValue("feature3Text", tpl.feature3Text || "");
  setValue("contactTitle", tpl.contactTitle || "");
  setValue("contactText", tpl.contactText || "");
  setValue("contactButton", tpl.contactButton || "");
  if (tpl.contactLinkType) {
    contactLinkType.value = tpl.contactLinkType;
    const custom = tpl.contactLinkType === "custom";
    contactLinkCustom.classList.toggle("show", custom);
    contactEmail.style.display = custom ? "none" : "block";
  }
  setValue("contactEmail", tpl.contactEmail || "");
  setValue("contactLinkCustom", tpl.contactLinkCustom || "");
  setValue("footerText", tpl.footerText || "");
  updateEasyPreview();
}

// ===== PREVIEW BUILD =====
let previewTimeout = null;
function updateEasyPreview() {
  previewStatus.classList.add("updating");
  clearTimeout(previewTimeout);
  previewTimeout = setTimeout(() => {
    const html = buildPreviewHTML();
    easyPreview.srcdoc = html;
    setTimeout(() => previewStatus.classList.remove("updating"), 300);
  }, 150);
}

function buildPreviewHTML() {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Website Aku</title>
<style>
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
  font-size: clamp(48px, 8vw, 100px);
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
  transition: transform .25s ease;
}
.button:hover { transform: translateY(-3px); }
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
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.card {
  padding: 28px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,.05);
}
.card p {
  color: #666;
  line-height: 1.6;
}
.contact { text-align: center; }
.contact > p { margin-left: auto; margin-right: auto; }
footer {
  padding: 50px 24px;
  color: #777;
  text-align: center;
}
@media (max-width: 700px) {
  .cards { grid-template-columns: 1fr; }
  section h2 { font-size: 40px; }
}
</style>
</head>
<body>

<header class="hero">
  <small>website aku</small>
  <h1>${escapeHTML(value("heroTitle"))}</h1>
  <p>${escapeHTML(value("heroText"))}</p>
  <a class="button" href="${escapeHTML(getHeroLink())}">${escapeHTML(value("heroButton"))}</a>
</header>

<main>
  <section id="tentang">
    <h2>${escapeHTML(value("aboutTitle"))}</h2>
    <p>${escapeHTML(value("aboutText"))}</p>
  </section>

  <section id="fitur">
    <h2>Hal yang aku punya</h2>
    <div class="cards">
      <article class="card">
        <h3>${escapeHTML(value("feature1Title"))}</h3>
        <p>${escapeHTML(value("feature1Text"))}</p>
      </article>
      <article class="card">
        <h3>${escapeHTML(value("feature2Title"))}</h3>
        <p>${escapeHTML(value("feature2Text"))}</p>
      </article>
      <article class="card">
        <h3>${escapeHTML(value("feature3Title"))}</h3>
        <p>${escapeHTML(value("feature3Text"))}</p>
      </article>
    </div>
  </section>

  <section class="contact" id="kontak">
    <h2>${escapeHTML(value("contactTitle"))}</h2>
    <p>${escapeHTML(value("contactText"))}</p>
    <a class="button" href="${escapeHTML(getContactLink())}">${escapeHTML(value("contactButton"))}</a>
  </section>
</main>

<footer>${escapeHTML(value("footerText"))}</footer>

<script>
(function() {
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.trim() === '' || href === '#') {
      e.preventDefault();
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      var targetId = href.substring(1);
      var targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (href.startsWith('http://') || href.startsWith('https://')) {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (!href.startsWith('mailto:') && !href.startsWith('tel:')) {
      e.preventDefault();
    }
  }, true);
})();
<\/script>
</body>
</html>`;
}

// ===== NAVIGASI SIDEBAR =====
easyNavs.forEach((nav) => {
  nav.addEventListener("click", () => {
    const section = nav.dataset.section;
    easyNavs.forEach((item) => item.classList.remove("active"));
    easyCards.forEach((card) => card.classList.remove("active"));
    nav.classList.add("active");
    const target = document.querySelector(
      `.easy-card[data-editor="${section}"]`,
    );
    if (target) target.classList.add("active");
  });
});

// ===== LINK OPTIONS TOGGLE =====
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

// ===== SEMUA INPUT =====
easyInputs.forEach((input) => {
  input.addEventListener("input", updateEasyPreview);
  input.addEventListener("change", updateEasyPreview);
});

// ===== TEMPLATE SELECT =====
templateSelect.addEventListener("change", function () {
  const val = this.value;
  if (val) applyTemplate(val);
});

// ===== DOWNLOAD =====
downloadBtn.addEventListener("click", () => {
  const content = easyPreview.srcdoc;
  if (!content) {
    showNotification("Belum ada konten untuk di-download.", "error");
    return;
  }
  downloadFile("website-aku.html", content);
  showNotification("✅ Website berhasil di-download!", "success");
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

// ===== INISIALISASI =====
applyTemplate("umkm");
