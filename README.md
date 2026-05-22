# Documentation yan-dev — pour Claude Code

## Comment utiliser ces fichiers

Place tous les `.md` à la **racine** de ton projet Next.js (à côté de `package.json`), et le dossier `.claude/` également à la racine. Claude Code lit automatiquement :
- `CLAUDE.md` à chaque session (contexte global + règles)
- Les skills dans `.claude/skills/*/SKILL.md` quand il détecte le besoin
- Les autres `.md` quand `CLAUDE.md` ou un skill les pointe explicitement

## Arborescence à copier-coller

```
yan-dev/
├── .claude/
│   └── skills/
│       ├── nextjs-section/SKILL.md
│       ├── tailwind-theme/SKILL.md
│       └── git-workflow/SKILL.md
├── CLAUDE.md
├── DESIGN_SYSTEM.md
├── ARCHITECTURE.md
├── CONTENT.md
├── SECTIONS.md
├── SEO.md
├── ROADMAP.md
├── GIT_WORKFLOW.md
├── gitignore-template            ← renommer en .gitignore au setup
└── components-source/            ← sources à copier vers src/components/
    ├── README.md
    └── backgrounds/
        ├── FallingPattern.tsx
        └── BGPattern.tsx
```

## Ordre de lecture recommandé (pour toi, Yan)

1. **CLAUDE.md** — vue d'ensemble, règles de comportement
2. **ROADMAP.md** — voir les phases et leur scope
3. **GIT_WORKFLOW.md** — workflow Git complet (1 étape = 1 branche)
4. **CONTENT.md** — valider tous les textes (sections marquées `[À VALIDER]`)
5. **DESIGN_SYSTEM.md** — valider la palette, la typo, les radius
6. **SECTIONS.md** — valider la mise en page et la spec responsive
7. **ARCHITECTURE.md** — valider la stack et l'arborescence
8. **SEO.md** — valider la stratégie locale + nationale

## Décisions à prendre avant de coder

Voir le tableau récapitulatif en bas de `ROADMAP.md`. Les principales :
- Resend vs Nodemailer (peut attendre la Phase 1.9, à l'achat du domaine)
- Hébergement long terme (Vercel ou autre)

## Premier prompt suggéré à Claude Code

Une fois ces fichiers en place et un projet Next.js initialisé :

> "Lis CLAUDE.md, GIT_WORKFLOW.md et ROADMAP.md. On va commencer la **Phase 0**. Crée la branche `chore/init-project` et donne-moi le plan exact (commandes + fichiers à créer) avant d'exécuter."
