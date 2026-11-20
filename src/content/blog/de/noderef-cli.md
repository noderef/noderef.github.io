---
title: Steuern Sie NodeRef über Ihr Terminal
date: 2026-11-20
description: Der Befehl noderef spricht mit Ihrer laufenden desktop app. Nennen Sie einen gespeicherten Server, führen Sie Scripts aus und halten Sie Anmeldedaten von der Shell fern.
tags:
  - cli
  - javascript
  - alfresco
  - terminal
---

Sie haben ein cleanup script, das funktioniert. Sie fügen es in die JavaScript Console ein, führen es auf test aus, kopieren die Ausgabe, ändern eine Zeile, fügen es erneut ein. Dann bittet Sie jemand, es auch auf staging auszuführen. Und dann soll ein AI coding tool daran weiterfeilen, während Sie zuschauen.

### Lernen Sie `noderef` kennen

Das geht jetzt vom Terminal aus. Die desktop app bringt den Befehl `noderef` mit. NodeRef muss laufen. Sie nennen einen Server, der bereits in der App gespeichert ist. Das Backend authentifiziert sich mit den Zugangsdaten, die es bereits kennt – die Shell sieht weder Benutzername noch Passwort.

```bash
noderef servers
noderef js TEST -e 'print(companyhome.name)'
noderef js TEST ./cleanup.js
```

Genau darum geht es beim letzten Beispiel: eine lokale Datei, ein Befehl, dieselbe JavaScript Console, die Sie ohnehin nutzen.

### Auf den PATH legen

Die App, die Sie installieren, enthält die CLI. Sie brauchen Node.js nicht separat zu installieren.

- **Windows MSI** — wird Ihrem user PATH hinzugefügt. Öffnen Sie nach der Installation ein neues Terminal.
- **Linux `.deb`** — `/usr/bin/noderef`
- **macOS** — Einstellungen → Über → **Befehl installieren**. Legt `/usr/local/bin/noderef` an.
- **Windows ZIP / Linux `.tar.gz`** — fügen Sie `node-src/cli` im App-Ordner zum PATH hinzu.

Aus einem repository checkout: `node cli/noderef.mjs help` oder `pnpm cli help`.

### Scripts im repository

Derselbe Ordner, den Sie schon kennen: `Data Dictionary/Scripts`.

```bash
noderef scripts list TEST
noderef scripts get TEST cleanup.js > cleanup.js
# ... edit cleanup.js ...
noderef js TEST ./cleanup.js
noderef scripts save TEST cleanup.js ./cleanup.js -m "Fix date filter"
```

Jeder save erzeugt eine neue minor version. Ist das Script noch nicht versionable, holt NodeRef das zuerst nach – der bisherige Inhalt geht dabei nicht verloren.

Sie können ein gespeichertes Script auch ausführen, ohne es herunterzuladen: `noderef js TEST --saved cleanup.js`.

### Ein AI coding tool steuern lassen

Richten Sie Claude Code, Cursor oder ein vergleichbares Tool auf einen **test** Server, nicht auf production:

> Use `noderef js localhost` to run this script against my test repository.

Das Tool kann holen, bearbeiten, ausführen und speichern – ohne jemals Alfresco credentials anzufassen.

### Ein paar Dinge, die Sie im Hinterkopf behalten sollten

- Scripts laufen mit den Rechten des gespeicherten Kontos, in einer read-write transaction, genau wie in der JavaScript Console.
- `rpc` kann jede Backend method aufrufen. Geben Sie das nur an Tools, denen Sie vertrauen.
- Docker deployments brauchen `NODEREF_URL`. Ist die instance mit `WEB_PASSWORD` geschützt, kann sich die CLI nicht authentifizieren.

Alle Befehle, Optionen und troubleshooting stehen in [cli.md](https://github.com/noderef/noderef/blob/main/docs/cli.md).
