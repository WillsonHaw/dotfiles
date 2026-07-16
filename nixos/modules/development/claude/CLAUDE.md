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
- KEEP WHY-comments — hidden constraints, subtle invariants, workarounds, rule-nuance explanations.
- When in doubt, keep.

```ts
// ❌ WHAT-comment
// Increment counter
counter++

// ✅ WHY-comment
// MCR spec §6.2: kong replacement draws from the dead wall, not the live wall.
const replacement = deadWall.pop()
```

---

## How to apply

- Apply all six rules on every edit — don't wait to be asked.
- On a cleanup sweep, treat all six rules as strict — violations should be zero across the scope.
- Any project may provide its own `docs/CODE_STYLE.md` that mirrors or extends these rules — read it first if present.
- **Project formatters take precedence over these manual rules.** If a project's formatter (oxfmt, Prettier, Biome, etc.) reflows code in a way that conflicts with these rules, follow the formatter's output. Do not fight the project's toolchain.
- Project lint and test suites should remain green after any cleanup.
