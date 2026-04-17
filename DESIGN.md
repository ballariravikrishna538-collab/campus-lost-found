# Campus Lost & Found — Design System

## Purpose & Tone
A student-focused lost & found platform combining Instagram's card simplicity with OLX's functional clarity. Tone: supportive, straightforward, human-centered—helping reunite people with their belongings through an approachable interface.

## Color Palette

| Token | OKLCH | Usage | Hex Approx |
|-------|-------|-------|-----------|
| **Primary** | 0.55 0.14 197 | Trust, CTAs, key interactions | #4EBACE |
| **Secondary** | 0.68 0.10 163 | Optimism, highlights, success states | #6FD4B8 |
| **Accent** | 0.65 0.08 145 | Natural grounding, tertiary actions | #6ACC9C |
| **Foreground** | 0.15 0.02 210 | Text, primary content | #1F2D3F |
| **Background** | 0.98 0.01 220 | Main surface, light mode | #F8F9FB |
| **Card** | 0.995 0 0 | Listings, dialogs, elevated content | #FFFFFF |
| **Muted** | 0.94 0.02 220 | Secondary text, disabled states | #E8ECF0 |
| **Destructive** | 0.65 0.22 25 | Warnings, rejections, delete actions | #E86B5D |

## Typography

| Role | Font | Scale |
|------|------|-------|
| Display | Bricolage Grotesque | 32px (hero), 24px (section headers) |
| Body | DM Sans | 16px (default), 14px (secondary), 12px (metadata) |
| Mono | Geist Mono | 13px (codes, technical info) |

**Hierarchy**: Weight + size + color depth. No arbitrary opacity shifts—use tonal variants (muted, secondary) for hierarchy instead.

## Elevation & Depth

| Level | Shadow | Usage |
|-------|--------|-------|
| Base | none | Background, text |
| Card | `shadow-card` (0 2px 8px, 0 1px 3px) | Item listings, form inputs, modals |
| Elevated | `shadow-elevated` (0 8px 16px, 0 4px 8px) | Sticky headers, floating actions, popover menus |

Soft shadows with low opacity; no harsh blacks. All shadows reference `rgba(0,0,0,0.08–0.12)` for consistency.

## Structural Zones

| Zone | Surface | Rationale |
|------|---------|-----------|
| Header/Navigation | `bg-card border-b` | Slight elevation from content, clear separation |
| Main Content | `bg-background` | Primary reading surface, cool undertone |
| Item Cards | `bg-card shadow-card` | Distinct from background, tangible appearance |
| Footer/Tertiary | `bg-muted/30` | Recessive, visual de-emphasis |
| Input/Form | `bg-input border` | Slightly darker than background for visual input affordance |

## Shape Language

- **Radius**: 0.625rem (10px) default for all interactive elements
- **Density**: Tight spacing (8px, 12px) for item cards; open spacing (16px, 24px) for page sections
- **Icons**: 24px on cards, 20px in lists, 32px on CTAs
- **Aspect Ratio**: 3:2 for item images (classic card proportion)

## Component Patterns

### Item Listing Card
- Horizontal layout: image (3:2) | content + badges | action
- Badges: category (secondary/20 bg), status (accent/20 bg), date (muted text)
- Border: none; separation via shadow and background color
- Hover: subtle `shadow-elevated`, slight lift via transform (2px translateY)

### Primary Button
- Background: primary, foreground: white
- Border radius: 0.625rem
- Padding: px-4 py-2.5 (16px h with 2px breathing room)
- Hover: primary/90 (slight darken), no shadow growth

### Form Input
- Border: 1px border-border, bg-input (slightly darker than background)
- Focus: border-primary, ring-1 ring-primary/30
- Label: text-foreground, 14px, uppercase tracking (0.05em) for clarity

### Badge
- Category: bg-secondary/20, text-secondary, 12px, inline-flex with icon
- Status: bg-accent/20, text-accent, 12px, indicator-only or with text

## Motion & Animation

| Animation | Duration | Use |
|-----------|----------|-----|
| `fade-in` | 300ms | Content load, modal appear |
| `slide-up` | 300ms | Sheet/drawer entrance |
| `transition-smooth` | 300ms | Interactive states (hover, focus) |
| No bounce | — | Authenticity—bouncy interactions trivialize earnest use-cases |

Cubic-bezier `(0.4, 0, 0.2, 1)` for natural easing. Disabled animations respect `prefers-reduced-motion`.

## Dark Mode

Inverted lightness, saturated carefully. Primary shifts to `0.63 0.12 197` (brighter cyan for legibility on dark). Background: `0.12 0.01 220` (near-black with slight blue hint). Maintains contrast ≥4.5:1 for text.

## Anti-Patterns Avoided

- ✅ No default Tailwind blue—fully custom teal palette
- ✅ No uniform rounded corners—intentional radius variation
- ✅ No generic shadows—shadows tied to elevation semantic (card vs. elevated)
- ✅ No safe fonts—Bricolage for distinctive display identity
- ✅ No random opacity masks—semantic color tokens for hierarchy
- ✅ No full-page gradients—depth through layering and composition
- ✅ No over-animation—deliberate, purposeful motion only

## Signature Detail

**Soft icon badges on cards**: Each item shows a small circular badge (40px, semi-transparent secondary background) with category icon (key, phone, laptop, etc.). This borrowed detail from iOS design creates a tactile, visual "at a glance" recognition—you know instantly what type of item you're viewing.

## Accessibility

- WCAG AA+ contrast verified (≥4.5:1 foreground-on-background)
- `prefers-reduced-motion` honored
- Focus states: `ring-1 ring-offset-0 ring-primary/50` for all interactive elements
- Touch targets: minimum 44px (padding applied generously)
- Form labels always explicit; no placeholder-only inputs
