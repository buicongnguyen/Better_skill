# Design an execution prompt for GPT-6 Astra

You are a game-design and coding-workflow editor.

Produce a practical execution prompt for GPT-6 Astra running inside a coding agent.

Your task in this conversation is prompt design, not game implementation.

INPUT BRIEF
Use the game brief below or the attached docs/game-brief.md.

If details are missing, use the Signal Garden defaults and label them as assumptions:
- Player: a maintenance robot restoring a rooftop beacon.
- Loop: collect three energy cells, avoid one patrolling drone, return to the beacon, activate it.
- Scope: one flat arena, desktop browser, keyboard controls, one complete round with win, loss, pause, and restart.
- Stack preference: TypeScript, Vite, Three.js; GitHub Pages publication after the destination is explicitly authorized.
- Art: original geometric assets, muted green stone, amber cells, teal beacon.
  Readable silhouettes and camera first.
- Constraints: no backend, accounts, multiplayer, paid APIs, or unlicensed assets.
  Keep the first release small.

My project-specific changes, existing files, reference images, installed tools, target hardware, and available budget:
[Add these here, or retain the defaults and mark unknowns.]

PROCESS
1.
   Separate hard requirements, preferences, assumptions, and genuinely blocking unknowns.
   Ask at most three focused questions only if a wrong assumption would materially change the outcome.
   Continue independent prompt drafting where possible.
2.
   Compare only approaches that could change a decision for this brief.
   Candidates include a one-shot prototype, specification first, tutorial guided, incremental implementation, visual playtesting, and parallel specialists.
   Explain the relevant tradeoffs concisely; do not invent benchmark results or completion-time guarantees.
3.
   Recommend a minimal combination and a stack the available tools can actually operate.
   Preserve an explicit engine choice.
   Check primary documentation before making version-sensitive technical claims; disclose unavailable browsing.
4.
   Draft an execution prompt with the player promise, controls, camera, world rules, edge cases, asset policy, verification, and completion conditions.
   If these already live in accurate repository documents, reference them rather than duplicating them.
   Use milestones as outcome checkpoints, not a mandatory itinerary for every edit.
   Prefer available skills; propose a new one only for a specific recurring gap.
5.
   Include an instruction to inspect existing files before editing, preserve user work, make reasonable routine decisions, and continue through authorized milestones.
   Treat external publication as a separate permission boundary unless already authorized.
6.
   Specify only useful evidence: focused logic checks, real-control interaction checks, visual inspection, and human playtesting where judgment is required.
   Do not claim that a passing build proves the game works.
7.
   Review the draft for contradictions, requirements without an observable check, hidden extra scope, unavailable tools, and vague adjectives.
   Revise once to fix those specific issues.

RETURN
A.
   Assumptions and any blocking questions.
B.
   A concise comparison and recommendation.
C.
   The final copyable execution prompt, with unresolved fields clearly marked.
D.
   A short acceptance checklist and a first playtest plan.
E.
   A compact explanation of the defects corrected in the review pass.

Keep the final execution prompt self-contained for an empty folder, or explicitly dependent on named existing documents.

Use direct instructions and concrete player behavior.

Do not substitute another model for GPT-6 Astra, ask for private chain-of-thought, or present a self-assigned quality score as evidence of game quality.

Return the final prompt with an editable parameter block first, then a goal, grouped tasks/constraints, and observable completion checks.

List alternative engines/tools as choices, select only one, and make the detailed instructions conditional on that selection.

Keep tuning values separate from requirements, and check that changing a parameter cannot leave a conflicting hardcoded value in the body.
