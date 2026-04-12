// ============================================================
//  DESIGN SYSTEM — Black + Gold Premium Theme
//  All design decisions live here as documentation.
//  Actual CSS tokens are in src/index.css (:root / html.dark).
// ============================================================

export const COLORS = {
  // Backgrounds
  bgBase:      '#131313',   // page background
  bgSurface:   '#1A1A1A',   // elevated surfaces
  bgCard:      '#1F1F1F',   // card background
  bgDeeper:    '#0D0D0D',   // footer / deepest

  // Gold accent system — use sparingly
  gold:        '#EFD395',   // primary accent — CTAs, highlights, active states
  goldMuted:   '#D4B97A',   // secondary — hover states, icons
  goldDim:     '#B8975A',   // tertiary — borders, subtle accents

  // RGB string versions — for use in rgba() expressions
  goldRgb:      '239,211,149',
  goldMutedRgb: '212,185,122',

  // Text
  textPrimary:   '#FFFFFF',
  textSecondary: '#A4A4A4',
  textMuted:     '#777674',

  // Border
  border:       '#2A2A2A',
  borderHover:  'rgba(239,211,149,0.25)',  // gold at low opacity

  // Semantic / status
  success:      '#10B981',   // available-for-work, full-time badge, "current" indicator

  // Social brand colours (used in Contact links)
  socialGithub:   '#94A3B8',
  socialLinkedin: '#0A66C2',
  socialTwitter:  '#1DA1F2',

  // Loader-specific tones
  loaderDot:  '#3A3A3A',   // period dot after first name
  loaderText: '#5A5A5A',   // "Initializing portfolio…" label
};

/**
 * Returns an rgba() string built from a hex color + opacity.
 * Keeps all color values centralised in this file.
 *
 * @param {string} hex  - e.g. COLORS.gold  ('#EFD395')
 * @param {number} alpha - 0–1
 * @returns {string}    - e.g. 'rgba(239,211,149,0.25)'
 */
export function withAlpha(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Light mode equivalents
export const LIGHT = {
  bgBase:      '#F9F7F3',
  bgSurface:   '#FFFFFF',
  bgCard:      '#F5F3EE',
  bgDeeper:    '#EDE9E0',

  gold:        '#A07830',   // darker for visibility on light bg
  goldMuted:   '#8B6520',

  textPrimary:   '#131313',
  textSecondary: '#4A4845',
  textMuted:     '#888480',

  border:       '#E5E2DA',
};

/*
 USAGE RULES
 ─────────────────────────────────────────────────────────────
 Gold (#EFD395) ONLY for:
   • CTA button backgrounds
   • Active nav link text
   • Key number / stat highlights
   • Section title accent line
   • Card hover border glow
   • Profile image ring

 DO NOT use gold for:
   • Large backgrounds
   • Paragraph text
   • Multiple decorative elements at once

 Black / dark tones for everything else.
 Text secondary (#A4A4A4) for body copy.
 ─────────────────────────────────────────────────────────────
*/
