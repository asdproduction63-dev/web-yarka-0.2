---
name: Serene Modesty
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede9'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#4c4540'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#7e756f'
  outline-variant: '#cfc4bd'
  surface-tint: '#635d5a'
  primary: '#191613'
  on-primary: '#ffffff'
  primary-container: '#2e2a27'
  on-primary-container: '#97918d'
  inverse-primary: '#cdc5c0'
  secondary: '#59614e'
  on-secondary: '#ffffff'
  secondary-container: '#dee6cd'
  on-secondary-container: '#5f6754'
  tertiary: '#1a160f'
  on-tertiary: '#ffffff'
  tertiary-container: '#2f2a23'
  on-tertiary-container: '#989187'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9e1dc'
  primary-fixed-dim: '#cdc5c0'
  on-primary-fixed: '#1e1b18'
  on-primary-fixed-variant: '#4b4642'
  secondary-fixed: '#dee6cd'
  secondary-fixed-dim: '#c2cab2'
  on-secondary-fixed: '#171e0f'
  on-secondary-fixed-variant: '#424937'
  tertiary-fixed: '#eae1d6'
  tertiary-fixed-dim: '#cec5ba'
  on-tertiary-fixed: '#1f1b14'
  on-tertiary-fixed-variant: '#4b463e'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-caps-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
  label-caps-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.18em
  label-text:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

This design system embodies a serene, contemporary, and luxurious aesthetic tailored for modern Muslimah modest fashion. It balances quiet confidence with haute-couture editorial sensibilities. The emotional response is intentional stillness, elevated craftsmanship, and warmth—avoiding clinical minimalism in favor of tactile refinement.

The visual style blends **Editorial Minimalism** with **Warm Tactile Precision**:
- Generous breathing room and deliberate negative space that treats garment photography as fine art.
- Precise architectural geometry using micro-radii and razor-thin structural dividers.
- High-contrast typography combining classical couture grace with modern typographic legibility.
- Subdued surfaces referencing raw silks, organic linen, and natural stone textures.

## Colors

The palette relies on natural, grounding mineral and textile shades designed to frame fashion imagery without distraction:

- **Primary (`#2E2A27` - Deep Umber Charcoal):** Used for primary actions, high-impact CTA buttons, key headings, and high-contrast typography. Provides editorial weight against light canvas surfaces.
- **Secondary (`#B7BFA8` - Soft Sage):** An organic, muted green accent used for subtle seasonal badges, secondary promotions, selected states, and botanical touches.
- **Tertiary (`#D8CFC4` - Warm Oat Taupe):** Serves as secondary surface fills, hover containers, category chips, and soft background breaks.
- **Neutral Canvas (`#FAF7F2` - Ivory Alabaster):** The main background wash. A warm, luminous off-white that prevents clinical eye fatigue.
- **Structural Border (`#EBE5DF` - Warm Mortar):** Delicate, hairlike hairline borders (`1px`) used strictly to demarcate cards and structural grid divisions without visually cluttering the viewport.
- **Muted Text (`#706A65` - Mineral Ash):** Intermediate reading shade for metadata, secondary details, and breadcrumb trails to preserve typographic hierarchy.

## Typography

The typographic hierarchy juxtaposes the timeless high-fashion rhythm of **Playfair Display** with the clean geometric functionalism of **Plus Jakarta Sans**.

- **Editorial Headlines (`Playfair Display`):** Reserved for collection names, brand narratives, editorial intros, and hero showcases. Rendered primarily in regular and medium weights to prevent heaviness and preserve graceful serifs.
- **Structural Interface & Body (`Plus Jakarta Sans`):** Delivers clarity across descriptions, specifications, checkout flows, and system states.
- **Spaced Caps Strategy:** Navigation items, category signifiers, luxury tags, and metadata leverage `label-caps-lg` and `label-caps-sm` with widened letter-spacing (`0.15em` to `0.18em`) transformed to uppercase. This technique mirrors high-end print publishing.

## Layout & Spacing

The layout is structured around an airy 12-column grid on desktop, scaling to 6 columns on tablet and 2 columns on mobile devices:

- **Desktop (min-width: 1200px):** Max container width capped at `1440px`. Exterior canvas margins set to `margin` (`3rem`), column gutter set to `gutter` (`1.5rem`). Generous vertical section padding scales from `4rem` to `6rem` to allow breathing room between visual stories.
- **Tablet (768px - 1199px):** Margins adjust to `2rem`, gutters maintain `1rem`. Grids transition from 4-item shelves to 3- or 2-item rows.
- **Mobile (below 768px):** Outer horizontal margin compresses to `margin-mobile` (`1.25rem`) with dense gutters of `gutter-mobile` (`0.75rem`). Product grids default to a 2-column format to maintain item visibility and cadence.
- **Vertical Spacing Rhythm:** Internal component stacks respect an 8pt base grid (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 28px, `space-xl` = 48px). Whitespace is prioritized over enclosing boxes to organize UI content groupings.

