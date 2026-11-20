---
title: Drive NodeRef from your terminal
date: 2026-11-20
description: The noderef command talks to your running desktop app. Name a saved server, run scripts, and keep credentials out of the shell.
tags:
  - cli
  - javascript
  - alfresco
  - terminal
---

You have a cleanup script that works. You paste it into the JavaScript Console, run it on test, copy the output, tweak a line, paste it again. Then someone asks you to run it on staging too. Then you want an AI coding tool to iterate on it while you watch.

### Meet `noderef`

You can run that from the terminal now. The desktop app ships a `noderef` command. NodeRef has to be running. You name a server that is already saved in the app. The backend authenticates with the credentials it already stores, so the shell never sees a username or password.

```bash
noderef servers
noderef js TEST -e 'print(companyhome.name)'
noderef js TEST ./cleanup.js
```

That last one is the whole point: a local file, one command, the same JavaScript Console you already use.

### Get it on PATH

The packaged app includes the CLI. You do not need a separate Node.js install.

- **Windows MSI** — added to your user PATH. Open a new terminal after install.
- **Linux `.deb`** — `/usr/bin/noderef`
- **macOS** — Settings → About → **Install command**. Creates `/usr/local/bin/noderef`.
- **Windows ZIP / Linux `.tar.gz`** — add `node-src/cli` inside the app folder to PATH.

From a repository checkout: `node cli/noderef.mjs help`, or `pnpm cli help`.

### Scripts in the repository

The same folder you already know: `Data Dictionary/Scripts`.

```bash
noderef scripts list TEST
noderef scripts get TEST cleanup.js > cleanup.js
# ... edit cleanup.js ...
noderef js TEST ./cleanup.js
noderef scripts save TEST cleanup.js ./cleanup.js -m "Fix date filter"
```

Each save creates a new minor version. If the script is not versionable yet, NodeRef makes it so first, so the previous content is never lost.

You can also run a stored script without downloading it: `noderef js TEST --saved cleanup.js`.

### Let an AI coding tool drive it

Point Claude Code, Cursor, or a similar tool at a **test** server, not production:

> Use `noderef js localhost` to run this script against my test repository.

The tool can fetch, edit, run, and save, without ever handling Alfresco credentials.

### A few things to keep in mind

- Scripts run with the saved account's rights, in a read-write transaction, the same as in the JavaScript Console.
- `rpc` can call any backend method. Only give that to tools you trust.
- Docker deployments need `NODEREF_URL`. If the instance is protected with `WEB_PASSWORD`, the CLI cannot authenticate.

Full commands, options, and troubleshooting are in [cli.md](https://github.com/noderef/noderef/blob/main/docs/cli.md).
