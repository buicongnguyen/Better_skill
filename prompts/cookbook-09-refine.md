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
Repair one evidenced failure and prepare an honestly evaluated prompt revision.

## Tasks and constraints
- Read the latest playtest evidence and reproduce the highest-impact failure.
- Trace it from input through state changes to rendering, citing actual files and relevant Git history.
- Fix the cause with the smallest suitable change, rerun affected checks and preserve a reviewed working checkpoint.
- Save the relevant prompts, model/settings, baseline commit, outcome and evidence links in docs/prompt-log.md; do not copy credentials or irrelevant chat.
- Distill verified lessons into the brief, checks or a compact candidate prompt P2.
- Keep prompt P1 and game versions separately identified.
- Explain that a repaired game V2 does not establish a better prompt.
- Propose a P1/P2 comparison from the same clean baseline, equal tool access and budget, with repeated trials and a held-out task; run it only within the agreed evaluation scope.

## Completion check
A tested repair and a compact candidate prompt, with a fair comparison plan.
