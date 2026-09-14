## Edit these parameters
PROJECT_FOLDER: current selected game folder
AGENT: Codex
MODEL: GPT-6 Astra
ENGINE: AUTO

## Choices and consistency
- AGENT: choose Codex or Claude Code.
  Select MODEL in that application before sending; use an available Claude model with Claude Code.
  These lines do not switch the actual model or grant tools.
- Work only in PROJECT_FOLDER.
  Inspect the actual tools and relevant project instructions; resolve a material mismatch before dependent work.
- ENGINE: AUTO preserves an existing engine, otherwise compares THREE (TypeScript/Vite/Three.js) and GODOT (Godot/GDScript web export).
  Choose one; a changed value does not authorize porting existing work.
  KEEP uses the recorded project choice.
- If ENGINE is explicit, evaluate that route against the brief instead of recommending a different engine.

## Goal
Choose one workable engine and record the evidence for that choice.

## Tasks and constraints
- Read the game brief and inspect available tools.
- Only when ENGINE is AUTO and no engine is already chosen, compare TypeScript/Vite/Three.js with Godot web export for this small keyboard browser game.
- Evaluate iteration speed, asset workflow, browser constraints, debugging and deployment for the chosen route or comparison.
- Keep an explicitly chosen engine.
- Otherwise recommend the smallest workable route; TypeScript/Vite/Three.js is the default for this example.
- Verify version-sensitive claims in official docs and state unknowns.
- Record the decision in docs/decisions.md.
- If a browser-export uncertainty could invalidate it, make only a disposable minimal scene in a clearly named spike folder and test its production export.
- Record commands and observed failures; do not describe an unrun test as passing.

## Completion check
A recorded engine choice and export evidence if an experiment was needed.
