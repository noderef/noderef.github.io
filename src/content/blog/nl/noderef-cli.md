---
title: Bedien NodeRef vanuit je terminal
date: 2026-11-20
description: Het commando noderef praat met je draaiende desktop app. Noem een opgeslagen server, voer scripts uit en houd inloggegevens buiten de shell.
tags:
  - cli
  - javascript
  - alfresco
  - terminal
---

Je hebt een cleanup script dat werkt. Je plakt het in de JavaScript Console, draait het op test, kopieert de output, past een regel aan, plakt opnieuw. Dan vraagt iemand of je het ook op staging wilt draaien. En dan wil je dat een AI coding tool het blijft bijschaven terwijl jij toekijkt.

### Maak kennis met `noderef`

Dat kun je nu vanuit de terminal doen. De desktop app levert het commando `noderef` mee. NodeRef moet draaien. Je noemt een server die al in de app is opgeslagen. De backend logt in met de gegevens die daar al staan, zodat de shell nooit een gebruikersnaam of wachtwoord ziet.

```bash
noderef servers
noderef js TEST -e 'print(companyhome.name)'
noderef js TEST ./cleanup.js
```

Dat laatste is precies het punt: een lokaal bestand, één commando, dezelfde JavaScript Console die je al gebruikt.

### Zet het op PATH

De app die je installeert bevat de CLI. Je hoeft Node.js niet apart te installeren.

- **Windows MSI** — toegevoegd aan je user PATH. Open na de installatie een nieuwe terminal.
- **Linux `.deb`** — `/usr/bin/noderef`
- **macOS** — Instellingen → Over → **Commando installeren**. Maakt `/usr/local/bin/noderef` aan.
- **Windows ZIP / Linux `.tar.gz`** — voeg `node-src/cli` in de app-map toe aan PATH.

Vanuit een repository checkout: `node cli/noderef.mjs help`, of `pnpm cli help`.

### Scripts in de repository

Dezelfde map die je al kent: `Data Dictionary/Scripts`.

```bash
noderef scripts list TEST
noderef scripts get TEST cleanup.js > cleanup.js
# ... edit cleanup.js ...
noderef js TEST ./cleanup.js
noderef scripts save TEST cleanup.js ./cleanup.js -m "Fix date filter"
```

Elke save maakt een nieuwe minor version. Als het script nog niet versionable is, zet NodeRef dat eerst aan, zodat de vorige inhoud nooit verloren gaat.

Je kunt een opgeslagen script ook draaien zonder het te downloaden: `noderef js TEST --saved cleanup.js`.

### Laat een AI coding tool het aansturen

Richt Claude Code, Cursor of een vergelijkbare tool op een **test** server, niet op production:

> Use `noderef js localhost` to run this script against my test repository.

De tool kan ophalen, bewerken, uitvoeren en opslaan, zonder ooit Alfresco credentials te verwerken.

### Een paar dingen om in gedachten te houden

- Scripts draaien met de rechten van het opgeslagen account, in een read-write transaction, net als in de JavaScript Console.
- `rpc` kan elke backend method aanroepen. Geef dat alleen aan tools die je vertrouwt.
- Docker deployments hebben `NODEREF_URL` nodig. Als de instance is beveiligd met `WEB_PASSWORD`, kan de CLI niet authenticeren.

Alle commando’s, opties en troubleshooting staan in [cli.md](https://github.com/noderef/noderef/blob/main/docs/cli.md).
