# Références et direction de la refonte du portfolio

Recherche effectuée le **12 octobre 2026** pour le portfolio de **Nadjide Omar**, Software Engineer Full Stack & DevOps.

Ce document accompagne une **refonte locale** du dépôt `portfolio_ts`. Il ne décrit ni un déploiement ni une modification du site Vercel en production.

## Références vérifiées

L'attribution d'un site à un modèle repose sur une déclaration publique de son auteur, pas sur une ressemblance visuelle. La date de consultation ou d'indexation ne constitue pas une date de création.

| Référence et URL | Modèle attribué | Date et preuve primaire | Certitude et nuance |
| --- | --- | --- | --- |
| [Najam Saeed](https://www.najam.pk/) | GPT-6 Astra dans Codex | [Article de l'auteur, 1er septembre 2026](https://www.najam.pk/blog/gpt-6-astra-review), dans lequel il explique avoir construit ce portfolio avec Astra. | Attribution explicite, datée et fiable. Portfolio personnel réel. La déclaration ne permet pas d'attribuer chaque modification ultérieure au même modèle. |
| [Orrery Core, par Miler](https://ohmiler.github.io/opus-5.5/ai-core/) | Claude Opus 5.5 | Le [showcase de l'auteur](https://ohmiler.github.io/opus-5.5/) porte la mention « Built with Claude Opus 5.5 » ; [dépôt public](https://github.com/ohmiler/opus-5.5). Consulté le 12 octobre 2026 ; date exacte de création non confirmée. | Attribution explicite au niveau de la collection. **Démonstration fictive** d'un studio de recherche : chiffres, clients et projets ne sont pas des références professionnelles vérifiées. |
| [Galaxy Portfolio, par Miler](https://ohmiler.github.io/opus-5.5/galaxy-portfolio/) | Claude Opus 5.5 | Même [showcase primaire](https://ohmiler.github.io/opus-5.5/) et [code public](https://github.com/ohmiler/opus-5.5). Consulté le 12 octobre 2026 ; date exacte de création non confirmée. | **Démonstration fictive** sous le nom Iris Vale. À utiliser pour les principes d'interaction, jamais comme source de contenu ou de résultats. |
| [Muhammad Ibrahim Qasmi](https://research.ibrahimqasmi.com/) | GPT-6 Astra, effort ultra | [Déclaration de l'auteur sur LinkedIn](https://www.linkedin.com/posts/ibrahimqasmi313_built-my-research-portfolio-using-gpt-6-astra-activity-7503143139134836736-64cx), affichée comme publiée quatre semaines auparavant lors de la recherche, soit septembre 2026 environ. | Attribution explicite. Le site live n'a pas pu être inspecté avec l'outil Web ; son apparence actuelle n'est donc pas validée et ne guide pas l'implémentation. |
| [Loaflet](https://loaflet.com/) | GPT-6 Astra pour la première version, ensuite retravaillée | [Publication de l'auteur](https://www.reddit.com/r/SideProject/comments/1wf9xbf/i_tried_to_make_a_portfolio_and_accidentally_made/) décrivant la transformation de ses projets en monde 3D explorable. Publication trouvée comme récente en septembre 2026 ; jour exact non confirmé. | Attribution explicite de la première version, pas de toutes les retouches. Référence secondaire pour une expérience mémorable ; navigation trop éloignée de l'objectif principal du portfolio. |

Les références sont récentes ou récemment publiées dans les résultats consultés. Seul l'article de Najam fournit ici une date calendaire directement vérifiée. L'absence de date précise pour les démonstrations Miler doit rester visible dans toute présentation de la recherche.

## Éléments retenus et écartés

| Référence | Éléments retenus | Éléments écartés |
| --- | --- | --- |
| Najam Saeed | Positionnement compréhensible dès le hero ; deux réalisations principales ; responsabilités et résultats concrets ; liens vers des études de cas ; projets secondaires compacts. | Copier ses textes, ses chiffres, son parcours ou ses choix techniques sans rapport avec Nadjide. |
| Orrery Core | Un système que le visiteur peut explorer ; révélation progressive d'informations ; navigation claire ; liste de projets avec année et catégorie. | Expérience WebGL plein écran, chargement initial, navigation dépendant du défilement d'une scène 3D, effets sonores et métriques fictives. |
| Galaxy Portfolio | Un élément visuel signature ; transitions mesurées ; chaque projet possède sa propre identité ; présence d'un accès lisible au contenu. | Univers spatial comme navigation principale, particules permanentes, longue introduction et exploration obligatoire. |
| Loaflet | Personnalité et plaisir de découverte dans une petite scène technique intégrée à la vitrine. | Jeu 3D obligatoire pour trouver les projets ou le contact. |

La refonte mélange des **principes de composition et d'interaction**. Elle ne copie ni les pages, ni les actifs, ni les contenus des références.

## Direction retenue

Une vitrine sombre et éditoriale, à fond **graphite**, textes **ivoire** et accent **bleu glacier**. Une typographie ample, une grille lisible, des espaces généreux, des séparateurs fins et des contrastes nets donnent la structure. Le bleu sert à l'interaction et aux repères utiles. Les halos, les fonds décoratifs omniprésents et la succession uniforme de cartes bento ne structurent plus la page.

La section « Approche » conserve ce fond sombre, avec une variation graphite discrète. Les paragraphes sont dimensionnés à 15–17 px selon le contexte, y compris sur mobile ; les logos des entreprises et écoles identifient le parcours.

- **Hero en deux colonnes** : grand titre sur le métier et la capacité à accompagner une application jusqu'à la production ; pitch court et actions vers les projets et le contact.
- **Schéma d'architecture interactif** : quatre étapes, Front → API → Données → Livraison. Chaque étape révèle une explication concise reliée aux pratiques déjà documentées dans le dépôt. Ce schéma illustre une démarche générale ; il ne prétend pas reproduire l'architecture exacte d'un système d'entreprise.
- **Deux projets vedettes** : Stajio et DevOps Playground, déjà marqués `featured` dans les données. Donner accès aux aperçus disponibles, au rôle, au contexte, aux technologies et au code ; conserver une liste compacte pour les autres projets.
- **Résultats et parcours compacts** : faire ressortir les preuves existantes, puis permettre la lecture du détail sans répéter les mêmes arguments dans toutes les sections.
- **Une seule expérience** : à la demande de Nadjide, retirer entièrement le terminal interactif et le choix de mode. Les anciens liens arrivent sur la vitrine ; les fiches projets restent partageables. La mise en scène et le schéma technique portent désormais la personnalité du site.

Le schéma utilise les primitives du projet : HTML, CSS, SVG et interactions React selon les besoins. **Aucune dépendance WebGL ou Three.js n'est ajoutée.** Les animations respectent la réduction des mouvements ; les informations restent accessibles au clavier et sur mobile.

Les animations ajoutent une entrée progressive du hero, des apparitions au défilement, un flottement léger du schéma et une progression de lecture dans l'en-tête. Les révélations sont un enrichissement après hydratation : le contenu HTML reste visible sans JavaScript, et les préférences de mouvement réduit désactivent les effets.

## Faits de Nadjide à préserver

Les sources de vérité du dépôt restent `app/profileData.ts`, `app/portfolioContent.ts` et `app/projectsData.ts`. Les formulations peuvent être raccourcies pour la vitrine, sans inventer de résultats ou changer leur périmètre.

| Fait existant | Présentation à conserver |
| --- | --- |
| 5 ans en entreprise depuis 2021 | Expérience Full Stack à forte culture DevOps. |
| 6 applications métier en production, équipe technique de 3 personnes | Portée collective et contexte de production ; ne pas présenter l'ensemble comme un travail solitaire. |
| Évaluation passée de 30 à 5 minutes, soit −83 %, pour plus de 60 utilisateurs | Résultat de la plateforme de pilotage qualité, pas un indicateur global de tous les projets. |
| SSO et contrôle d'accès communs aux 6 applications | Réalisation d'authentification centralisée et de sécurité applicative. |
| CI/CD GitHub Actions sur les 3 applications critiques | Conserver ce périmètre ; ne pas l'étendre aux 6 applications sans nouvelle preuve. |
| Pipeline Python : préparation de 20–60 minutes ramenée à 5 minutes | Présenter comme un résultat distinct de l'évaluation qualité. |
| IA auto-hébergée avec Mistral et Ollama | Données gardées sur l'infrastructure pour le système concerné. |
| Stajio et DevOps Playground | Projets personnels ; Stajio s'inscrit également dans le Mastère. Les pratiques Kubernetes de projet ne deviennent pas de l'expérience Kubernetes en entreprise. |

L'anonymisation des applications et des informations internes de l'employeur reste cohérente avec les données existantes. Aucun chiffre issu des démonstrations de référence n'est importé dans le portfolio.

## Périmètre de livraison

Implémentation et vérification dans le dépôt : rendu desktop et mobile, navigation de la vitrine, compatibilité des anciens liens, accès aux projets, liens et contrôles du projet. Le terminal interactif et ses composants sont supprimés. La publication sur la production Vercel existante intervient via la branche `master`, à la demande explicite de l'utilisateur.
