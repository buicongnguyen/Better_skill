---
name: game-review
description: Review a playable browser-game milestone after changes to controls, rules, camera, UI, or performance. Use for behavior and visual verification, not for unrelated documentation edits.
---

# Review a playable milestone

1. Read the game brief and the acceptance conditions affected by the change. Identify the exact revision and target browser.
2. Run the documented build and the focused behavior checks. If a command or tool is missing, report it and continue with independent checks.
3. Start the built game. Exercise the changed behavior through actual player input. Inspect screenshots and observable game state where tools are available.
4. For changes to shared state, cover start, normal play, pause, resume, win, loss, and restart. For a visual-only change, inspect the relevant scenes and check that controls still respond.
5. Record reproduction steps, expected behavior, observed behavior, and the evidence location for each failure. Separate gameplay judgment from deterministic correctness.
6. Fix failures within the task scope and rerun the checks affected by the fix. Finish when those checks pass; do not repeatedly expand the test suite without a reason.
7. Report what changed, what was actually verified, and what still needs human playtesting. Update the progress note. Never claim a screenshot proves an entire interaction sequence.
