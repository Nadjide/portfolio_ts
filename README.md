<div align="center">

# Portfolio — Nadjide Omar

**Software Engineer · Full Stack & DevOps**

Un portfolio interactif avec **deux expériences** : une vitrine moderne et claire, et un **vrai terminal DevOps jouable** pour les curieux.

**[portfolio-ts-nine.vercel.app](https://portfolio-ts-nine.vercel.app)**

`Next.js` · `TypeScript` · `Tailwind CSS` · `Framer Motion`

</div>

---

## Le concept

Le portfolio propose deux vues, basculables à tout moment (avec une animation de transition « écran qui s'allume ») :

### Vue simplifiée

Une landing page moderne, droit au but : hero animé, marquee de technologies, grille *bento*, *spotlight cards* qui suivent la souris, timelines de parcours, et fiches projets avec démo vidéo. Pensée pour comprendre l'essentiel en quelques secondes.

### Vue terminal

Un terminal plein écran, façon poste de travail DevOps : fenêtre macOS (le bouton rouge ferme… vers la vue simplifiée), barre de statut façon **tmux**, autocomplétion (`Tab`), historique (`↑`/`↓`), et un jeu de commandes qui raconte le profil.

#### Commandes

| Commande | Description |
|---|---|
| `help` | Liste des commandes (profil · ops · système) |
| `about` / `whoami` | Présentation |
| `projects` / `open <projet>` | Liste et démos des projets |
| `skills` · `experience` · `education` · `contact` | Sections du CV |
| `git log` | Le parcours raconté en commits |
| `docker ps` / `kubectl get pods` | L'« infra » du portfolio |
| `ci` / `deploy` | Pipeline CI/CD et mise en prod animées |
| `top` · `ping` · `uptime` · `neofetch` | Le côté ops |
| `cv` | CV sur demande (email / LinkedIn) |

> Quelques commandes cachées traînent aussi (`matrix`, `coffee`, `sudo`, `ssh prod`…)

## Architecture

Le contenu vit dans **une seule source de vérité** ([`app/profileData.ts`](app/profileData.ts), [`portfolioContent.ts`](app/portfolioContent.ts), [`projectsData.ts`](app/projectsData.ts), [`contactData.ts`](app/contactData.ts)). Ces données alimentent à la fois la **vue simplifiée** et le **terminal** — mettre à jour le CV se fait à un seul endroit, sans jamais désynchroniser les vues.

```
app/
├─ components/
│  ├─ simple/      # Vue simplifiée (SimpleView)
│  └─ terminal/    # TerminalView (chrome + statut) · Terminal · ProjectWindow · CIPipeline
├─ *Data.ts        # Source unique du contenu
├─ data.test.ts    # Tests d'intégrité des données (+ garde-fou confidentialité)
├─ icon.png        # Favicon (badge logo)
└─ opengraph-image.tsx  # Image de partage (OG) générée
```

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router) · **React 19** · **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com)** pour le style
- **[Framer Motion](https://www.framer.com/motion/)** pour les animations
- **[Iconify](https://iconify.design)** (`@iconify/react`) pour les icônes (Lucide + logos de marque)
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

Les tests unitaires ([Vitest](https://vitest.dev)) valident l'intégrité des données affichées (champs requis, ids uniques, liens exploitables) et incluent un **garde-fou de confidentialité** qui fait échouer la CI si une donnée sensible est réintroduite. Tests e2e via [Playwright](https://playwright.dev).

## Contact

**Nadjide Omar** — Nice / Sophia Antipolis (06)

[GitHub](https://github.com/Nadjide) · [LinkedIn](https://www.linkedin.com/in/nadjide-omar-b55a01212/)
