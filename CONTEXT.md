# Context

A glossary of the language used in this portfolio site. Terms only, no implementation detail.

## Terms

### Tech Stack grid
The set of featured technology cards shown in the About section under the "Current Tech Stack" heading. Displayed as a centered, wrapped grid with all cards visible at rest; the block has a subtle vertical parallax as the section scrolls past.

Note: the component is still named `TechStackReel` and older comments call it a "reel" or "conveyor". That language is historical. It described an earlier design where the cards swept horizontally across the viewport, driven by scroll position. That sweep was removed because the horizontal motion was too strong. The current thing is a grid, not a reel.

### Hero
The first full-height section of the site. Contains the name, overline (role + location), rotating-word tagline, a short bio, and the primary actions (Get In Touch, CV download).

### Bio
Two distinct pieces of self-description exist:
- **Hero bio**: the short three-line statement in the Hero.
- **About bio**: the longer four-paragraph narrative in the About section.
These are separate copy and are edited independently.
