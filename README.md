<div align="center">

# Portfolio — Nadjide Omar

**Ingénieur DevOps & Développeur Full Stack**

Un portfolio interactif avec **deux expériences** : une vitrine claire pour les recruteurs, et un **IDE façon VS Code** (avec terminal jouable) pour les développeurs.

**[portfolio-ts-nine.vercel.app](https://portfolio-ts-nine.vercel.app)**

`Next.js` · `TypeScript` · `Tailwind CSS` · `Framer Motion`

</div>

---

## Le concept

Le portfolio propose deux vues, basculables à tout moment (avec une petite animation de transition « écran qui s'allume ») :

### Vue recruteur

Une landing page moderne, droit au but : hero animé, marquee de technologies, grille *bento*, *spotlight cards* qui suivent la souris, timelines de parcours, et fiches projets avec démo vidéo. Pensée pour qu'un profil non-technique comprenne l'essentiel en quelques secondes.

### Vue développeur

Une reproduction d'un éditeur **VS Code** entièrement fonctionnelle :

- **Explorateur de fichiers** (icônes façon *Material Icon Theme*) où chaque fichier expose une partie du CV (`projects/`, `experience/`, `about/`, `skills.json`…).
- **Recherche** dans le contenu des fichiers, **Run & Debug** pour lancer les démos de projets.
- **Éditeur** avec coloration syntaxique et rendu Markdown.
- **Terminal interactif** — le cœur de l'expérience.

#### Commandes du terminal

| Commande | Description |
|---|---|
| `help` | Liste des commandes |
| `about` / `whoami` | Présentation |
| `projects` / `ls` | Liste des projets |
| `open <projet>` | Lance la démo d'un projet |
| `cat <fichier>` | Ouvre un fichier dans l'éditeur |
| `skills` · `experience` · `education` · `contact` | Sections du CV |
| `ci` | Joue une pipeline CI/CD animée |
| `cv` | Télécharge le CV (PDF) |
| `neofetch` | Infos « système » |

> Quelques commandes cachées traînent aussi (`matrix`, `coffee`, `sudo`…)

## Architecture

Le contenu vit dans **une seule source de vérité** ([`app/profileData.ts`](app/profileData.ts), [`portfolioContent.ts`](app/portfolioContent.ts), [`projectsData.ts`](app/projectsData.ts), [`contactData.ts`](app/contactData.ts)). Ces données alimentent à la fois :

1. la **vue recruteur**,
2. le **terminal**,
3. et le **faux système de fichiers** de l'IDE ([`app/ide/fileSystem.ts`](app/ide/fileSystem.ts), qui *génère* les fichiers affichés à partir des données).

→ Mettre à jour le CV se fait à **un seul endroit**, sans jamais désynchroniser les trois vues.

```
app/
├─ components/
│  ├─ simple/      # Vue recruteur (SimpleView)
│  ├─ ide/         # IDE : ActivityBar, Sidebar, Editor, Search, Run, Terminal chrome…
│  └─ terminal/    # Terminal interactif + fenêtre de projet
├─ ide/            # Système de fichiers simulé (+ tests)
├─ *Data.ts        # Source unique du contenu
├─ icon.png        # Favicon (badge logo)
└─ opengraph-image.tsx  # Image de partage (OG) générée
```

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router) · **React 19** · **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com)** pour le style
- **[Framer Motion](https://www.framer.com/motion/)** pour les animations
- **[Iconify](https://iconify.design)** (`@iconify/react`) pour les icônes (Lucide, logos de marque, Material Icon Theme)
- `react-markdown` + `react-syntax-highlighter` pour les viewers de l'éditeur
- **Vercel Analytics**

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Action |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm start` | Serveur de production |
| `npm run lint` | ESLint |
| `npm test` | Tests unitaires (Vitest) |
| `npm run e2e` | Tests end-to-end (Playwright) |

## Tests

Les tests unitaires ([Vitest](https://vitest.dev)) valident la cohérence du système de fichiers simulé (slugs, génération d'un fichier par projet/expérience, JSON valide). Tests e2e via [Playwright](https://playwright.dev).

## Contact

**Nadjide Omar** — Nice / Sophia Antipolis (06)

[GitHub](https://github.com/Nadjide) · [LinkedIn](https://www.linkedin.com/in/nadjide-omar-b55a01212/)