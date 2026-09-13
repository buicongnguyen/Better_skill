# Build Signal Garden from scratch with GPT-6 Astra

Work in the current project folder as a game developer. Inspect the folder, Git status, applicable instructions, and available tools first. Preserve existing user work. If this is an empty folder, create the complete project described below.

Deliver a small, coherent, playable desktop-browser 3D game. Implement it and run the appropriate checks; continue through the milestones instead of ending with a plan. Make reasonable routine implementation choices and record assumptions. Ask a focused question only if missing information would materially change the result or requires authorization that is not already present.

PLAYER EXPERIENCE
Signal Garden is a quiet rooftop at dusk. The player is a maintenance robot restoring a beacon. Collect three energy cells, avoid a patrolling drone, and return to activate the beacon before the round ends. The world should feel abandoned but recoverable, with clear routes and warm light from restored machinery.

SCOPE AND RULES
- One flat 24 by 24 unit arena. Treat one unit as one metre; Y is up, with movement on X/Z.
- Use a fixed elevated camera with a stable orientation and no pointer lock. Keep the player and routes readable.
- WASD or arrow keys move. Normalize diagonal input. E activates the beacon on a fresh press within two units, only after all three cells are collected. Escape pauses/resumes. Provide visible start, pause, resume, restart, and mute controls.
- The player begins with three health points and 90 seconds. One drone follows a deterministic visible patrol. Contact causes one damage, followed by one second of invulnerability.
- Each cell can be collected once. Display the cell count, health, remaining time, and beacon readiness.
- Use title, playing, paused, won, and lost states. Pause freezes simulation and timer. Losing all health or time ends the round. Evaluate loss conditions before beacon activation within a simulation step so simultaneous expiry and activation result in loss.
- After win or loss, freeze gameplay. Restart resets player position, cells, health, timer, drone route, cooldowns, effects, and input state. Window blur should release held inputs and pause an active round.
- Exclude multiplayer, accounts, procedural worlds, inventory, dialogue, and extra levels from this release.

TECHNICAL DIRECTION
Prefer TypeScript, Vite, and Three.js unless the existing project explicitly selects another engine. Use available stable packages and commit the lockfile. Record the actual versions. Check official documentation for APIs that are uncertain or version-sensitive.

Keep a small readable structure with separable input, simulation/state, rendering/camera, and UI responsibilities. Keep tunable values in one configuration module. Use simple collision shapes appropriate to a flat arena; explain a physics dependency if one becomes necessary. Use elapsed time correctly and prevent large resume-time steps.

Create accurate npm scripts for dev, build, and focused tests. Create docs/game-brief.md, docs/acceptance.md, docs/progress.md, and a concise README with setup, controls, target platform, and limitations. Add appropriate ignore rules.

VISUAL AND AUDIO DIRECTION
Start with readable greybox geometry. Then use an original geometric robot, muted green stone and planters, amber energy cells, a teal beacon, and a drone with a distinct silhouette. Keep routes visible; avoid excessive bloom, particles, or camera shake. Shape and text should reinforce color-coded signals. Respect reduced-motion preferences for decorative motion and hit effects.

Use original or appropriately licensed assets. Record sources and attribution. Add modest feedback for collection, damage, readiness, victory, and loss. Begin audio only after user interaction and provide mute. Keep menus responsive and keyboard accessible. This first version targets desktop keyboard play; do not claim mobile gameplay is supported unless implemented and tested.

MILESTONES
M0: Scaffold, document setup, build successfully, and display a minimal scene.
M1: Make movement, boundaries, camera, and pause reliable.
M2: Implement cells, beacon activation, HUD, win, and complete restart.
M3: Implement drone, damage cooldown, timer loss, and health loss.
M4: Apply coherent art and sound; inspect readability and feedback.
M5: Test production output under /signal-garden/, fix important failures, and prepare the release workflow.

At each milestone, keep the project runnable, update the progress note, and make a local commit after reviewing the diff and running the relevant checks. Local commits are authorized by this prompt. Treat a milestone as a checkpoint and continue to the next one without an unnecessary permission pause.

VERIFICATION
Run focused checks for single collection, normalized movement, damage cooldown, pause, terminal-state exclusivity, boundary timing, and complete restart. Use real controls in the running browser for the main interaction paths when browser tools are available. Inspect screenshots for camera and UI quality, and observable state for the rules. Deterministic setup helpers may prepare test scenes but must not substitute for journey tests through player input.

Check start, collection, a win, both loss conditions, pause/resume, and repeated restart. Build and test the production output at its repository subpath. Check asset loads and runtime errors. Name the actual browser and device used. If measuring performance, record the device, viewport, scene, warmup, and sample duration; do not invent a frame-rate result.

If a tool is unavailable, complete independent checks, state what was not run, and provide the shortest remaining manual verification sequence. Do not mark untested conditions passed. After a fix, rerun checks justified by the changed behavior; avoid redundant broad testing once the relevant checks pass.

WORKING AGREEMENTS
Keep communication concise and connect changes to player-visible outcomes. If instructions conflict, identify the relevant file and rule and resolve them according to the applicable instruction hierarchy. Use parallel specialists only for genuinely independent tasks with clear ownership; keep one integration owner. Prefer one agent when work shares changing interfaces.

COMPLETION
Deliver the runnable local game, its source and lockfile, accurate setup instructions, acceptance results, asset credits, reviewed local commits, and a prepared GitHub Pages workflow. Report what is complete, what was actually tested, and what needs human playtesting. Publish only if this session already authorizes the specific account/repository and public release; otherwise finish the reviewable release preparation and request that final authorization.
