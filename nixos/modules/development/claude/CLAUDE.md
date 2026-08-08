# Global Code Style (Willson)

Formatting rules for all TypeScript/JavaScript code I generate for Willson, across every project. Apply on every edit — the goal is visual breathing room and explicit control flow.

---

## Rules

### 1. Braces on every `if` / `for` / `while`

No single-line control flow.

```ts
// ❌
if (x) return
for (const t of list) doThing(t)

// ✅
if (x) {
  return
}

for (const t of list) {
  doThing(t)
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
  doA()
}

doB()

// ✅ (chain — no blank)
if (x) {
  a()
} else {
  b()
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
const a = 1

const b = 2
const c = 3

// ✅
const a = 1
const b = 2
const c = 3

// ✅ (multi-line declaration doesn't break the group)
const db = getDb(env.DB)
const users = await db.select({ id: schema.user.id, name: schema.user.name }).from(schema.user)
const roles = await db.select().from(schema.role)
```

### 4. Blank line before every `return` statement

UNLESS the `return` is the first/only statement inside its immediately-enclosing `{}` block.

```ts
// ✅ solo return — fine as-is
if (x) {
  return
}

if (x) {
  return y
}

// ✅ return after other statements — blank before
function f() {
  doA()
  doB()

  return result
}
```

### 5. Blank line before every control-flow block

Every `if`/`for`/`while`/`switch`/`try` statement MUST have a blank line immediately before it, UNLESS it is the first statement in its enclosing `{}` block.

This applies regardless of what precedes it — a declaration, function call, assignment, another closing `}`, a multi-line expression's closing `)`, etc.

```ts
// ❌
const userId = req.headers.get('x-ws-user')
if (!userId) {
  throw new Error('missing')
}

// ✅
const userId = req.headers.get('x-ws-user')

if (!userId) {
  throw new Error('missing')
}
```

### 6. Remove unnecessary comments

- Delete WHAT-comments — they duplicate what good names already say.
- Delete WHY-comments too if the "why" is something a competent developer already knows (standard language/framework behavior) or would infer from reading the surrounding code for a few seconds. A comment has to earn its keep by saying something the code can't.
- Delete comments that narrate the internals of a *different* file/module/library instead of explaining the code they actually sit next to. If removing the comment would only cost the reader knowledge about some other file, it doesn't belong here.
- This applies to JSDoc too — being a doc block doesn't exempt it from the same test. Keep JSDoc that's functionally consumed by something (drives a generated UI, a type, a doc site) or documents a non-obvious contract; cut JSDoc that just restates the function's name/signature.
- KEEP comments only for things that aren't otherwise discoverable: race conditions and concurrency invariants, a workaround for a specific external/third-party bug, a hidden constraint imposed by a spec or another system, or a cross-file convention unique to this codebase.
- When in doubt, apply the test above rather than defaulting to keep — most borderline comments turn out to be safe to cut.

```ts
// ❌ WHAT-comment
// Increment counter
counter++

// ❌ WHY, but still delete — standard framework knowledge, not specific to this code
// Keying on the id forces a fresh mount instead of a manual reset.
<Item key={item.id} />

// ❌ narrates another file's internals instead of explaining this code
// so mount-controller's MutationObserver picks it up
function renderHook() { /* ... */ }

// ✅ WHY worth keeping — a real, non-obvious invariant local to this code
// Two mutation records for the same insertion can land in one observer
// callback, so the promise must be recorded synchronously, before any
// `await`, so a second call in the same tick sees it.
if (mountedParcels.has(hook)) return Promise.resolve()

// ✅ WHY worth keeping — MCR spec §6.2, not derivable from reading the code
const replacement = deadWall.pop()
```

---

## How to apply

- Apply all six rules on every edit — don't wait to be asked.
- On a cleanup sweep, treat all six rules as strict — violations should be zero across the scope.
- Any project may provide its own `docs/CODE_STYLE.md` that mirrors or extends these rules — read it first if present.
- **Project formatters take precedence over these manual rules.** If a project's formatter (oxfmt, Prettier, Biome, etc.) reflows code in a way that conflicts with these rules, follow the formatter's output. Do not fight the project's toolchain.
- Project lint and test suites should remain green after any cleanup.
