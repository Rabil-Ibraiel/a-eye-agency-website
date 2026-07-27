---
name: A-Eye Signal Stage
description: A cinematic black-and-white portfolio world punctuated by the A-Eye red mark and kinetic typography.
---

<!-- SEED: established with the user before implementation; re-run $impeccable document once there's code to capture the actual tokens and components. -->

# Design System: A-Eye Chromatic Motion Stage

## Overview

**Creative North Star: "The Signal Stage"**

The site behaves like a live visual-production stage rather than a page assembled from sections. Black and white establish the visual field; A-Eye Red acts as the decisive signal. Cinematic images are physical flats moving through the space, and typography can be cropped, occluded, stretched across a threshold, or held completely still when the work needs the frame.

The experience alternates between spectacle and explanation. Work occupies clean rooms without competing labels. Context lives in visible threshold bands between rooms, so visitors always understand where they are without reducing the imagery to cards.

**Key Characteristics:**

- Full-frame black and white fields with disciplined red interventions
- Large condensed lettering used as spatial material
- Cinematic images treated as stage planes with real depth
- Strict alternation between work rooms and readable thresholds
- One scroll narrative with conventional links always available

## Colors

The palette is deliberately strict. Black and white carry the composition; A-Eye Red is reserved for identity, focus, action, and authored motion cues.

### Primary

- **Black**: `#000000`; the primary stage, navigation, and hard spatial edge.
- **White**: `#FFFFFF`; the reading field and primary contrast color.
- **A-Eye Red**: `#FF3B01`; the identity signal, active state, focus ring, and decisive action.

Supporting grays may be used only to create hierarchy within black or white fields. They never become new brand colors.

**The Signal Rule.** Red must identify a meaningful signal: the logo, active navigation, a primary action, focus, selection, or a key transition. It is not general decoration.

## Typography

**Primary Font:** Alfabet across display, interface, and body typography, using licensed webfont files when available.

**Fallback:** Helvetica Neue, Helvetica, Arial, sans-serif.

**Character:** Alfabet gives the identity a direct, graphic voice while remaining controlled enough for service and case-study copy. Weight, scale, and spacing create hierarchy without introducing a second type family.

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
