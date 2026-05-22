---
title: Haz tu agente más inteligente con JavaScript extensions personalizadas
date: 2026-05-22
description: Enséñale al agente tus propios helpers añadiendo JavaScript libraries personalizadas en el repositorio.
tags:
  - agent
  - javascript
  - alfresco
  - extensions
---

Alguien te pregunta: «¿Cómo obtengo otra vez la URL del contenido de un nodo?»

_Sabes_ que ya has usado este script antes. Pero no recuerdas exactamente cómo escribirlo, así que empiezas a buscar en tu repo, Jira, páginas antiguas de Confluence, hilos de Slack… Diez minutos después encuentras una versión. Un problema clásico: el conocimiento existe, pero está repartido por todas partes.

### Pregunta al agente

Con NodeRef puedes evitar la mayor parte de esa búsqueda. Describe lo que necesitas y el agente generará un script para ti. Puedes probarlo, ajustarlo y guardarlo. No es magia (revisa siempre el código), pero te ayudará a trabajar mucho más rápido.

NodeRef ofrece actualmente dos formas de trabajar con el agente:

- **En la consola JavaScript**  
  Usa el comando `/ai` mientras editas un script. Ideal cuando ya tienes una idea aproximada de lo que quieres.

- **En el chat**  
  Haz preguntas más amplias. El agente puede invocar varias herramientas y, cuando conviene, ejecutar JavaScript directamente.

De serie, el agente conoce los objetos de script estándar de Alfresco (`search`, `people`, `jsonUtils`, etc.) y algunas extensiones adicionales. La lista completa está en [`apps/backend/src/ai/libs`](https://github.com/noderef/noderef/tree/main/apps/backend/src/ai/libs). También puedes explorar las herramientas que usa el agente en el [repositorio backend de NodeRef](https://github.com/noderef/noderef/tree/main/apps/backend/src/services/agent/tools).

### Genera tus JavaScript libraries

Para tus propias JavaScript extensions personalizadas, ahora puedes generar archivos de ayuda y guardarlos aquí:

**`Data Dictionary/NodeRef/js-libs`**

Cada archivo debe empezar con una descripción breve y etiquetas para que el agente pueda descubrirlo y usarlo con eficacia:

```javascript
/**
 * @description Helper for your custom javascript extensions
 * @tags content, url, download, node, etc
 */
```

Las instrucciones completas están en [custom-js-libs.md](https://github.com/noderef/noderef/blob/main/docs/custom-js-libs.md).
