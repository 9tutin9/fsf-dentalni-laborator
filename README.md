FSF dentální laboratoř – web

Obsah
- Struktura
- Build & deploy
- Kontaktní formulář – backend varianty
- SEO checklist
- GA/GTM integrace
- Potřebné podklady od klienta
- CMS poznámky (WordPress/Webflow)

 Struktura
- index.html – one‑pager: Úvod, O nás, Služby (accordion), Galerie (filtry + lightbox), Kontakt (mapa + formulář)
- css/styles.css – lehký klinický motiv
- js/main.js – navigace, filtry, lightbox, formulář
- images/ – logo a zástupné obrázky (placeholders)

 Build & deploy
 - Statický web bez build kroku. Nasazení na libovolný hosting (Netlify, Vercel – jako static, GitHub Pages, tradiční hosting s Apache/Ngininx).
- Doporučení pro produkci:
  - Zapnout gzip/br brotli kompresi a HTTP/2.
  - Cache-Control pro obrázky (dlouhá cache), HTML krátká.
  - Přesměrování www/non-www sjednotit (např. na https://www.fsf-dentlab.cz).

Kontaktní formulář – backend
1) Formspree
   - Vytvořte formulář na `formspree.io`, získejte akční URL a nahraďte v kontakt.html `action` a případně `data-formspree` v JS.
2) Netlify Forms
   - Přidejte atribut `data-netlify="true"` a skrytý input `name="form-name"` do formuláře, hostujte na Netlify.
3) PHP mailer (tradiční hosting)
   - Vytvořte `send.php` a nastavte `action="/send.php"`. Validujte vstupy, přiložte soubory a nastavte SPF/DKIM.

SEO checklist
- Jedna H1 na stránku, smysluplné H2/H3.
- Titulek do ~60 znaků, meta description ~150–160 znaků.
- alt u všech obrázků, lazy-loading u galerií.
- Otevřené grafy (Open Graph) – možné doplnit dle finálních fotek.
- schema.org: LocalBusiness/DentalLaboratory (viz index.html JSON-LD).
- Sitemap.xml a robots.txt (doplnit při nasazení).

GA/GTM
- GA4: vložte `<script>` tag do `head` dle Google doporučení.
- GTM: vložte `head` a `noscript` snippet. Dbejte na souhlas cookies dle legislativy.

Potřebné podklady od klienta
- Logo ve formátu SVG/PNG ve vysokém rozlišení.
- Fotografie: tým (portrét), vybavení laboratoře, ukázky prací (před/po), interiér/exteriér.
- Preferované barvy a typografie (pokud existuje manuál).
- Krátký firemní profil a historie, provozní doba (pokud relevantní).

CMS poznámky
- WordPress (lehké):
  - Šablony: `front-page.php` (úvod), `page-sluzby.php`, `page-prace.php`, `page-kontakt.php`.
  - Vlastní typy: `prace` (galerie) s taxonomií `kategorie` (celokeramika, rekonstrukce, implantaty).
  - ACF pole: kontakty, adresa, map embed, CTA, seznam služeb.
  - Formulář: Contact Form 7 nebo WPForms.
- Webflow:
  - Kolekce „Práce“ s kategoriemi, šablony pro seznam/detail, statické stránky pro Služby a Kontakt.

Časový odhad
- Analýza a obsah: 1 týden
- Design a vývoj: 2–3 týdny
- Testování a nasazení: 1 týden


