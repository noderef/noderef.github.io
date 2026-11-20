---
title: Controla NodeRef desde tu terminal
date: 2026-11-20
description: El comando noderef habla con tu desktop app en ejecución. Nombra un servidor guardado, ejecuta scripts y deja las credenciales fuera de la shell.
tags:
  - cli
  - javascript
  - alfresco
  - terminal
---

Tienes un cleanup script que funciona. Lo pegas en la JavaScript Console, lo ejecutas en test, copias la salida, retocas una línea, vuelves a pegar. Luego alguien te pide que lo ejecutes también en staging. Y entonces quieres que un AI coding tool lo vaya puliendo mientras tú miras.

### Conoce `noderef`

Ahora puedes hacer eso desde el terminal. La desktop app incluye el comando `noderef`. NodeRef tiene que estar en marcha. Nombras un servidor que ya está guardado en la app. El backend se autentica con las credenciales que ya almacena, así que la shell nunca ve un usuario ni una contraseña.

```bash
noderef servers
noderef js TEST -e 'print(companyhome.name)'
noderef js TEST ./cleanup.js
```

Eso último es exactamente el punto: un archivo local, un comando, la misma JavaScript Console que ya usas.

### Ponlo en el PATH

La app que instalas incluye la CLI. No necesitas instalar Node.js por separado.

- **Windows MSI** — se añade a tu user PATH. Abre una terminal nueva después de instalar.
- **Linux `.deb`** — `/usr/bin/noderef`
- **macOS** — Ajustes → Acerca de → **Instalar comando**. Crea `/usr/local/bin/noderef`.
- **Windows ZIP / Linux `.tar.gz`** — añade `node-src/cli` dentro de la carpeta de la app al PATH.

Desde un repository checkout: `node cli/noderef.mjs help`, o `pnpm cli help`.

### Scripts en el repository

La misma carpeta que ya conoces: `Data Dictionary/Scripts`.

```bash
noderef scripts list TEST
noderef scripts get TEST cleanup.js > cleanup.js
# ... edit cleanup.js ...
noderef js TEST ./cleanup.js
noderef scripts save TEST cleanup.js ./cleanup.js -m "Fix date filter"
```

Cada save crea una nueva minor version. Si el script aún no es versionable, NodeRef lo deja listo primero, así que el contenido anterior nunca se pierde.

También puedes ejecutar un script guardado sin descargarlo: `noderef js TEST --saved cleanup.js`.

### Deja que un AI coding tool lo controle

Apunta Claude Code, Cursor o una herramienta similar a un servidor **test**, no a production:

> Use `noderef js localhost` to run this script against my test repository.

La herramienta puede obtener, editar, ejecutar y guardar, sin manejar nunca credenciales de Alfresco.

### Algunas cosas a tener en cuenta

- Los scripts se ejecutan con los derechos de la cuenta guardada, en una read-write transaction, igual que en la JavaScript Console.
- `rpc` puede llamar a cualquier backend method. Dáselo solo a herramientas en las que confíes.
- Los Docker deployments necesitan `NODEREF_URL`. Si la instance está protegida con `WEB_PASSWORD`, la CLI no puede autenticarse.

Los comandos, opciones y el troubleshooting completos están en [cli.md](https://github.com/noderef/noderef/blob/main/docs/cli.md).
