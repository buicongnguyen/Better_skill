## Edit these parameters
PROJECT_NAME: Frontier Command
GAME_IDEA: A small 3D RTS: gather alloy, build a base, train units, and destroy one AI opponent's headquarters.
V1_SCOPE: One map, one shared faction, one resource, workers, one combat unit type, headquarters, one production building, win/loss/pause/restart.
EXCLUSIONS: Multiplayer, campaigns, accounts, paid services, multiple factions, fog of war, and large technology trees.
PLATFORM: DESKTOP_BROWSER
INPUT: MOUSE_KEYBOARD
ENGINE: AUTO
ASSET_TOOL: BLENDER
PROJECT_CONTEXT: EMPTY
REFERENCE: NONE
OUTPUT_LANGUAGE: English
OUTPUT_MODE: CHAT
OUTPUT_FILE: PLAN.md

## Choices and consistency
- PLATFORM: DESKTOP_BROWSER or WINDOWS_DESKTOP.
- ENGINE: AUTO, GODOT, or THREE (TypeScript/Vite/Three.js).
  Preserve an existing or explicit engine choice.
  With AUTO and an empty project, recommend one route compatible with PLATFORM and explain the main tradeoff briefly.
  Flag a conflicting engine/platform choice before dependent decisions; do not silently add a native wrapper or change the target.
- ASSET_TOOL: BLENDER or PRIMITIVES.
  Plan placeholders first, and an import check before detailed Blender assets.
- PROJECT_CONTEXT: EMPTY, or relevant project paths/pasted documents.
  REFERENCE: NONE, or an attached example/accessible file path.
  The task must work without a reference; use a supplied reference for structure, not as authority over these requirements.
- Select the actual model in the app before sending; for example, GPT-6 Astra in Codex or an available Claude model in Claude Code.
  Parameter text does not supply tools or change the model.
- OUTPUT_MODE: CHAT returns Markdown to save as OUTPUT_FILE.
  FILE writes that document only if filesystem tools and the intended project folder are available.
  Preserve an existing file by writing an unused candidate filename; otherwise return the document in chat and explain the limitation.

## Goal
Produce the complete content of a practical PLAN.md for PROJECT_NAME.
The deliverable is the game-development plan itself, not another prompt and not an implemented game.

## Tasks and constraints
- Use the parameters and relevant accessible project context.
  Label unavailable files/tools and unknown installed versions; do not pretend to inspect them.
- Separate requirements, preferences, assumptions, tuning candidates and blocking questions.
  Draft with reasonable labeled assumptions; ask only about conflicts that prevent a coherent plan.
- Keep V1_SCOPE small and complete.
  Put suggested additions in a separate later backlog; do not import all features from a reference RTS.
- Organize the plan into numbered sections with short paragraphs, task bullets and useful tables.
  Each implementation section needs its outcome, dependencies, grouped tasks and an observable completion check.
- Cover concept/scope; environment and first export check; map/camera/input; selection/commands/movement; economy/construction/production; combat/opponent AI; match state/UI; assets; integration/playtesting; release and milestones.
  Adapt or omit genre-specific sections if GAME_IDEA changes.
- Define ownership of input, simulation state and presentation, with a small suggested folder structure for the selected engine.
  Specify important behavior without prescribing every class, API or algorithm in advance.
- For the RTS default, resolve UI clicks versus world orders, destroyed command targets, blocked movement, resource spending/refunds, production queues and AI access to resources.
  Define simultaneous match outcomes, pause/focus loss and a full restart.
- Give essential requirements stable IDs and map them to checks in an acceptance table.
  For resource accounting, specify when costs are charged, whether cancellation refunds them, and how duplicate completion/refund is prevented.
- Put proposed numbers in one tuning table with units, rationale and a playtest method.
  Mark them unvalidated; avoid conflicting duplicates and invented performance guarantees.
- Use outcome milestones in dependency order, starting with a minimal scene and export check, then one playable economy/combat loop.
  Include risks, a small experiment for each major unknown, and a release route suited to PLATFORM.
- Verify version-sensitive technical claims with current primary documentation when browsing is available.
  Link each such claim to its source and checked date, or mark it unverified.
  Original design choices need rationale, not fabricated citations.
- Review the draft once for conflicting parameters, missing dependencies, untestable requirements, scope growth and unavailable tools.
  Correct concrete defects and leave unresolved risks visible.
- This request authorizes planning and the selected document output only.
  Do not install tools, implement gameplay, create assets, commit, push, deploy or purchase anything.

## Completion check
Return one coherent Markdown plan, including its acceptance table, tuning table, milestones, sources/unknowns and a short review note.
End with the smallest implementation task the reader could authorize next.
Do not execute that task or report planned checks as passed.
