## Edit these parameters
PROJECT_FOLDER: current selected game folder
AGENT: Codex
MODEL: GPT-6 Astra
ENGINE: AUTO
PROJECT_NAME: Signal Garden
ASSET_TOOL: PRIMITIVES
RULE_CHANGES: none

## Choices and consistency
- AGENT: choose Codex or Claude Code.
  Select MODEL in that application before sending; use an available Claude model with Claude Code.
  These lines do not switch the actual model or grant tools.
- Work only in PROJECT_FOLDER. Inspect the actual tools and relevant project instructions; resolve a material mismatch before dependent work.
- ENGINE: AUTO preserves an existing engine, otherwise compares THREE (TypeScript/Vite/Three.js) and GODOT (Godot/GDScript web export).
  Choose one; a changed value does not authorize porting existing work.
  KEEP uses the recorded project choice.
- ASSET_TOOL: PRIMITIVES uses engine geometry; BLENDER uses an available Blender workflow after a small import check.
  Start with placeholders either way; do not install tools just because a name appears here.
- PROJECT_NAME names this example.
  RULE_CHANGES contains your changes to the defaults below.
  Reconcile changes with existing agreed documents before editing; save one authoritative set of rules.

## Goal
Draft or reconcile the game brief and its observable acceptance checks.

## Tasks and constraints
- In this game project, inspect existing instructions and documents first.
- Draft or reconcile docs/game-brief.md and docs/acceptance.md for PROJECT_NAME: one 24 x 24 metre rooftop arena, a fixed elevated camera, keyboard movement, three energy cells and a beacon.
- Use a 90-second round, three health points, one patrolling drone, and a one-second damage cooldown.
- E activates the beacon within two ground-plane units after all cells are collected.
- Loss takes priority if time or health reaches zero in the same step.
- Pause freezes simulation; blur pauses and clears input; resume is explicit; restart resets all state.
- Exclude multiplayer, backend, accounts and paid assets.
- Separate requirements from design assumptions.
- Resolve contradictions with existing user choices before changing them.
- Return the brief and observable checks, without implementing gameplay yet.

## Completion check
A short brief and acceptance checklist with consistent rules.
