(function () {
  "use strict";
  var S = window.SITE, P = window.PRODUTOS || [];

  /* ── Helpers ─────────────────────────────────────────── */
  var esc = function (t) {
    var d = document.createElement("div");
    d.textContent = t;
    return d.innerHTML;
  };
  var brl = function (n) {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };
  var wa = function (msg) {
    return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(msg);
  };

  /* ── Bindings gerais ─────────────────────────────────── */
  document.querySelectorAll("[data-brand]").forEach(function (el) { el.textContent = S.marca; });
  document.querySelectorAll("[data-wa]").forEach(function (el) { el.href = wa(S.msgPadrao); });
  document.getElementById("insta").href = S.instagram;
  document.getElementById("ano").textContent = new Date().getFullYear();

  /* ── Bindings do footer ──────────────────────────────── */
  var footWa   = document.getElementById("foot-wa");
  var footInsta = document.getElementById("foot-insta");
  var footSite  = document.getElementById("foot-site");

  if (footWa)    footWa.href    = wa(S.msgPadrao);
  if (footInsta) footInsta.href = S.instagram;
  if (footSite)  footSite.href  = S.url;

  /* ── Botão flutuante WhatsApp ────────────────────────── */
  var waFloat = document.getElementById("wa-float");
  if (waFloat) {
    waFloat.href = wa(S.msgFlotuante || S.msgPadrao);
  }

  /* ── Menu hambúrguer ─────────────────────────────────── */
  var toggle  = document.getElementById("menu-toggle");
  var nav     = document.getElementById("nav-menu");
  var iconMenu  = document.getElementById("icon-menu");
  var iconClose = document.getElementById("icon-close");

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    iconMenu.style.display  = "";
    iconClose.style.display = "none";
  }

  function openMenu() {
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
    iconMenu.style.display  = "none";
    iconClose.style.display = "";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Fecha ao clicar em qualquer link/botão do nav */
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    /* Fecha ao pressionar Escape */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
        toggle.focus();
      }
    });

    /* Fecha ao clicar fora do nav (só mobile) */
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("open") &&
          !nav.contains(e.target) &&
          !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ── Vitrine de produtos ─────────────────────────────── */
  var ativos = P.filter(function (p) { return p.disponivel; });

  document.getElementById("grid").innerHTML = ativos.map(function (p) {
    var foto = p.img
      ? '<img src="' + esc(p.img) + '" alt="' + esc(p.nome) + '" width="400" height="300" loading="lazy">'
      : "foto do produto";
    return '<article class="card"><div class="img">' + foto + '</div><div class="info">' +
      "<h3>" + esc(p.nome) + "</h3>" +
      '<p class="desc">' + esc(p.desc) + "</p>" +
      '<div class="price">' + brl(p.preco) + "</div>" +
      '<a class="btn" href="' + wa("Olá! Quero pedir: " + p.nome) + '" target="_blank" rel="noopener noreferrer">Pedir</a>' +
      "</div></article>";
  }).join("");

  /* ── SEO: dados estruturados dos produtos ────────────── */
  var ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": ativos.map(function (p) {
      return {
        "@type": "Product", name: p.nome, description: p.desc,
        image: p.img ? S.url + "/" + p.img : undefined,
        offers: {
          "@type": "Offer", priceCurrency: "BRL",
          price: p.preco.toFixed(2),
          availability: "https://schema.org/InStock"
        }
      };
    })
  });
  document.head.appendChild(ld);

  /* ── Analytics opcional ──────────────────────────────── */
  if (S.analyticsId) {
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(S.analyticsId);
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", S.analyticsId);
  }
})();
