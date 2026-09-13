---
name: signal-garden-round-review
description: Check Signal Garden round-state regressions after changing beacon activation, damage, timers, pause, or restart.
---

# Signal Garden round review

Optional example: install only after the referenced game documents exist and these checks add value beyond available review tools. This is not a generic game-development skill.

Use docs/acceptance.md as the authority for current rules and test commands. The cases below describe this book's initial design; update them when the game design changes.

Relevant boundary cases:
- If time expires or health reaches zero in the same simulation step as beacon activation, loss wins.
- Activation requires a fresh E press within two units after all three cells have been collected.
- Drone contact removes one health point, with a one-second damage cooldown.
- Pause freezes both the round timer and simulation. Window blur clears held input and pauses an active round.
- Restart resets cells, health, timer, robot position, drone progress, cooldowns, effects, and held input after either terminal state.

Select the cases affected by the change. Use deterministic checks for timing boundaries and actual player controls for the affected journey when browser tools are available. Setup helpers may prepare a scene but cannot serve as proof that its controls work.

Output: revision, affected case, reproduction steps, expected/observed result, and evidence. Mark unavailable checks as unrun. Fix in-scope failures and recheck what the fix affects; finish when those checks pass. Update docs/progress.md when this completes a milestone.
