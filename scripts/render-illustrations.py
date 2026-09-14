"""Original Signal Garden concept figures. Run with Blender 4.5 LTS:
blender --background --factory-startup --python scripts/render-illustrations.py
Game coordinates (x, y-up, z) map to Blender (x, -z, y-up).
The scene is a teaching model, not a screenshot of an implemented game.
"""
import bpy, math
from mathutils import Vector
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'illustrations'
OUT.mkdir(exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

def material(name, color, metallic=0, emission=0):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1)
    m.use_nodes = True
    bs = m.node_tree.nodes.get('Principled BSDF')
    bs.inputs['Base Color'].default_value = (*color, 1)
    bs.inputs['Roughness'].default_value = .48
    bs.inputs['Metallic'].default_value = metallic
    bs.inputs['Emission Color'].default_value = (*color, 1)
    bs.inputs['Emission Strength'].default_value = emission
    return m

stone = material('Muted green stone', (.27, .39, .32))
floor = material('Pale sage floor', (.51, .61, .49))
dark = material('Deep green machinery', (.055, .12, .115), .35)
leaf = material('Plant foliage', (.12, .26, .16))
soil = material('Soil', (.105, .12, .085))
amber = material('Amber energy cells', (.94, .39, .055), .15, .45)
teal = material('Teal beacon', (.06, .65, .56), .2, .55)
robot = material('Ivory robot shell', (.86, .82, .66), .25)
drone = material('Terracotta hazard', (.46, .12, .09), .3)
ground = material('Paper backdrop', (.81, .82, .74))
grey = material('Neutral greybox', (.52, .57, .55))

def xyz(p): return (p[0], -p[2], p[1])
def box(name, p, size, mat, bevel=.12):
    bpy.ops.mesh.primitive_cube_add(size=1, location=xyz(p))
    ob = bpy.context.object; ob.name = name
    ob.dimensions = (size[0], size[2], size[1])
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    ob.data.materials.append(mat)
    if bevel:
        mod = ob.modifiers.new('Soft manufactured edges', 'BEVEL')
        mod.width=bevel; mod.segments=3
        ob.modifiers.new('Weighted normals', 'WEIGHTED_NORMAL')
    return ob
def cylinder(name, p, radius, depth, mat, vertices=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=xyz(p))
    ob=bpy.context.object; ob.name=name; ob.data.materials.append(mat)
    mod=ob.modifiers.new('Edge bevel','BEVEL');mod.width=.08;mod.segments=3
    ob.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
    return ob
def sphere(name,p,r,mat):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, radius=r, location=xyz(p))
    ob=bpy.context.object;ob.name=name;ob.data.materials.append(mat)
    for f in ob.data.polygons:f.use_smooth=True
    return ob

box('24 by 24 arena slab',(0,-.65,0),(24,1.3,24),stone,.28)
for x in range(-10,12,4):
    for z in range(-10,12,4):box('Floor tile',(x,.035,z),(3.96,.1,3.96),floor,.04)
for x in [-11.8,11.8]:box('Low side parapet',(x,.4,0),(.32,.8,24),stone)
for z in [-11.8,11.8]:box('Low side parapet',(0,.4,z),(24,.8,.32),stone)
for x,z in [(-5,-3),(5,3)]:
    box('Low planter',(x,.65,z),(3,1.3,7),stone)
    box('Inset soil',(x,1.32,z),(2.55,.1,6.5),soil,.05)
    for i in range(5):
        s=sphere('Readable low foliage',(x,1.5,z-2.5+i*1.2),.72,leaf)
        s.scale=(.8,1,.58)
cylinder('Beacon plinth',(0,.18,0),1.7,.36,dark)
cylinder('Beacon foot',(0,.48,0),1.15,.35,stone)
cylinder('Beacon column',(0,1.6,0),.48,2, dark)
cylinder('Teal illuminated beacon',(0,2.95,0),.58,.75,teal)
cylinder('Beacon cap',(0,3.4,0),.7,.15,dark)
for i,(x,z) in enumerate([(-8,7),(7,-8),(8,7)],1):
    cylinder(f'Cell {i} base',(x,.18,z),.65,.3,dark)
    box(f'Cell {i} amber body',(x,.8,z),(.65,1.1,.65),amber)
    box(f'Cell {i} cap',(x,1.39,z),(.76,.12,.76),dark,.04)
box('Robot body',(-3,.9,7),(1.15,1.2,.9),robot,.2)
box('Robot head',(-3,1.7,7),(1.35,.55,1),robot,.14)
box('Robot visor',(-3,1.73,7.52),(.95,.24,.08),dark,.05)
for x in [-3.62,-2.38]:sphere('Robot wheel',(x,.48,7),.38,dark)
sphere('Robot antenna',(-3,2.3,7),.13,teal)
box('Drone body',(6,2.3,-2),(1.55,.55,1.3),drone,.2)
for x in [5,7]:
    for z in [-3,-1]:cylinder('Drone rotor',(x,2.42,z),.65,.09,dark)
for z in range(-7,8,2):box('Patrol guide',(9,.105,z),(.12,.025,.65),dark,.01)
box('Backdrop',(0,-1.7,0),(200,.2,200),ground,0)

scene=bpy.context.scene
scene.render.engine='CYCLES';scene.cycles.samples=32
scene.cycles.use_denoising=True
scene.render.resolution_x=1500;scene.render.resolution_y=1100;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG'
scene.world.color=(.28,.28,.28)
scene.view_settings.view_transform='AgX'
bpy.ops.object.camera_add(location=(31,-39,34))
camera=bpy.context.object;camera.name='Matched comparison camera'
camera.rotation_euler=(Vector((0,0,.7))-camera.location).to_track_quat('-Z','Y').to_euler()
camera.data.type='ORTHO';camera.data.ortho_scale=40;scene.camera=camera
bpy.ops.object.light_add(type='AREA',location=(-8,-12,30))
light=bpy.context.object;light.name='Large soft key';light.data.energy=6000;light.data.shape='DISK';light.data.size=15
bpy.ops.object.light_add(type='SUN',location=(0,0,24))
bpy.context.object.rotation_euler=(.5,-.5,-.3);bpy.context.object.data.energy=2
original={ob.name:list(ob.data.materials) for ob in scene.objects if ob.type=='MESH' and ob.name!='Backdrop'}
for name in original:
    slots=bpy.data.objects[name].data.materials;slots.clear();slots.append(grey)
scene.render.filepath=str(OUT/'signal-garden-greybox.png');bpy.ops.render.render(write_still=True)
for name, materials in original.items():
    slots=bpy.data.objects[name].data.materials;slots.clear()
    for m in materials:slots.append(m)
scene.render.filepath=str(OUT/'signal-garden-concept.png');bpy.ops.render.render(write_still=True)
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'signal-garden.blend'))
print('Rendered two original concept illustrations with Blender', bpy.app.version_string)
