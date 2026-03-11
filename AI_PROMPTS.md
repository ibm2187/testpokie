# AI Prompts Used

This document records the prompts used with Claude Code (Claude Opus 4.6) during development of this Pokedex app.

## Prompt 1 — Initial Requirements
> Mobile Tech Interview Assignment
> Create a new React Native app that uses the public pokemon api available here: https://pokeapi.co/. This app should include:
> 1. A paginated list screen of all pokemon
> 2. A details screen for an individual pokemon selected from the list screen
> 3. A favorites screen that lists favorite pokemon. Users can favorite pokemon to show them on this screen. Users' favorite pokemon should persist between launch sessions

## Prompt 2 — Architecture Direction
> I think we should use expo, and a solid architectural pattern with clear separation of concerns. focus on maintainability, readability and scalability.

## Prompt 3 — Code Reviews
> do 3 deep code reviews

Three parallel review agents were launched focusing on:
- Architecture & Patterns (layer separation, state management, type safety, scalability)
- Performance & UX (FlatList optimization, re-renders, accessibility, error/loading states)
- Security & Production Readiness (security, edge cases, code quality, interview readiness)

## Prompt 4 — Pull to Refresh + Edge to Edge
> we also need to add pull to refresh. also, details screen needs edge to edge support.

## Prompt 5 — Error Handling
> we need proper network error handling too; if it fails to load data we should let the users know.

## Prompt 6 — Pagination Limit
> put a limit for 80 items max, when reaching that limit show an indicator footer that tells the user we're purposely limiting for 80 items, no more items will be loaded.

## Prompt 7 — Theme System
> we should use semantic color names, as well as semantic font sizes, etc. I don't want hardcoded stuff

## Prompt 8 — Edge to Edge Fix + Offline Error Banner
> 1. we still need edge to edge fixes in the details screen. 2. when pulling to refresh while offline, no error shows up and the cached data still shows up.

## Prompt 9 — Localization
> we should also make sure the app supports localization, use french and spanish

## Prompt 10 — Settings Screen
> let's plan adding a settings page with an option to change language

## Prompt 11 — Offline Refresh Fix
> when refreshing the list screen while offline, cached data does not go away. nor do we see an error state

## Prompt 12 — HTTP Cache Bypass
> still somehow showing cached data even when paginating offline. how's that possible?

Root cause: `fetch` was using the default HTTP cache, so the runtime served cached responses even offline. Fixed by adding `cache: "no-store"` to all fetch calls.
