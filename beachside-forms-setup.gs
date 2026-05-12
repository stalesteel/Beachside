function opprettBeachsideSkjema() {

  var f = FormApp.create('Beachside Books – Bestilling');
  f.setDescription(
    'Fyll inn antall der du ønsker noe – la feltet stå blankt for ingen. ' +
    'Du kan bestille fra flere temaer på én gang.'
  );
  f.setConfirmationMessage(
    'Takk for bestillingen! 🌊 Vi tar kontakt på e-post innen kort tid.'
  );
  f.setCollectEmail(false);

  // ── Hjelpefunksjon: legg til overskrift + 4 produktfelt for ett tema ──
  var hint = 'Antall – la stå blankt for ingen';
  function tema(navn) {
    f.addSectionHeaderItem().setTitle(navn);
    ['Notatbok – 59 kr', 'Nøkkelring – 19 kr', 'Bokmerke – 9 kr pr stk', 'Bundle – 89 kr']
      .forEach(function(p) { f.addTextItem().setTitle(p).setHelpText(hint).setRequired(false); });
  }

  // ── SIDE 1: Alle produkter + tilpasning + ekstra + kontaktinfo ──
  f.addSectionHeaderItem()
    .setTitle('Velg produkter')
    .setHelpText('Alle temaer på én side – scroll ned for å se alle.');

  tema('The Beachbag Bundle');
  tema('Mermaid Mist');
  tema('Sunset Shore');
  tema('Tropical Treasure');

  f.addSectionHeaderItem().setTitle('Personlig tilpasning (valgfritt)');
  f.addParagraphTextItem()
    .setTitle('Ønsker om tilpasning')
    .setHelpText('Gjelder kun notatbok og nøkkelring. Beskriv ønsket design, farger, tekst osv.')
    .setRequired(false);

  f.addSectionHeaderItem().setTitle('Vil du gi litt ekstra? 💙');
  f.addTextItem()
    .setTitle('Frivillig ekstra beløp (kr)')
    .setHelpText('Hvert produkt lages for hånd med mye kjærlighet. Synes du prisene er for lave, setter vi stor pris på et frivillig tillegg!')
    .setRequired(false);

  f.addSectionHeaderItem().setTitle('Kontaktinformasjon');
  f.addTextItem().setTitle('Navn').setRequired(true);
  f.addTextItem().setTitle('E-postadresse').setRequired(true).setHelpText('Vi sender ordrebekreftelse hit');
  f.addTextItem().setTitle('Telefonnummer').setRequired(true).setHelpText('Brukes til Vipps-krav (8 siffer)');

  // ── SIDE 2: Levering ──
  var sLevering = f.addPageBreakItem().setTitle('Levering');
  var levering = f.addMultipleChoiceItem().setTitle('Leveringsmåte').setRequired(true);

  // ── SIDE 3a: Adresse (kun ved postlevering) ──
  var sAdresse = f.addPageBreakItem().setTitle('Leveringsadresse');
  f.addParagraphTextItem().setTitle('Adresse').setRequired(true)
    .setHelpText('Gatenavn og husnummer, postnummer og poststed');

  // ── SIDE 3b: Avslutning ──
  var sAvslutt = f.addPageBreakItem().setTitle('Tilslutt');
  f.addParagraphTextItem().setTitle('Andre kommentarer (valgfritt)').setRequired(false);

  levering.setChoices([
    levering.createChoice('Hentes personlig', sAvslutt),
    levering.createChoice('Sendes i posten',  sAdresse)
  ]);

  // ── Koble til Google Sheet + håndteringskolonner ──
  var ss = SpreadsheetApp.create('Beachside Books – Ordrer');
  f.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  Utilities.sleep(3000);

  ss.getSheets().forEach(function(ark) {
    if (ark.getName().match(/svar|Responses|Form/i)) {
      var kol = ark.getLastColumn() + 1;
      ark.getRange(1, kol, 1, 7)
        .setValues([['Ordre-ID','Pris (kr)','Status','Vipps sendt','Betalt','Sendt','Intern merknad']])
        .setBackground('#4a90a8').setFontColor('#ffffff').setFontWeight('bold');
      ark.setFrozenRows(1);
      ark.getRange(2, kol + 2, 500, 1).setDataValidation(
        SpreadsheetApp.newDataValidation()
          .requireValueInList(['Ny','Bekreftet','Vipps sendt','Betalt','Sendt','Fullført'], true).build()
      );
    }
  });

  SpreadsheetApp.getUi().alert(
    '✅ Ferdig!\n\n' +
    'Skjema (rediger):\n' + f.getEditUrl() + '\n\n' +
    'Kundelenke:\n' + f.getPublishedUrl() + '\n\n' +
    'Google Sheet:\n' + ss.getUrl() + '\n\n' +
    '⚠️ Husk: aktivér e-postvarsling i Forms → Svar-fanen → ⋮'
  );
}
