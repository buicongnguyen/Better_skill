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
Create accurate project memory and a reviewed local baseline.

## Tasks and constraints
- Prepare this game's project memory.
- Inspect the Git root and current work first; never initialize a nested repository accidentally.
- For a new independent folder, initialize Git on main.
- Preserve existing history and unrelated files.
- Reconcile the brief, acceptance checks, decisions, and docs/progress.md; keep AGENTS.md short and limited to useful project conventions.
- Create a suitable .gitignore before staging: exclude secrets, local credentials, dependencies and generated output, but retain source and the lockfile.
- Read back the diff, stage only the intended files, and make a local baseline commit when the configured author identity is correct.
- If identity is missing, ask for it rather than inventing it.
- Report the commit and the next milestone.
- Do not create a remote or publish in this step.

## Completion check
Reviewed project documents and a local baseline commit; nothing published.
