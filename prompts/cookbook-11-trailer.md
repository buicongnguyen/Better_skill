## Edit these parameters
PROJECT_FOLDER: current selected game folder
AGENT: Codex
MODEL: GPT-6 Astra
VIDEO_TOOL: AUTO
DURATION_SECONDS: 20
PAID_BUDGET: 0

## Choices and consistency
- AGENT: choose Codex or Claude Code.
  Select MODEL in that application before sending; use an available Claude model with Claude Code.
  These lines do not switch the actual model or grant tools.
- Work only in PROJECT_FOLDER. Inspect the actual tools and relevant project instructions; resolve a material mismatch before dependent work.
- VIDEO_TOOL: AUTO selects a suitable installed editor; REMOTION requests an available Remotion workflow.
  If missing, report the gap and prepare the shot plan.
  Use DURATION_SECONDS for the total runtime; PAID_BUDGET is the maximum separately authorized generation spend.

## Goal
Prepare an introduction lasting DURATION_SECONDS seconds for the current game build.

## Tasks and constraints
- Inspect the real build and available capture/editing tools first.
- Use a simple sequence: title and objective, genuine movement/collection footage, drone challenge, beacon success, playable URL.
- Save a shot list, captions and an asset manifest with file paths, rights and build revision.
- If footage is missing, give a precise capture plan and mark those shots pending; do not fabricate gameplay.
- Prefer available tools for deterministic editing, such as an installed Remotion workflow.
- Use generated material only as clearly labeled concept imagery.
- Keep generation spend at zero unless separately authorized.
- Render a draft only when required media and tools are available; review text, pacing, audio and final URL.
- Report output files and pending work.
- Publishing the trailer is a separate action.

## Completion check
A DURATION_SECONDS-second shot plan, verified media list and, when feasible, a reviewed video draft.
