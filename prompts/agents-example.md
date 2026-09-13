# Signal Garden — project instructions

Read docs/game-brief.md, docs/acceptance.md, and docs/progress.md before a substantial change. Inspect git status and preserve existing user work.

Use TypeScript, Vite, and Three.js with the committed lockfile. Keep Y as up, movement on X/Z, and speed in world units per second. Prefer a small clear module over a new abstraction without a present need.

Commands after scaffolding: npm run dev, npm run build, npm test. Keep these scripts accurate in package.json and the README.

Keep simulation state separate from scene objects where that makes behavior easier to inspect. Put tunable gameplay constants in one named configuration module.

Finish one playable milestone at a time. Verify changed behavior, inspect the running result when tools permit, and report any checks that were not run. Do not weaken acceptance conditions to hide a failure.

Use original or appropriately licensed assets and record attribution in public/assets/credits.md. Do not commit credentials or local environment files.

At each verified milestone, update docs/progress.md with the revision, evidence, known issues, and next step. Follow the user's existing authorization for commits, pushes, and publication; do not assume repository instructions grant new external permissions.
