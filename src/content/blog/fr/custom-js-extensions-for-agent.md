---
title: Rendez votre agent plus intelligent grâce à des JavaScript extensions personnalisées
date: 2026-05-22
description: Apprenez à l’agent vos propres helpers en ajoutant des JavaScript libraries personnalisées dans le dépôt.
tags:
  - agent
  - javascript
  - alfresco
  - extensions
---

Quelqu’un vous demande : « Comment récupérer à nouveau l’URL du contenu d’un nœud ? »

Vous _savez_ que vous avez déjà utilisé ce script. Mais vous ne vous souvenez plus exactement comment l’écrire, alors vous fouillez dans votre dépôt, Jira, d’anciennes pages Confluence, des fils Slack… Dix minutes plus tard, vous avez trouvé une version. Un problème classique : le savoir existe, mais il est éparpillé partout.

### Demandez plutôt à l’agent

Avec NodeRef, vous pouvez éviter la majeure partie de ces recherches. Décrivez simplement ce dont vous avez besoin et l’agent générera un script pour vous. Vous pouvez le tester, l’ajuster et l’enregistrer. Ce n’est pas de la magie (relisez toujours le code), mais cela vous fera gagner beaucoup de temps.

NodeRef propose actuellement deux façons de travailler avec l’agent :

- **Dans la console JavaScript**  
  Utilisez la commande `/ai` pendant que vous modifiez un script. Idéal lorsque vous avez déjà une idée approximative.

- **Dans le chat**  
  Posez des questions plus larges. L’agent peut appeler divers outils et, lorsque c’est utile, exécuter du JavaScript directement.

Par défaut, l’agent connaît les objets de script Alfresco habituels (`search`, `people`, `jsonUtils`, etc.) ainsi que quelques extensions supplémentaires. La liste complète se trouve dans [`apps/backend/src/ai/libs`](https://github.com/noderef/noderef/tree/main/apps/backend/src/ai/libs). Vous pouvez aussi explorer les outils utilisés par l’agent dans le [dépôt backend NodeRef](https://github.com/noderef/noderef/tree/main/apps/backend/src/services/agent/tools).

### Générer vos JavaScript libraries

Pour vos propres JavaScript extensions personnalisées, vous pouvez désormais générer des fichiers d’aide et les stocker ici :

**`Data Dictionary/NodeRef/js-libs`**

Chaque fichier doit commencer par une courte description et des tags pour que l’agent puisse le découvrir et l’utiliser efficacement :

```javascript
/**
 * @description Helper for your custom javascript extensions
 * @tags content, url, download, node, etc
 */
```

Les instructions complètes sont dans [custom-js-libs.md](https://github.com/noderef/noderef/blob/main/docs/custom-js-libs.md).
