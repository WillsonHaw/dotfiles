# Global Code Style

Formatting rules for all TypeScript/JavaScript code I generate, across every project. Apply on every edit — the goal is visual breathing room and explicit control flow.

---

## Rules

### 1. Braces on every `if` / `for` / `while`

No single-line control flow.

```ts
// ❌
if (x) return;
for (const t of list) doThing(t);

// ✅
if (x) {
  return;
}

for (const t of list) {
  doThing(t);
}
```

### 2. Blank line after each closing `}` before the next block

Applies to `if`/`for`/`while`/`switch`/`try`/function bodies nested inside a larger block.

Exceptions:

- Chained clauses (`else`, `else if`, `catch`, `finally`) — no blank line before the chain keyword.
- The `}` is the last statement before the enclosing `}` — no trailing blank needed.
- Adjacent `case` clauses inside a `switch` — blank line between them.

```ts
// ✅
if (x) {
  doA();
}

doB();

// ✅ (chain — no blank)
if (x) {
  a();
} else {
  b();
}
```

### 3. Blank line BOTH BEFORE AND AFTER every group of `const` / `let` declarations

A "group" is any run of adjacent `const`/`let` lines (single-line or multi-line) with NO blank lines between them.

- **Consecutive `const`/`let` declarations stay packed — NO blank lines between individual declarations in the group.** Even when some lines use `await` or function calls, even when some span multiple lines (long object literals, chained method calls).
- Blank line BEFORE the group if a non-declaration statement precedes it.
- Blank line AFTER the group if a non-declaration statement follows it.
- No blank if the group is the first statement in its block (right after `{`).
- No blank if the group is the last statement in its block (right before `}`).

```ts
// ❌
const a = 1;

const b = 2;
const c = 3;

// ✅
const a = 1;
const b = 2;
const c = 3;

// ✅ (multi-line declaration doesn't break the group)
const db = getDb(env.DB);
const users = await db
  .select({ id: schema.user.id, name: schema.user.name })
  .from(schema.user);
const roles = await db.select().from(schema.role);
```

### 4. Blank line before every `return` statement

UNLESS the `return` is the first/only statement inside its immediately-enclosing `{}` block.

```ts
// ✅ solo return — fine as-is
if (x) {
  return;
}

if (x) {
  return y;
}

// ✅ return after other statements — blank before
function f() {
  doA();
  doB();

  return result;
}
```

### 5. Blank line before every control-flow block

Every `if`/`for`/`while`/`switch`/`try` statement MUST have a blank line immediately before it, UNLESS it is the first statement in its enclosing `{}` block.

This applies regardless of what precedes it — a declaration, function call, assignment, another closing `}`, a multi-line expression's closing `)`, etc.

```ts
// ❌
const userId = req.headers.get("x-ws-user");
if (!userId) {
  throw new Error("missing");
}

// ✅
const userId = req.headers.get("x-ws-user");

if (!userId) {
  throw new Error("missing");
}
```

### 6. Remove unnecessary comments

Strict bar: a comment earns its place only if the code directly beneath it would still be hard to parse *as code* with the comment covered up. Test it literally: hide the comment, read only the code. If the code is still confusing purely as code (a dense regex, a concurrency race, a timing-attack-safe comparison, non-obvious bitwise or geometric logic), keep the comment. If the code reads cleanly once the comment is gone, and all the comment was doing was explaining a decision, a bug's history, an invariant, or a cross-file convention, delete it, even when that explanation is true and genuinely useful to know.

This is stricter than "does the comment add information the code can't say." A comment can be accurate, non-obvious, and still worth deleting, if what it explains is *why this exists* rather than *what makes this code hard to read*.

Delete, even when instinct says keep:

- WHAT-comments that just restate what a good name already says.
- Architecture or design-rationale comments ("why this hook runs here", "why this is split into two files", security-design explanations).
- Comments explaining a historical bug or a workaround, unless the workaround code itself is genuinely intricate, not just a simple line with a confusing backstory.
- A hidden constraint imposed by a spec, another system, or a cross-file convention, unless the surrounding code is also hard to parse without it.
- JSDoc restating a contract, an invariant, or a design tradeoff.
- Comments that narrate the internals of a _different_ file or library instead of the code they sit next to.

KEEP only:

- Comments sitting directly above code a competent reader would still find hard to parse on its own: tricky regexes, concurrent cache-eviction races, timing-attack-safe comparisons, non-obvious bitwise, geometric, or algorithmic logic.
- JSDoc and pragmas actually consumed by tooling, not just descriptive (`@vitest-environment`, a type a codegen step reads, prop metadata a build step extracts into a schema). Deleting these breaks real behavior, not just prose.

Applies equally to config files (`.env`, `.dev.vars`, `wrangler.toml`, and similar), not only source code. A `KEY=value` line is never "intricate code" no matter how non-obvious the variable's purpose is, so explanatory comments there get the same treatment: a bare copy-instruction if genuinely needed, nothing more. Let the README carry the "what is this for" and "how do I get one" explanation instead of duplicating it above every variable.

