# Portfolio — Nadjide Omar

**Software Engineer · Full Stack & DevOps**

[portfolio-ts-nine.vercel.app](https://portfolio-ts-nine.vercel.app)

Une vitrine éditoriale graphite, ivoire et bleu glacier : présentation, architecture interactive, projets, parcours, compétences et contact.

## Expérience

- Une seule vitrine, directement accessible, sans choix de mode.
- Schéma d'architecture SVG explorable à la souris et au clavier : interface, API, données & IA, livraison.
- Stajio et DevOps Playground en réalisations principales ; cinq autres projets en liste.
- Fiches projets avec démonstrations vidéo chargées à la demande, liens source et site quand disponibles.
- Liens partageables, par exemple `?project=stajio`. Les anciens liens avec `?view=simple` ou `?view=terminal` arrivent sur la vitrine.
- Parcours détaillé dépliable, résultat concret, compétences en entreprise distinctes des technologies explorées sur projets.
- Navigation responsive, focus visible, modales accessibles et respect des animations réduites.
- Entrée progressive du hero, révélations au défilement, schéma flottant et progression de lecture ; contenu visible sans JavaScript.

La recherche de références Astra / Opus 5.5 et les choix de design sont documentés dans [docs/design-references.md](docs/design-references.md).

## Contenu et architecture

Les sources du profil restent centralisées dans `app/profileData.ts`, `app/portfolioContent.ts`, `app/projectsData.ts` et `app/contactData.ts`. Les résumés courts des projets font partie des données.

```text
app/
├── components/Portfolio.tsx
├── components/simple/SimpleView.tsx
├── components/simple/showcase.css
├── hooks/useFocusTrap.ts
├── *Data.ts / portfolioContent.ts
├── data.test.ts
└── opengraph-image.tsx
```

Le poster Stajio est une capture de la démonstration existante. Le schéma et l'illustration de livraison sont construits en SVG/CSS, sans WebGL ni bibliothèque 3D.

## Développement

Node.js **24.x** est requis, comme en CI et sur Vercel. La version est fixée dans `package.json` pour éviter qu'un ancien réglage Vercel conserve un runtime désactivé.

`npm install` puis `npm run dev`.

| Commande | Usage |
|---|---|
| `npm run dev` | Prévisualisation Next.js |
| `npm run build` | Build de production |
| `npm start` | Serveur de production |
| `npm run lint` | ESLint |
| `npm test` | Intégrité, confidentialité et cohérence des données |
| `npm run e2e` | Navigation, fiches projets, accessibilité clavier, liens existants et responsive |

Les tests end-to-end génèrent des aperçus desktop/mobile dans `artifacts/`.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Framer Motion · Vercel Analytics

## Contact

[GitHub](https://github.com/Nadjide) · [LinkedIn](https://www.linkedin.com/in/nadjide-omar-b55a01212/)
