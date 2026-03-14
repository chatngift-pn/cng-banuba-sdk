import type { EditorTheme } from '../types';

export const DEFAULT_THEME: EditorTheme = {
  background: '#000000',
  surface: '#1A1A1A',
  surfaceAlt: '#2A2A2A',
  accent: '#FE2C55',
  text: '#FFFFFF',
  textSecondary: '#888888',
  border: '#333333',
  danger: '#FF453A',
  success: '#32D74B',
};

export const TIMELINE_CLIP_HEIGHT = 52;
export const TIMELINE_TRACK_HEIGHT = 72;
export const TOOLBAR_HEIGHT = 60;
export const BOTTOM_PANEL_HEIGHT = 280;
export const CANVAS_ASPECT_RATIOS = {
  '9:16': 9 / 16,
  '16:9': 16 / 9,
  '1:1': 1,
  '4:3': 4 / 3,
  '3:4': 3 / 4,
} as const;
