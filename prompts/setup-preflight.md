## Edit these parameters
PROJECT_FOLDER: current selected game folder
AGENT: Codex
MODEL: GPT-6 Astra
ENGINE: AUTO
OS: AUTO (Windows / macOS / Linux)
SHELL: AUTO (PowerShell / bash / zsh)

## Choices and consistency
- AGENT: choose Codex or Claude Code.
  Select MODEL in that application before sending; use an available Claude model with Claude Code.
  These lines do not switch the actual model or grant tools.
- Work only in PROJECT_FOLDER. Inspect the actual tools and relevant project instructions; resolve a material mismatch before dependent work.
- ENGINE: AUTO preserves an existing engine, otherwise compares THREE (TypeScript/Vite/Three.js) and GODOT (Godot/GDScript web export).
  Choose one; a changed value does not authorize porting existing work.
  KEEP uses the recorded project choice.

## Goal
Inspect this selected project folder without modifying it.

## Tasks and constraints
- Report its absolute path, existing files, Git root/branch/status, sanitized remote URLs, and whether Git and GitHub CLI are available.
  For THREE, check Node.js and npm; for GODOT, check the editor and web-export templates.
  For AUTO, report the existing engine or the available options without installing either.
- Check the runtime against this project's requirements.
- Report GitHub authentication status without displaying tokens, private keys, or environment values.
- Distinguish missing tools, missing login, and permission failures.
- If this is an empty folder, say so; do not invent package scripts.
- Use the actual OS and shell when their values are AUTO; otherwise verify the requested environment is available. Give the shortest setup steps for the selected engine.
- Do not install, initialize, commit, push, or deploy during this inspection.

## Completion check
An accurate environment report and the shortest remaining setup steps; no files or account settings changed.
