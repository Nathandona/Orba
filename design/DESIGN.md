# Orba design

## Brief
Small product teams (3 to 15) tired of heavy tools or of boards nobody updates. One action: Start free. Main objection: "another board tool, will my team actually use it". Facts and copy: brief.md, landing-copy.md.

## Decisions
- 2026-11-25 round 1: landing first; free rein on brand (rebrand); mood playful and colourful; hero shows the real board.
- 2026-11-25 round 2: Nathan asked for all three wireframes (W1 board is the page, W2 statement + stickers, W3 the week) in hi-fi; free hand on stealing between them. Palette: sticky-note pop. Images: GPT generation allowed freely. Logo: free hand.
- Mark: a sticky note tilted -8 degrees with a peeled corner, a bold ink "o" on it. The lockup uses the mark as the "o" of "orba" (mark + "rba" in Bricolage Grotesque ExtraBold). File: assets/orba-mark.svg. Rejected: orb with three bars (read as audio levels), organic o with orbiting dot (generic).

## Tokens
- Type: Bricolage Grotesque only (variable, wght 200-800, opsz 12-96). Display 112/96/88 ExtraBold 800, -0.04em; H2 56 ExtraBold -0.03em; H3 28 Bold; body 20/18 Regular, line height 1.5; small 14 Medium. Why: a warm, slightly quirky grotesk that can be loud without looking childish.
- Color: bg #FFFFFF, column #F3F3F5, ink #111114, ink-2 #4A4A55, ink-3 #7C7C88, hairline #E7E7EB, cobalt #2D4BFF (actions, links, one highlight), sticky yellow #FFD84D, coral #FF7A8A (cards, labels, stickers only), tints yellow-50 #FFF6D1, coral-50 #FFE3E7, cobalt-50 #E6EAFF.
- Radius: 10 card, 16 column, 24 large surfaces, pill buttons.
- Spacing: 4 px base, section gap 160 to 200 on desktop.

## Hi-fi (2026-11-25), Paper file "Orba"
- Shared parts: "Board UI (component)" artboard (real Orba card fields: label, title, due date, comments, priority, assignee), card detail panel, invite panel, plan cards.
- Hi-fi W2 Statement + stickers: 116 px headline with "Friday." in cobalt, the board on a yellow-50 band with a card mid-drop into Review, stickers (coffee, FRI, check), week as three tilted sticky notes, card and team sections alternating, tilted plan cards, sticky-wall photo close.
- Hi-fi W1 Board is the page: the hero is a four-column board, the headline lives on the first To Do card; every section below is built from columns and cards; the close is one giant yellow note.
- Hi-fi W3 The week: centered hero with stickers, a full cobalt band with Monday to Friday tabs (Wednesday active) over the board, bento for card and team, centered plans, centered close.

## Round 3 (2026-11-25)
- Nathan prefers W3. The flat cobalt week band feels wrong: replacing it with a generated background Compared in the "Week band options" artboard: blue paper collage (kept, assets/generated/band-collage-2.png), pale collage (band-collage-1), blurred sticky wall (rejected: caption loses contrast on busy shapes).
- Nav: the generic full-width bar is replaced by a centered floating pill (logo, Features, Pricing, Docs, Log in) with a sticky-note "Start free" (yellow, tilted -3 degrees, peeled corner like the mark). Rejected: ink bar (heavy), segmented tabs (too close to the day tabs).

- Paper material extended to every coloured surface on W3: bento-card, bento-team, pricing, cta-yellow (assets/generated/*.jpg). The close is now a full-bleed yellow paper band; the stickers on it were removed (flat vector on paper clashed).
- Coherence rules, applied to W3 (2026-11-25, Nathan: "ok go on"): one primary button (the sticky note) plus an outlined secondary; stickers remade as paper cut-outs or kept to white areas; tilt only on objects you can pick up (2 to 3 degrees), real UI straight; radii 10 / 20 / 32; footer as a floating pill.


## System rules (W3)
- Main button: always a sticky note (radius 10 10 0 10, peeled bottom-right corner, tilted -3 degrees, weight 700). Yellow with ink text by default; cobalt with white text on yellow ground. The peel's back triangle takes the ground colour. Secondary: outlined pill, 1.5 px ink at 18%.
- Material: every coloured surface below the hero is photographed cut paper (generated). White stays plain white.
- Tilt: only objects you can pick up (buttons, notes, plan cards) at 2 to 3 degrees; stickers at 6 degrees; real UI (board, card detail, invite panel) straight.
- Radius: 10 cards and buttons, 20 panels and plan cards, 32 sections, pills for nav, footer, tabs and secondary buttons.
- Nav and footer: centered floating white pills.

## Imagery
- AI-generated (GPT via Codex): die-cut stickers (assets/generated/sticker-*), illustrated avatars (avatar-*), sticky-note wall photo (wall-*). All illustrative, none presented as customers.
- Paper series (W3): section backgrounds (band-collage-*, bento-card, bento-team, pricing, cta-*) and paper stickers (paper-coffee, paper-plane, paper-check, paper-star). W3 uses only the paper series; the flat vector sticker-* files belong to W1 and W2. Rejected: band-blur-* (caption contrast).

## Open
- Pick one direction (or a mix) before building it in code.
- Demo board content (cards, names Elena L., Mika K., Jo L.) is illustrative, not customers.
- No real proof yet (customers, usage numbers). Do not invent.
