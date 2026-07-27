---
name: A-Eye Chromatic Motion Stage
description: A cinematic portfolio world built from saturated stage fields, moving image flats, and kinetic typography.
---

<!-- SEED: established with the user before implementation; re-run $impeccable document once there's code to capture the actual tokens and components. -->

# Design System: A-Eye Chromatic Motion Stage

## Overview

**Creative North Star: "The Chromatic Motion Stage"**

The site behaves like a live visual-production stage rather than a page assembled from sections. Saturated full-viewport fields are the rooms; cinematic images are physical flats moving through them; typography is a performer that can be cropped, occluded, stretched across a threshold, or held completely still when the work needs the frame.

The experience alternates between spectacle and explanation. Work occupies clean rooms without competing labels. Context lives in visible threshold bands between rooms, so visitors always understand where they are without reducing the imagery to cards.

**Key Characteristics:**

- Full-frame color fields instead of a persistent dark canvas
- Large condensed lettering used as spatial material
- Cinematic images treated as stage planes with real depth
- Strict alternation between work rooms and readable thresholds
- One scroll narrative with conventional links always available

## Colors

The palette is a full production palette, not one accent sprinkled over neutrals.

### Primary

- **Stage Cobalt**: the opening field and recurring spatial anchor; saturated enough to feel physical, dark enough to support black and off-white type.
- **Curtain Vermilion**: threshold bands, project transitions, and decisive actions.

### Secondary

- **Cue Butter**: brief moments of orientation, selection, and process emphasis.
- **Optical Blue**: a brighter blue used only when separating depth planes from the main cobalt field.

### Neutral

- **Soft Silver**: quiet reading rooms and supporting pages.
- **Ink Black**: primary lettering, navigation, and hard stage edges.
- **Projection White**: text and controls on saturated fields.

**The Field Rule.** A dominant color owns an entire room or threshold. Do not reduce the palette to tiny badges and borders.

## Typography

**Display Font:** Barlow Condensed with a narrow system-sans fallback  
**Body Font:** Funnel Sans with a modern system-sans fallback

**Character:** Display type has the scale and vertical authority of a festival poster or stage title. Body type is open, quiet, and contemporary so it can survive over changing fields without competing with the work.

### Hierarchy

- **Display:** ultra-large condensed words, never more than two simultaneous phrases.
- **Headline:** compact sentence-scale statements that bridge rooms.
- **Body:** 16–20px with a maximum measure around 68 characters.
- **Label:** sentence case or concise uppercase only where it behaves like a real production cue.

**The Occlusion Rule.** Display type may move behind imagery or outside the viewport; body copy and actions never do.

## Layout

The primary desktop topology is a sequence of viewport-sized rooms connected by shorter threshold bands. Image planes may rotate or translate inside a room, but their resting positions lock to a twelve-column stage. The site header sits above the world as a compact control layer.

Mobile preserves the alternation rather than shrinking the desktop scene. Each room becomes one full-width image and one decisive title; each threshold becomes a readable screen. No horizontal drag is required for primary navigation.

Spacing follows three clear tiers: tight production metadata, medium control groups, and large room transitions. The rhythm deliberately varies rather than applying one section padding everywhere.

## Elevation & Depth

Color fields stay flat. Depth appears only on moving image flats through one hard offset plus one soft ambient shadow. Active stage planes may tilt in perspective; copy, controls, and threshold bands remain in the page plane.

**The Physical Plane Rule.** If an object casts a shadow, it must move like a physical plane and have a clear stacking relationship.

## Shapes

The world uses hard rectangular crops, full circles only for rotational cues, and no decorative rounded containers. Thin rules belong to actual thresholds, timelines, or alignment cues. Project imagery may be clipped with diagonal stage edges during motion, but it resolves to a clean rectangle at rest.

## Do's and Don'ts

### Do:

- **Do** let one image or phrase dominate each room.
- **Do** keep project links, navigation, and contact actions usable without motion.
- **Do** use scroll to reveal spatial relationships, never to take control away from the visitor.
- **Do** switch to a complete static composition for reduced-motion users.
- **Do** let quiet silver rooms reset the eye between saturated sequences.

### Don't:

- **Don't** return to dark agency grids, scanner overlays, or boxed project cards.
- **Don't** imitate Unseen Studio’s 3D world, navigation labels, or interaction copy.
- **Don't** use infinite decorative loops, floating blobs, glass panels, or neon halos.
- **Don't** place explanatory text over the central work image.
- **Don't** make a gesture the only way to reach a project or contact action.