```ts
// ❌ WHAT-comment
// Increment counter
counter++

// ❌ WHY, but still delete — explains a design decision, not confusing code
// Keying on the id forces a fresh mount instead of a manual reset.
<Item key={item.id} />

// ❌ WHY, but still delete — a real, true, non-obvious invariant, but the
// code below reads fine once you know it; the comment covers a *decision*,
// not untangled *code*
// Two mutation records for the same insertion can land in one observer
// callback, so the promise must be recorded synchronously, before any
// `await`, so a second call in the same tick sees it.
if (mountedParcels.has(hook)) return Promise.resolve()

// ❌ WHY, but still delete — MCR spec §6.2, true and non-obvious, but the
// line itself isn't hard to parse once you know that fact
const replacement = deadWall.pop()

// ✅ keep — the regex itself is what's hard to parse, not a design choice
// MAJOR.MINOR.PATCH, optional -prerelease and +build metadata
const SEMVER_PATTERN = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-.+)?$/
```

---

## How to apply

- Apply all six rules on every edit — don't wait to be asked.
- On a cleanup sweep, treat all six rules as strict — violations should be zero across the scope.
- Any project may provide its own `docs/CODE_STYLE.md` that mirrors or extends these rules — read it first if present.
- **Project formatters take precedence over these manual rules.** If a project's formatter (oxfmt, Prettier, Biome, etc.) reflows code in a way that conflicts with these rules, follow the formatter's output. Do not fight the project's toolchain.
- Project lint and test suites should remain green after any cleanup.

# Global Documentation Style

Formatting and tone rules for documentation, proposals, and other long-form prose I write, across every project.

---

## Rules

### 1. No em-dashes unless absolutely necessary

Use commas, periods, colons, or parentheses instead.

```md
❌ The registry re-derives its answer from scratch — there's no cache layer.
✅ The registry re-derives its answer from scratch. There's no cache layer.
```

### 2. No "Section #.#" style backreferences

Link the descriptive text in context instead of naming the section number.

```md
❌ See Section 4.2 for the scoped-token design.
✅ See [the scoped-token design](#42-open-problem-end-user-identity-and-scoped-access).
```

### 3. Keep prose concise and to the point

Avoid restating caveats or padding paragraphs with redundant hedging. Say a thing once, clearly, and move on.

### 4. Describe the current state directly, don't narrate revision history

When rewriting a doc to reflect a new or current design, write it as if it's the first version. Don't contrast against an earlier version of the same document ("the original proposal said...", "this used to work differently") unless the user explicitly asks for that framing. It's fine, and often necessary, to be honest that something isn't built yet or is an open question; just state it plainly rather than as a comparison to the document's own past.

### 5. No semicolons where a period would suffice

Split into two sentences instead of joining independent clauses with a semicolon. Where a period would genuinely read awkwardly (a short parenthetical aside, a list of brief examples), restructure with a comma and a conjunction instead of reaching for a semicolon.

```md
❌ The Registry never scans the filesystem in production; it queries a database instead.
✅ The Registry never scans the filesystem in production. It queries a database instead.
```

### 6. Match implementation detail to the doc's purpose, and never duplicate a fact across documents or sections

A README documents how to install, run, and call a package: quick start, its public API/CLI surface, configuration, scripts, and pointers to related packages. It is not the place to explain *why* an internal mechanism works the way it does, or to walk through its internal request/data flow, unless the package's own README is the only spec that mechanism has. Where a project has a dedicated architecture or spec doc, internal design and rationale belong there instead.

Within any single doc, state a given fact, mechanism, or list (an API's routes, a data model, a rule) in exactly one place, in the section that owns it. When another section needs it, link to the owning section instead of restating it, even partially or in summary. If restating starts to feel necessary to keep a section readable on its own, that's a sign the fact belongs at a higher, shared level both sections can link to, not that it should be copied.

```md
❌ (a package's README) Resolves components via a KV-shaped lookup: `GET /components/:pkg/:name`
   returns `{name, serviceUrl}`, `PUT /components/:pkg/:name` publishes a version and rejects
   overwriting one that already has content because published versions are immutable...
✅ (that same README) Resolves components from Cloudflare KV. See [the API section](#api) for routes.

❌ (an architecture doc's overview section) restates the exact route list and status codes a later
   section already spells out in full.
✅ (that overview section) "The read routes and what they return are described under
   [component discovery](#5-...). How a version is published or rolled back is described under
   [versioning](#...)."
```

### 7. Colons only where they set up what follows

A colon should signal that what directly follows it completes it: a list, an example, a direct quote, or a short label's definition. Don't reach for a colon as a softer period to glue two independent clauses together, the way `;` sometimes gets misused. If the clause after the colon is a full sentence that doesn't itemize, exemplify, or directly define what came before, split it into its own sentence instead.

```md
❌ The registry has no in-process cache: every request reads KV directly.
✅ The registry has no in-process cache. Every request reads KV directly.

✅ The registry exposes three read routes: a listing, a single-component summary, and a manifest.
✅ `tagName`: the custom element the rendered markup hydrates through.
```

---

## How to apply

- Apply all seven rules on every edit to documentation or prose — don't wait to be asked.
- On a rewrite or cleanup pass, treat all seven rules as strict.
- These rules apply to markdown docs, proposals, READMEs, and other long-form written content, and to the prose inside code comments (the words themselves, not the code they document). They don't apply to short conversational replies.

@RTK.md
