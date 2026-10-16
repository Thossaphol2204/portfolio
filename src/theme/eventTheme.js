export const EVENT_THEMES = {
  halloween: {
    id: 'halloween',
    icon: '🎃',
    decorations: ['🦇', '🎃', '👻', '🕷️', '🍬'],
  },
};

export const CURRENT_EVENT_ID = 'halloween';

export const CURRENT_EVENT = EVENT_THEMES[CURRENT_EVENT_ID];

export const THEME_OPTIONS = ['light', 'dark', CURRENT_EVENT_ID];

export function isValidTheme(theme) {
  return THEME_OPTIONS.includes(theme);
}

export function isEventTheme(theme) {
  return Boolean(EVENT_THEMES[theme]);
}
