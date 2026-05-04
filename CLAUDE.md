# Beachside Stories – Prosjektkontekst for Claude Code

## Om nettsiden
Nettside for salg av håndlagde produkter. Målgruppe: ungdommer og unge voksne.
Betalingsløsning: Vipps (manuelt krav sendes etter bestilling via Google Forms).

## Plassering på server
Mappen ligger under: /[DOMENE]/beachside/
(Oppdater med faktisk serversti)

---

## Mappestruktur
```
beachside/
  index.html          ← Forside
  produkter.html      ← Alle produkter
  bundle.html         ← Bundle-tilbud
  request.html        ← Tilpasningsforespørsler
  bestill.html        ← Bestillingsoversikt
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

## Endringslogg
| Dato | Endring |
|------|---------|
| 2025-XX-XX | Første versjon opprettet |
