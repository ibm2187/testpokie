# Pokedex

A React Native (Expo) Pokedex app built for a mobile tech interview assignment. Uses the public [PokeAPI](https://pokeapi.co/).

## Features

- **Paginated List** — Infinite scroll with 80 Pokemon limit and pull-to-refresh
- **Detail Screen** — Edge-to-edge hero image colored by Pokemon type, base stats with visual bars, abilities, physical attributes
- **Favorites** — Persistent favorites via AsyncStorage, accessible from a dedicated tab
- **Settings** — In-app language switcher with persistent preference
- **Localization** — English, French, and Spanish support (auto-detects device locale, user-overridable)
- **Error Handling** — Full-screen error states for network failures with retry, HTTP cache bypass to ensure accurate offline detection
- **Semantic Theme** — Centralized design tokens for colors, typography, spacing, and radii

## Architecture

Layered separation of concerns:

```
src/
├── api/          # Network layer (fetch calls, no-cache policy)
├── types/        # TypeScript interfaces
├── hooks/        # Custom hooks (data fetching + pagination logic)
├── context/      # App-wide state (FavoritesContext, LocaleContext)
├── components/   # Reusable UI (PokemonCard, StatBar, TypeBadge, ErrorState, ErrorBanner)
├── utils/        # Pure helpers (formatting, type colors)
├── i18n/         # Localization (en, fr, es)
└── theme.ts      # Design tokens

app/              # Expo Router screens (file-based routing)
├── (tabs)/       # Tab navigator (Pokedex + Favorites + Settings)
└── pokemon/      # Detail screen (stack)
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| Expo (managed) | Framework & build system |
| Expo Router | File-based navigation (tabs + stack) |
| TypeScript | Type safety |
| AsyncStorage | Favorites + locale persistence |
| React Context + useReducer | State management (favorites, locale) |
| i18n-js + expo-localization | Internationalization |
| StyleSheet + theme tokens | Styling |

## Getting Started

```bash
npm install
npx expo start
```

Press `i` for iOS simulator or `a` for Android emulator.

## AI Assistance

This project was built with the assistance of Claude Code (Claude Opus 4.6). See [AI_PROMPTS.md](./AI_PROMPTS.md) for all prompts used during development.
