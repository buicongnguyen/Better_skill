## Edit these parameters
PROJECT_FOLDER: current selected game folder
AGENT: Codex
MODEL: GPT-6 Astra
GITHUB_OWNER: [YOUR_ACCOUNT]
REPOSITORY: signal-garden
PUBLISH: YES

## Choices and consistency
- AGENT: choose Codex or Claude Code.
  Select MODEL in that application before sending; use an available Claude model with Claude Code.
  These lines do not switch the actual model or grant tools.
- Work only in PROJECT_FOLDER.
  Inspect the actual tools and relevant project instructions; resolve a material mismatch before dependent work.
- PUBLISH: YES authorizes the public repository/source and deployment described below; NO means local release preparation only.
  Resolve all destination placeholders before publication.
  Derive the URL and base path from GITHUB_OWNER and REPOSITORY.

## Goal
Prepare or publish this game on GitHub Pages, according to PUBLISH.

## Tasks and constraints
- Use the GITHUB_OWNER and REPOSITORY values above; resolve placeholders before any external publication.
- Inspect the actual repository, branch, remotes, intended diff, excluded secrets and asset licenses.
  Preserve unrelated work; do not replace a conflicting remote or force-push.
- Keep the existing engine.
  For a Vite/Three.js project, verify the install/build commands and dist output.
  For Godot, verify the installed version, web-export support and actual export directory; preserve the generated filenames.
  Prove the static build works before publishing.
- For a project site, derive the URL as https://GITHUB_OWNER.github.io/REPOSITORY/ using the actual values.
  Set Vite base to /REPOSITORY/ when using Vite; for another engine, verify its exported assets under that path.
- Prepare a GitHub Pages Actions workflow that builds the project and uploads only the verified static output directory, with the required Pages permissions.
- If PUBLISH is YES, I authorize creating the named public GitHub repository if absent, committing and pushing this game’s reviewed intended files, and publicly deploying it to the selected host.
  If PUBLISH is NO, stop after local preparation and report the remaining release steps.
- For YES, enable Pages from GitHub Actions if permitted and follow the workflow for the exact pushed commit.
- Open the resulting public URL, verify assets and a complete round through real controls if available, and identify any unperformed checks.

## Completion check
PUBLISH=NO: a tested local release package and remaining steps.

PUBLISH=YES: the reviewed commit, matching successful deployment, public URL and actual verification record.

Report a concrete blocker if completion is unavailable.
