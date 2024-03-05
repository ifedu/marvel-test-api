This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description

Welcome, this application consists of a test using Marvel's public API.

The app allows you to search among characters, add and view your favorites, and click on characters to get more details such as their description or comics in which they appear.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Roboto Condensed, a custom Google Font.

- Run test
  - `npm run test`
- Run test and watch the changes
  - `npm run test:watch`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployed on Vercel

The deployed project can be viewed at https://marvel-test-api-gamma.vercel.app/.

## Directory tree

- [public/](./marvel/public)
  - [images/](./marvel/public/images) _route for the static images_
- [src/](./marvel/src) _main directory_
  - [app/](./marvel/src/app) _views_
    - [(home)/](<./marvel/src/app/(home)>) _main route_
    - [character/](./marvel/src/app/character)
      - [[id]/](./marvel/src/app/character/[id]) _dynamic route_
  - [components/](./marvel/src/components) _components_
    - [CharacterCard/](./marvel/src/components/CharacterCard)
    - [CharacterDetail/](./marvel/src/components/CharacterDetail)
    - [Header/](./marvel/src/components/Header)
    - [SearchBar/](./marvel/src/components/SearchBar)
  - [contexts/](./marvel/src/contexts) _contexts_
  - [hooks/](./marvel/src/hooks) _hooks_
  - [models/](./marvel/src/models) _models_
  - [repositories/](./marvel/src/repositories) _communication with the server_
  - [uses-cases/](./marvel/src/uses-cases) _transform data from repositories to serve hooks_
  - [utils/](./marvel/src/utils) _shared code between the app_

## Used Libs

- Axios
- Jest
- Nextjs
