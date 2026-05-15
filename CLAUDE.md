# Beachside Books – Prosjektkontekst for Claude Code

## Om nettsiden
Nettside for salg av håndlagde produkter. Målgruppe: ungdommer og unge voksne.
Betalingsløsning: Vipps (manuelt krav sendes etter bestilling – enten via handlekurv/checkout.html eller via Google Forms på bestill.html).

## Plassering på server
Mappen ligger under: /[DOMENE]/beachside/
(Oppdater med faktisk serversti)

---

## Mappestruktur
```
beachside/
  index.html          ← Forside
  produkter.html      ← Alle produkter (med Legg i kurv-knapper)
  bundle.html         ← Bundle-tilbud (med Legg i kurv-knapper)
  request.html        ← Info om personlig tilpasning
  bestill.html        ← Direkte bestilling via Google Forms (fallback)
  checkout.html       ← Handlekurv + bestillingsskjema (Supabase)
  admin.html          ← Adminpanel – ikke i nav, kun direkte URL
  cart.js             ← Handlekurv-logikk (localStorage + badge)
  nav.js              ← Hamburger-meny
  style.css           ← Felles stylesheet for alle sider
  CLAUDE.md           ← Denne filen
  bilder/
    originaler/       ← Legg nye bilder HER (ukomprimerte)
    produkter/
      notatblokk/     ← Komprimerte bilder av notatblokker
      nokkelring/     ← Komprimerte bilder av nøkkelringer
      bokmerker/      ← Komprimerte bilder av bokmerker
      bundle/         ← Komprimerte bilder av bundle
```

---

## Visuell stil
- **Tone:** Lys, sommerlig, ungdommelig og innbydende
- **Fargepalett (CSS-variabler i style.css):**
  - `--sand` #f5efe6 – hovedbakgrunn
  - `--hav` #7ab8c8 – havblå aksent
  - `--hav-deep` #4a90a8 – mørk havblå (lenker, detaljer)
  - `--korall` #e8896a – varm korall (primærknapper)
  - `--mint` #a8d4c0 – mint (request-knapper, detaljer)
  - `--tekst` #3a2e28 – mørk tekst
- **Fonter:** Playfair Display (overskrifter) + DM Sans (brødtekst)
- Bølge-delere mellom seksjoner for flyt og bevegelse
- Hvert side har sin egen bakgrunnstemning (mint, korall, hav) men deler style.css

---

## Tekniske regler
- Bruk ALDRI jQuery eller eksterne JavaScript-biblioteker
- Kun ren HTML, CSS og vanilla JavaScript
- Bilder skal alltid komprimeres og konverteres til WebP før bruk
- Maks bildebredde: 1200px
- Behold alltid originaler i bilder/originaler/
- Alle sider skal være mobilresponsive
- Oppdater alltid denne CLAUDE.md-filen når nye sider eller mapper opprettes

---

## Produkter og priser
Fyll inn faktiske priser (erstatt XX kr):

| Produkt | Pris | Google Forms-lenke |
|---------|------|-------------------|
| Dekorert notatblokk | XX kr | LENKETILGOOGLEFORMS?produkt=Notatblokk |
| Perlet nøkkelring | XX kr | LENKETILGOOGLEFORMS?produkt=Nøkkelring |
| Bokmerke | XX kr | LENKETILGOOGLEFORMS?produkt=Bokmerke |
| The Beachside Bundle | XX kr | LENKETILGOOGLEFORMS?produkt=Bundle |
| Request – Notatblokk | Varierer | LENKETILGOOGLEFORMS?produkt=Request+Notatblokk |
| Request – Nøkkelring | Varierer | LENKETILGOOGLEFORMS?produkt=Request+Nøkkelring |

---

## Kontaktinfo (oppdater)
- E-post: DIN@EPOST.NO
- Vipps-navn: [NAVN]
- Årstall i footer: 2025

---

## Google Forms
Bestillingsskjema er koblet til Google Sheets for ordrebok.
Forhåndsutfylte lenker brukes slik at riktig produkt er valgt automatisk.
Slik lager du forhåndsutfylt lenke:
1. Åpne skjema i Google Forms
2. Klikk ⋮ → "Forhåndsutfyll lenke"
3. Fyll ut produktfeltet
4. Kopier lenken og lim inn i HTML-filen

---

## Fremtidige produkter / sider
Legg til nye produkter her når de kommer:
- [Fremtidig produkt 1]
- [Fremtidig produkt 2]

---

## Supabase (handlekurv-backend)
- **URL:** `https://baafyabpancqfkeouizr.supabase.co`
- **Publishable key:** i cart.js og checkout.html/admin.html (trygg i frontend)
- **Tabell:** `orders` – se SQL nedenfor
- Bestillinger fra checkout.html POSTs til REST API med anon-nøkkel
- Admin logger inn med Supabase Auth (e-post + passord) på admin.html

### SQL for orders-tabellen (kjøres i Supabase SQL Editor én gang):
```sql
CREATE TABLE orders (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      timestamptz DEFAULT now(),
  customer_name   text NOT NULL,
  email           text NOT NULL,
  phone           text,
  items           jsonb NOT NULL,
  total           integer NOT NULL,
  special_request text,
  status          text DEFAULT 'ny' NOT NULL
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert"  ON orders FOR INSERT TO anon          WITH CHECK (true);
CREATE POLICY "auth_select"  ON orders FOR SELECT TO authenticated  USING (true);
CREATE POLICY "auth_update"  ON orders FOR UPDATE TO authenticated  USING (true);
```

---

## Endringslogg
| Dato | Endring |
|------|---------|
| 2025-XX-XX | Første versjon opprettet |
| 2026-05-15 | Logo innlemmet, fargepalett oppdatert, split hero-layout |
| 2026-05-15 | Handlekurv (cart.js), checkout.html, admin.html – Supabase-backend |
