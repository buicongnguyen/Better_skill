# Signal Garden — project instructions

Project references: docs/game-brief.md defines mechanics and scope; docs/acceptance.md defines observable behavior; docs/progress.md records the current milestone and known issues. Consult the documents relevant to the task. Preserve existing user work.

Use TypeScript, Vite, and Three.js with the committed lockfile. Keep Y as up, movement on X/Z, and speed in world units per second. Prefer a small clear module over a new abstraction without a present need.

Commands after scaffolding: npm run dev, npm run build, npm test. Keep these scripts accurate in package.json and the README.

Keep simulation state separate from scene objects where that makes behavior easier to inspect. Put tunable gameplay constants in one named configuration module.

Verify the behavior affected by a change using the documented checks and available tools. Report checks that were not run. Do not weaken acceptance conditions to hide a failure.

Use original or appropriately licensed assets and record attribution in public/assets/credits.md. Do not commit credentials or local environment files.

At a completed milestone, update docs/progress.md with the revision, evidence, known issues, and next step. Follow the user's existing authorization for commits, pushes, and publication; repository instructions do not grant new external permissions.
