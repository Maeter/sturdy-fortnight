# Todo App — Technical Proof

A TODO list app built as a frontend engineering technical assessment. It ships two implementations: one in **Next.js + React** and one in **Vanilla JS**, both sharing the same markup and Tailwind CSS classes.

## Setup

Requires Node 24.15.0 or later. This project uses [Yarn](https://yarnpkg.com/) as its package manager (v4, via Corepack). Enable it before installing:

```bash
corepack enable
```

Then install dependencies:

```bash
yarn install
```

---

## React (Next.js)

The React version lives in `app/` and uses Next.js App Router, Redux Toolkit, and Tailwind CSS v4.

### Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
yarn build
yarn start
```

### Tests

Unit and component tests with Vitest:

```bash
yarn test
```

End-to-end tests with Cypress (starts the dev server automatically):

```bash
yarn e2e
```

To run Cypress interactively, start the dev server first, then open the Cypress UI:

```bash
yarn dev
yarn cypress:open
```

---

## Vanilla JS

The vanilla version lives in `vanilla/` and uses plain JavaScript with no build step.

### Development

```bash
yarn vanilla
```

Open [http://localhost:3001](http://localhost:3001).

### End-to-end tests

Run the full pipeline (starts the server, runs Cypress, then tears it down):

```bash
yarn e2e:vanilla
```

To run Cypress interactively, start the vanilla server first, then open the Cypress UI:

```bash
yarn vanilla
yarn cypress:open:vanilla
```

---

## Quality

### Pre-commit hook

A Husky pre-commit hook runs automatically on every commit:

1. **Prettier** (via lint-staged) — formats all staged files in place before they are committed.
2. **Unit tests** — runs the full Vitest suite. The commit is blocked if any test fails.

E2E tests are intentionally excluded from the hook because they require a running server and are slow. Run them manually or in CI with `yarn e2e` / `yarn e2e:vanilla`.

### Testing strategy

| Layer            | Tool                           | Scope                                                        |
| ---------------- | ------------------------------ | ------------------------------------------------------------ |
| Unit / component | Vitest + React Testing Library | Individual components and Redux slice logic in isolation     |
| End-to-end       | Cypress                        | Full user journeys in a real browser against the running app |

Unit tests focus on component behavior and state mutations (reducers, selectors, button states). E2E tests cover the golden paths a real user would follow: adding items, selecting and deleting in bulk, and undoing changes.

### Formatting

Prettier runs on every staged file at commit time. The config extends the default Prettier rules with `prettier-plugin-tailwindcss` to enforce a consistent Tailwind class order.
