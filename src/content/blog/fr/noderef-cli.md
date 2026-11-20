---
title: Pilotez NodeRef depuis votre terminal
date: 2026-11-20
description: La commande noderef parle à votre desktop app déjà lancée. Indiquez un serveur enregistré, exécutez des scripts, et laissez les identifiants hors du shell.
tags:
  - cli
  - javascript
  - alfresco
  - terminal
---

Vous avez un cleanup script qui fonctionne. Vous le collez dans la JavaScript Console, vous l’exécutez sur test, vous copiez la sortie, vous ajustez une ligne, vous recollez. Puis quelqu’un vous demande de le lancer aussi sur staging. Puis vous voulez qu’un AI coding tool continue de l’ajuster pendant que vous regardez.

### Découvrez `noderef`

Vous pouvez désormais le faire depuis le terminal. La desktop app livre la commande `noderef`. NodeRef doit être lancé. Vous indiquez un serveur déjà enregistré dans l’app. Le backend s’authentifie avec les identifiants qu’il a déjà en stock, si bien que le shell ne voit jamais de nom d’utilisateur ni de mot de passe.

```bash
noderef servers
noderef js TEST -e 'print(companyhome.name)'
noderef js TEST ./cleanup.js
```

C’est tout l’intérêt de la dernière ligne : un fichier local, une commande, la même JavaScript Console que vous utilisez déjà.

### Ajoutez-le au PATH

L’app que vous installez inclut la CLI. Vous n’avez pas besoin d’installer Node.js à part.

- **Windows MSI** — ajouté à votre user PATH. Ouvrez un nouveau terminal après l’installation.
- **Linux `.deb`** — `/usr/bin/noderef`
- **macOS** — Paramètres → À propos → **Installer la commande**. Crée `/usr/local/bin/noderef`.
- **Windows ZIP / Linux `.tar.gz`** — ajoutez `node-src/cli` dans le dossier de l’app au PATH.

Depuis un repository checkout : `node cli/noderef.mjs help`, ou `pnpm cli help`.

### Scripts dans le repository

Le même dossier que vous connaissez déjà : `Data Dictionary/Scripts`.

```bash
noderef scripts list TEST
noderef scripts get TEST cleanup.js > cleanup.js
# ... edit cleanup.js ...
noderef js TEST ./cleanup.js
noderef scripts save TEST cleanup.js ./cleanup.js -m "Fix date filter"
```

Chaque save crée une nouvelle minor version. Si le script n’est pas encore versionable, NodeRef le rend d’abord versionable, si bien que le contenu précédent n’est jamais perdu.

Vous pouvez aussi exécuter un script stocké sans le télécharger : `noderef js TEST --saved cleanup.js`.

### Laissez un AI coding tool le piloter

Pointez Claude Code, Cursor ou un outil similaire vers un serveur **test**, pas production :

> Use `noderef js localhost` to run this script against my test repository.

L’outil peut récupérer, modifier, exécuter et enregistrer, sans jamais manipuler d’identifiants Alfresco.

### Quelques points à retenir

- Les scripts s’exécutent avec les droits du compte enregistré, dans une read-write transaction, comme dans la JavaScript Console.
- `rpc` peut appeler n’importe quelle backend method. Ne l’autorisez qu’aux outils auxquels vous faites confiance.
- Les Docker deployments ont besoin de `NODEREF_URL`. Si l’instance est protégée par `WEB_PASSWORD`, la CLI ne peut pas s’authentifier.

Les commandes, options et le troubleshooting complets sont dans [cli.md](https://github.com/noderef/noderef/blob/main/docs/cli.md).
