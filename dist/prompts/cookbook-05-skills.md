## Edit these parameters
PROJECT_FOLDER: current selected game folder
AGENT: Codex
MODEL: GPT-6 Astra

## Choices and consistency
- AGENT: choose Codex or Claude Code.
  Select MODEL in that application before sending; use an available Claude model with Claude Code.
  These lines do not switch the actual model or grant tools.
- Work only in PROJECT_FOLDER. Inspect the actual tools and relevant project instructions; resolve a material mismatch before dependent work.

## Goal
Decide whether a skill adds value for the next concrete task.

## Tasks and constraints
- Inspect the tools and skill catalog actually available in this session.
- For the next game milestone, identify whether any skill adds relevant checks or capabilities beyond our existing brief and tools.
- Prefer no extra installation unless a concrete gap exists.
- For a proposed GitHub skill, inspect its exact path, instructions, scripts, dependencies, license and revision before recommending it.
- Compare no skill, automatic selection and explicit invocation on the same small task if a comparison would change our choice.
- Record observed selection, task result and overhead.
- Do not install a bundle merely because it is popular, and do not claim that availability guarantees invocation.
- Save the decision and any untested hypothesis in docs/decisions.md.

## Completion check
A justified choice: existing tools, available skill, or a specific missing capability.
