---
title: Maak je agent slimmer met eigen JavaScript extensions
date: 2026-05-22
description: Laat de agent jouw eigen helpers gebruiken door custom JavaScript libraries in de repository toe te voegen.
tags:
  - agent
  - javascript
  - alfresco
  - extensions
---

Iemand vraagt je: “Hoe haal ik ook alweer de content-URL van een node op?”

Je _weet_ dat je dit script eerder hebt gebruikt. Maar je weet niet meer precies hoe je het moet schrijven, dus je gaat zoeken in je repo, Jira, oude Confluence-pagina’s, Slack-threads… Tien minuten later heb je een versie gevonden. Een klassiek probleem. De kennis is er, maar verspreid overal.

### Vraag het aan de agent

Met NodeRef kun je het grootste deel van dat zoekwerk overslaan. Beschrijf gewoon wat je nodig hebt en de agent genereert een script voor je. Je kunt het testen, bijsturen en opslaan. Het is geen magie (controleer de code altijd), maar het helpt je wel veel sneller je werk te doen.

NodeRef biedt op dit moment twee manieren om met de agent te werken:

- **In de JavaScript Console**  
  Gebruik het `/ai`-commando terwijl je een script bewerkt. Ideaal als je al een ruwe versie in je hoofd hebt.

- **In de chat**  
  Stel bredere vragen. De agent kan verschillende tools aanroepen en waar nuttig JavaScript direct uitvoeren.

Standaard kent de agent de gebruikelijke Alfresco-scriptobjecten (`search`, `people`, `jsonUtils`, enz.) en een aantal extra extensies. Het volledige overzicht staat in [`apps/backend/src/ai/libs`](https://github.com/noderef/noderef/tree/main/apps/backend/src/ai/libs). Je kunt ook de tools bekijken die de agent gebruikt in de [NodeRef backend-repo](https://github.com/noderef/noderef/tree/main/apps/backend/src/services/agent/tools).

### Je eigen JavaScript libraries genereren

Voor je eigen custom JavaScript extensions kun je nu helperbestanden genereren en hier opslaan:

**`Data Dictionary/NodeRef/js-libs`**

Elk bestand begint met een korte beschrijving en tags, zodat de agent het kan vinden en effectief gebruiken:

```javascript
/**
 * @description Helper for your custom javascript extensions
 * @tags content, url, download, node, etc
 */
```

Volledige instructies staan in [custom-js-libs.md](https://github.com/noderef/noderef/blob/main/docs/custom-js-libs.md).
