# Original book illustrations

The two Signal Garden stills were rendered with Blender 4.5.3 LTS using the
shared executable in the neighboring `3d_astra` repository, also referenced by
the user's other game projects. Only this book's output files were changed.

Run `npm run artwork` in this workspace, or use an explicit portable path:

```powershell
npm run artwork -- --blender C:/path/to/blender.exe
```

`scripts/render-illustrations.py` constructs all geometry and materials from
primitives. No external asset pack, model, texture, or add-on is required.
`signal-garden.blend` is the editable final scene. The script recreates both
the greybox and material study with identical geometry, camera, and lighting.
The images are concept studies, not captures of an implemented game.

The game uses Y up; the Blender script maps `(x,y,z)` to `(x,-z,y)`.
The floor is 24 by 24 units. Three amber cells, a teal beacon, an ivory robot,
and a terracotta drone demonstrate shape and color distinctions. Neutral
lighting supports the comparison; the proposed dusk lighting is not finalized.

`diagrams/` contains print exports of the same Mermaid definitions used by the
web edition, in all three languages. Regenerate them with
`node scripts/render-pdf-diagrams.mjs`; see `scripts/PDF.md` for dependencies.
