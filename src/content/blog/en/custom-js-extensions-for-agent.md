---
title: Make your agent smarter with custom JavaScript extensions
date: 2026-05-22
description: Teach the agent your own helpers by adding custom JavaScript libraries in the repository.
tags:
  - agent
  - javascript
  - alfresco
  - extensions
---

Someone asks you: “How do I get the content URL from a node again?”

You _know_ you’ve used this script before. But you can’t remember exactly how to write it, so you start looking in your repo, Jira, old Confluence pages, Slack threads… Ten minutes later you’ve found a version. This is a classic problem. The knowledge exists, but it’s scattered everywhere.

### Ask the agent instead

With NodeRef, you can shortcut most of that digging. Just describe what you need and the agent will generate a script for you. You can test it, tweak it, and save it. It’s not magic (you should always review the code) but it will help you do your job much faster.

NodeRef currently offers two ways to work with the agent:

- **In the JavaScript Console**  
  Use the `/ai` command while editing a script. Great when you already have a rough idea of what you want.

- **In chat**  
  Ask broader questions. The agent can call various tools and when useful, execute JavaScript directly.

Out of the box, the agent knows the standard Alfresco script objects (`search`, `people`, `jsonUtils`, etc.) and some extra extensions. See the complete list in [`apps/backend/src/ai/libs`](https://github.com/noderef/noderef/tree/main/apps/backend/src/ai/libs). You can also explore the available tools the agent uses in the [NodeRef backend repo](https://github.com/noderef/noderef/tree/main/apps/backend/src/services/agent/tools).

### Generate your JavaScript libraries

For your own custom JavaScript extensions, you can now generate your own helper files and store them here:

**`Data Dictionary/NodeRef/js-libs`**

Each file should start with a short description and tags so the agent can discover and use it effectively:

```javascript
/**
 * @description Helper for your custom javascript extensions
 * @tags content, url, download, node, etc
 */
```

I have created full instructions in [custom-js-libs.md](https://github.com/noderef/noderef/blob/main/docs/custom-js-libs.md).
