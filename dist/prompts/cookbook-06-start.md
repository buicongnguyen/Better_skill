## Edit these parameters
PROJECT_FOLDER: current selected game folder
AGENT: Codex
MODEL: GPT-6 Astra
ASSET_TOOL: PRIMITIVES

## Choices and consistency
- AGENT: choose Codex or Claude Code.
  Select MODEL in that application before sending; use an available Claude model with Claude Code.
  These lines do not switch the actual model or grant tools.
- Work only in PROJECT_FOLDER.
  Inspect the actual tools and relevant project instructions; resolve a material mismatch before dependent work.
- ASSET_TOOL: PRIMITIVES uses engine geometry; BLENDER uses an available Blender workflow after a small import check.
  Start with placeholders either way; do not install tools just because a name appears here.

## Goal
Implement and verify the first playable movement checkpoint.

## Tasks and constraints
- Use the approved docs/game-brief.md, docs/acceptance.md and docs/decisions.md to implement the first playable movement slice of the game in this selected folder.
- Inspect existing code before editing and keep the chosen stack.
- Build a floor, robot placeholder, fixed elevated camera, keyboard movement and collision boundaries.
- Use consistent units and normalize nonzero digital diagonal input.
- Handle pause, focus loss and explicit resume without stuck keys or a large resume time step.
- Establish working install, dev and build commands.
- Verify the build and real keyboard interaction if tools permit; report any checks you cannot run.
- Update docs/progress.md with what works and the next milestone.
- Stop at this movement checkpoint so I can inspect it; do not add unrelated features or publish.

## Completion check
A runnable movement slice and honest verification record.

The longer bootstrap is linked below.