## Elevation & Depth

This design system avoids dark or dramatic drop shadows. Visual depth is established through tonal layering, crisp borders, and soft, diffused ambient light:

- **Tonal Layering:** The primary canvas rests on `#FAF7F2`. Raised surfaces such as filter flyouts, drawers, and modal panels adopt pure white `#FFFFFF` or elevated oat taupe `#F5EFEB`.
- **Low-Contrast Hairline Outlines:** Elements rely on `1px solid #EBE5DF` borders rather than shadows to define bounds cleanly without interrupting spatial continuity.
- **Ambient Veil Shadows:** For floating elements (navigation bars upon scroll, quick-view sheets, dropdown menus), use an ultra-diffused shadow tinted with deep umber:
  - *Floating Menu:* `0 10px 30px -10px rgba(46, 42, 39, 0.05)`
  - *Modal & Slide-in Drawer:* `0 24px 48px -12px rgba(46, 42, 39, 0.08)`
- **Glass Surfaces:** Sticky navigation bars apply a 12px backdrop-filter blur over `rgba(250, 247, 242, 0.85)` to maintain continuous visual context during scroll.

## Shapes

The shape architecture relies on subtle architectural refinement:

- **Micro-Radius (`roundedness: 1` / `0.25rem` / `4px`):** Applied to buttons, input fields, notification banners, and chips. The corner is not razor-sharp, yet retains an architectural precision that avoids youthful bubbly curves.
- **Product Media Cards:** Product imagery maintains crisp `0px` sharp corners (`rounded-none`) or strictly matching micro-corners (`4px`), highlighting the bespoke tailored feel of lookbooks.
- **Image Aspect Ratio:** Garment photography strictly follows the vertical `4:5` ratio (e.g., `800x1000px`), maximizing mobile screen real estate and showcasing full-length silhouettes with draped proportions.

## Components

### Buttons
- **Primary:** Background `#2E2A27`, text `#FAF7F2`, border `none`, corner radius `4px`. Height `48px` (desktop), tracking `0.12em`, uppercase `label-caps-lg`. Hover transition to `#443E3A` with smooth `200ms ease`.
- **Secondary / Ghost:** Transparent background, border `1px solid #2E2A27`, text `#2E2A27`. Hover state inverts to `#2E2A27` background and `#FAF7F2` text.
- **Tertiary / Link:** Unframed with an animated `1px` underline pinned `4px` below the text; transitions width from 0% to 100% on hover.

### Product Cards
- **Structure:** Frameless cards built around a `4:5` aspect ratio image container. No drop shadows.
- **Hover State:** Secondary lifestyle/detail image cross-fades over `350ms ease`. Quick-add CTA slides up seamlessly from the bottom edge in `#2E2A27` with white text.
- **Metadata:** Product title in `body-sm` (`Plus Jakarta Sans`), category label in `label-caps-sm` (`#706A65`), price rendered in `body-md` bold (`#2E2A27`).

### Badges & Chips
- **Category & Filter Chips:** Background `#FAF7F2`, border `1px solid #D8CFC4`, text `#2E2A27`, padding `6px 14px`, text `label-caps-sm`. Active state switches background to `#2E2A27` and text to `#FAF7F2`.
- **Editorial Badges ("New Season", "Silk Voile"):** Tiny pill or micro-radius tag, background `#B7BFA8` with `#2E2A27` text or transparent outline in `#B7BFA8`.

### Form Fields & Inputs
- **Text Inputs:** Height `48px`, background `transparent`, bottom-only border (`1px solid #D8CFC4`) or full perimeter micro-radius with `1px solid #EBE5DF`.
- **Focus State:** Border shifts to `#2E2A27` with no glow ring. Floating placeholder transitions to `label-caps-sm` in `#706A65`.

### Checkboxes & Radio Buttons
- **Checkboxes:** `18x18px`, micro-radius `2px`, border `1px solid #D8CFC4`. Checked state fills `#2E2A27` with `#FAF7F2` checkmark icon.
- **Color Swatches:** Circular `24px` disc surrounded by a `2px` transparent gap and a delicate `1px` outer halo ring appearing solely upon active selection.

### Curated Collection Banners
- Asymmetric 2-column or 3-column editorial panels featuring layered imagery, oversized serif display typography, and minimal `48px` circular icon buttons with thin arrows (`#2E2A27`).