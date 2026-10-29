# Oscar Ekberg’s portfolio

A personal portfolio built with React and Vite. A short introduction, my work at Columbus, real project previews, and a little background on my work in backend development and DevOps.

[oscarekberg.com](https://oscarekberg.com)

## Development

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm run build
npm run preview
```

Deploy the generated `dist` directory. The site uses root-relative asset paths and is intended to be hosted at the domain root.

## Editing the site

- `src/App.jsx`: introduction, project links, background, and contact details.
- `src/index.css`: layout, typography, colors, and responsive styles.
- `public/images`: optimized WebP project previews and portrait.
- `index.html` and `public/manifest.webmanifest`: page metadata and browser theme.

The page includes keyboard navigation, a skip link, reduced-motion support, and email copying with success and failure feedback. Fonts and project images are served locally.

## Image sources

- Portrait: [my public GitHub profile](https://github.com/Oscar679).
- TerraTactics: gameplay captured from [the project](https://github.com/Oscar679/TerraTactics).
- ClimateBot: the prototype photo from [`static/img/fullSetup.jpg`](https://github.com/Oscar679/iot_project/blob/main/static/img/fullSetup.jpg).
- GeoGuessr Clone: a screenshot of [the live project](https://melab.lnu.se/~oe222ia/1me326/).

Familjen Grotesk is self-hosted under the SIL Open Font License; see `public/fonts/OFL.txt`.
