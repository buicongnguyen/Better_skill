## Edit these parameters
PROJECT_FOLDER: current selected game folder
AGENT: Codex
MODEL: GPT-6 Astra
GITHUB_OWNER: [YOUR_ACCOUNT]
REPOSITORY: signal-garden
PUBLISH: YES
VERCEL_SCOPE: [YOUR_VERCEL_SCOPE]

## Choices and consistency
- AGENT: choose Codex or Claude Code.
  Select MODEL in that application before sending; use an available Claude model with Claude Code.
  These lines do not switch the actual model or grant tools.
- Work only in PROJECT_FOLDER.
  Inspect the actual tools and relevant project instructions; resolve a material mismatch before dependent work.
- PUBLISH: YES authorizes the public repository/source and deployment described below; NO means local release preparation only.
  Resolve all destination placeholders before publication.
  Use GITHUB_OWNER and REPOSITORY for the source repository.
  Use the selected Vercel project's actual domain and deployment path for the game URL and base path.

## Goal
Prepare or publish this game on Vercel Hobby, according to PUBLISH.

## Tasks and constraints
- Use the GITHUB_OWNER and REPOSITORY values above; resolve placeholders before any external publication.
- Inspect the actual repository, branch, remotes, intended diff, excluded secrets and asset licenses.
  Preserve unrelated work; do not replace a conflicting remote or force-push.
- Keep the existing engine.
  For a Vite/Three.js project, verify the install/build commands and dist output.
  For Godot, verify the installed version, web-export support and actual export directory; preserve the generated filenames.
  Prove the static build works before publishing.
- Resolve VERCEL_SCOPE before linking a project.
  Check existing Vercel links and report a destination conflict without replacing them.
- Verify this personal, non-commercial project is eligible for Hobby under current limits; do not buy services or upgrade.
- Use Vite base / for a domain-root Vite deployment.
  Verify the selected engine’s actual build command and output directory; do not assume every engine uses dist.
  Prepare the Vercel configuration.
- If PUBLISH is YES, I authorize creating the named public GitHub repository if absent, committing and pushing this game’s reviewed intended files, and publicly deploying it to the selected host.
  If PUBLISH is NO, stop after local preparation and report the remaining release steps.
- For YES, use an authenticated Vercel CLI or Git import in VERCEL_SCOPE.
  Guide browser sign-in or repository access if needed; never ask for secrets in chat.
- Verify the deployed revision and unauthenticated public gameplay.
  Report the actual assigned production URL and any checks not run.

## Completion check
PUBLISH=NO: a tested local release package and remaining steps.

PUBLISH=YES: the reviewed commit, matching successful deployment, public URL and actual verification record.

Report a concrete blocker if completion is unavailable.
