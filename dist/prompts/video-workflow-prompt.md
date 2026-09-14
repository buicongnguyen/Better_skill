# Build a small, reviewable game trailer with GPT-6 Astra

Create a 10-second, 16:9 teaser for Signal Garden in a separate video project.
Target: three shots lasting 3, 3, and 4 seconds, with clear titles and readable gameplay.

Inputs to fill in:
- Game repository and runnable build: [path and command]
- Approved gameplay captures and references: [paths]
- Video project directory: [path]
- Available tools/services and permitted generation budget: [details]
- Publication destination and permission, if any: [details]

Inspect the actual files, installed tools, and available skills. Verify current
official documentation where an API, model, or command may have changed.
Recommend the smallest suitable route: captured footage and Remotion composition,
a compatible ComfyUI template, or a video provider API. Add n8n only if repeated
job coordination justifies it. Explain the choice briefly using the target result.

Prepare a shot manifest with stable IDs, intent, duration, source type, inputs,
output path, and review status. Show actual mechanics with gameplay capture.
Label generated concept footage. Compose exact titles in the edit.
An all-generated multi-shot recipe is a concept variant; it must not replace
shots that claim to demonstrate implemented mechanics. Verify cloud template
availability separately from a local model guide.

Use existing relevant skills where helpful. Do not create a custom skill or hook
unless a missing recurring procedure or useful event action justifies it.
An MCP connection must expose the needed tool; inspect its registered capabilities.

Build a reviewable local composition using available media. If inputs are missing,
use clearly labeled placeholders and list exactly what is needed to replace them.
If no paid-generation budget is supplied, prepare the request but do not submit it.

For authorized generation: validate the provider's actual schema; submit once;
persist task ID, shot ID, model/version, inputs, and attempt number. Wait and poll
within a deadline using provider guidance. Preserve the ID after a timeout and
check the existing job before retrying. Handle all documented nonterminal states
(including THROTTLED on Runway), retryable status-request errors with bounded
backoff, and unknown/fatal outcomes. A local timeout does not cancel a remote job.
If submission is uncertain and no ID was returned, reconcile before resubmitting.
Save outputs to durable local/project storage; receiving download instructions
is not proof a file was saved. Verify the file and record actual cost when
available. Keep credentials out of GitHub.

Inspect each clip, then watch the full rendered export for timing, continuity,
legible titles, audio, and faithful gameplay. Repair the relevant shot or layer
and compare the same section before and after. Report the artifact paths,
what was verified, and remaining limitations. Publish only within the supplied
destination and permission; a local preview is a useful first checkpoint.
