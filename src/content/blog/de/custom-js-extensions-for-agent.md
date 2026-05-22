---
title: Machen Sie Ihren Agenten mit eigenen JavaScript extensions schlauer
date: 2026-05-22
description: Bringen Sie dem Agenten Ihre eigenen Helfer bei, indem Sie benutzerdefinierte JavaScript libraries im Repository ablegen.
tags:
  - agent
  - javascript
  - alfresco
  - extensions
---

Jemand fragt Sie: „Wie hole ich noch mal die Content-URL von einem Node?“

Sie _wissen_, dass Sie dieses Skript schon einmal verwendet haben. Aber Sie erinnern sich nicht mehr genau, wie man es schreibt – also suchen Sie in Ihrem Repo, in Jira, alten Confluence-Seiten, Slack-Threads … Zehn Minuten später haben Sie eine Version gefunden. Ein klassisches Problem. Das Wissen ist da, aber überall verstreut.

### Fragen Sie stattdessen den Agenten

Mit NodeRef können Sie den Großteil dieser Suche überspringen. Beschreiben Sie einfach, was Sie brauchen, und der Agent erstellt ein Skript für Sie. Sie können es testen, anpassen und speichern. Es ist keine Magie (prüfen Sie den Code immer), aber es hilft Ihnen, Ihre Arbeit deutlich schneller zu erledigen.

NodeRef bietet derzeit zwei Wege, mit dem Agenten zu arbeiten:

- **In der JavaScript Console**  
  Verwenden Sie den Befehl `/ai`, während Sie ein Skript bearbeiten. Ideal, wenn Sie schon eine grobe Vorstellung haben.

- **Im Chat**  
  Stellen Sie umfassendere Fragen. Der Agent kann verschiedene Tools aufrufen und bei Bedarf JavaScript direkt ausführen.

Standardmäßig kennt der Agent die üblichen Alfresco-Skriptobjekte (`search`, `people`, `jsonUtils` usw.) sowie einige zusätzliche Erweiterungen. Die vollständige Liste finden Sie in [`apps/backend/src/ai/libs`](https://github.com/noderef/noderef/tree/main/apps/backend/src/ai/libs). Die vom Agenten genutzten Tools können Sie im [NodeRef-Backend-Repository](https://github.com/noderef/noderef/tree/main/apps/backend/src/services/agent/tools) einsehen.

### Eigene JavaScript libraries anlegen

Für Ihre eigenen benutzerdefinierten JavaScript extensions können Sie jetzt Helferdateien erzeugen und hier ablegen:

**`Data Dictionary/NodeRef/js-libs`**

Jede Datei sollte mit einer kurzen Beschreibung und Tags beginnen, damit der Agent sie finden und sinnvoll nutzen kann:

```javascript
/**
 * @description Helper for your custom javascript extensions
 * @tags content, url, download, node, etc
 */
```

Ausführliche Anleitungen stehen in [custom-js-libs.md](https://github.com/noderef/noderef/blob/main/docs/custom-js-libs.md).
