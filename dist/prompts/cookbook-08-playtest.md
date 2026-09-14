## Edit these parameters
PROJECT_FOLDER: current selected game folder
AGENT: Codex
MODEL: GPT-6 Astra

## Choices and consistency
- AGENT: choose Codex or Claude Code.
  Select MODEL in that application before sending; use an available Claude model with Claude Code.
  These lines do not switch the actual model or grant tools.
- Work only in PROJECT_FOLDER.
  Inspect the actual tools and relevant project instructions; resolve a material mismatch before dependent work.

## Goal
Verify the production game through rules, real controls and human observation.

## Tasks and constraints
- Verify the current game against docs/acceptance.md using the production build.
- Check movement, boundaries, diagonal speed, single collection, beacon range, damage cooldown, pause, focus loss/resume, both loss causes, win and repeated restart.
- Separate logic tests from real browser input and visual inspection.
- Record browser, viewport, revision, steps, expected result and actual result in a new docs/playtests/ entry.
- Do not infer playability from a passing build.
- Give me a short first-time-player test: find the objective, attempt a round, restart, and describe confusing moments.
- Mark human observations as pending until I supply them.
- Rank concrete failures and propose the smallest next repair.

## Completion check
Reproducible failures and an explicit list of checks still pending.
