# Run the portfolio

This site uses React, TypeScript, and Vite. Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. Useful commands:

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

The production build is written to `dist/`. It uses relative asset paths and can be hosted as a static site, including in a GitHub Pages subdirectory.

On Windows, `./run.ps1` starts the development server. You can also use `./run.ps1 build`, `./run.ps1 test`, or `./run.ps1 typecheck`. The script uses your installed Node.js, with a fallback to the local portable runtime in `tmp/tools/` when present. That runtime is ignored by Git.

Portfolio content lives in `src/data/`. Project images are in `public/images/`; the downloadable resume is in `public/`. Course grades reflect the supplied transcript, with current and upcoming courses shown separately. The original profile README is unchanged.
