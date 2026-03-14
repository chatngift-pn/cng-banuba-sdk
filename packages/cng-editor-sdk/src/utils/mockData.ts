import type {
  Clip,
  Filter,
  StickerItem,
  Transition,
  EditorProject,
  AudioTrack,
} from '../types';

// ─── Mock filters ───────────────────────────────────────────────────────────
export const MOCK_FILTERS: Filter[] = [
  { id: 'none', name: 'Original', previewColor: 'transparent', intensity: 1 },
  { id: 'vivid', name: 'Vivid', previewColor: '#FF6B6B30', intensity: 1 },
  { id: 'cool', name: 'Cool', previewColor: '#6B9FFF30', intensity: 1 },
  { id: 'warm', name: 'Warm', previewColor: '#FFD76B30', intensity: 1 },
  { id: 'mono', name: 'Mono', previewColor: '#FFFFFF20', intensity: 1 },
  { id: 'vintage', name: 'Vintage', previewColor: '#C8A96030', intensity: 1 },
  { id: 'fade', name: 'Fade', previewColor: '#FFFFFF15', intensity: 0.8 },
  { id: 'drama', name: 'Drama', previewColor: '#00000040', intensity: 1 },
  { id: 'neon', name: 'Neon', previewColor: '#FF00FF30', intensity: 1 },
  { id: 'pastel', name: 'Pastel', previewColor: '#FFB3DE30', intensity: 1 },
  { id: 'city', name: 'City', previewColor: '#4ECDC430', intensity: 1 },
  { id: 'summer', name: 'Summer', previewColor: '#FFE66D30', intensity: 1 },
];

// ─── Mock stickers ───────────────────────────────────────────────────────────
export const MOCK_STICKERS: StickerItem[] = [
  { id: 's1', name: 'Heart', source: '❤️', category: 'emoji' },
  { id: 's2', name: 'Fire', source: '🔥', category: 'emoji' },
  { id: 's3', name: 'Star', source: '⭐', category: 'emoji' },
  { id: 's4', name: 'Crown', source: '👑', category: 'emoji' },
  { id: 's5', name: 'Sparkle', source: '✨', category: 'emoji' },
  { id: 's6', name: 'Laugh', source: '😂', category: 'emoji' },
  { id: 's7', name: 'Cool', source: '😎', category: 'emoji' },
  { id: 's8', name: 'Love', source: '😍', category: 'emoji' },
  { id: 's9', name: 'Music', source: '🎵', category: 'music' },
  { id: 's10', name: 'Mic', source: '🎤', category: 'music' },
  { id: 's11', name: 'Party', source: '🎉', category: 'fun' },
  { id: 's12', name: 'Rainbow', source: '🌈', category: 'fun' },
  { id: 's13', name: 'Lightning', source: '⚡', category: 'fun' },
  { id: 's14', name: 'Sun', source: '☀️', category: 'nature' },
  { id: 's15', name: 'Flower', source: '🌸', category: 'nature' },
  { id: 's16', name: 'Moon', source: '🌙', category: 'nature' },
  { id: 's17', name: 'Camera', source: '📷', category: 'misc' },
  { id: 's18', name: 'Trophy', source: '🏆', category: 'misc' },
  { id: 's19', name: 'Diamond', source: '💎', category: 'misc' },
  { id: 's20', name: 'Rocket', source: '🚀', category: 'misc' },
];

// ─── Mock transitions ─────────────────────────────────────────────────────
export const MOCK_TRANSITIONS: Transition[] = [
  { id: 'none', name: 'None', duration: 0, icon: '⬜' },
  { id: 'fade', name: 'Fade', duration: 0.5, icon: '◻' },
  { id: 'dissolve', name: 'Dissolve', duration: 0.6, icon: '🔸' },
  { id: 'wipe-left', name: 'Wipe ←', duration: 0.4, icon: '◁' },
  { id: 'wipe-right', name: 'Wipe →', duration: 0.4, icon: '▷' },
  { id: 'slide-left', name: 'Slide ←', duration: 0.5, icon: '⬅' },
  { id: 'slide-right', name: 'Slide →', duration: 0.5, icon: '➡' },
  { id: 'zoom-in', name: 'Zoom In', duration: 0.5, icon: '🔍' },
  { id: 'zoom-out', name: 'Zoom Out', duration: 0.5, icon: '🔎' },
  { id: 'spin', name: 'Spin', duration: 0.6, icon: '🔄' },
  { id: 'flash', name: 'Flash', duration: 0.3, icon: '⚡' },
  { id: 'glitch', name: 'Glitch', duration: 0.4, icon: '📺' },
];

// ─── Mock music tracks ────────────────────────────────────────────────────
export const MOCK_MUSIC_TRACKS = [
  { id: 'm1', name: 'Upbeat Groove', artist: 'CNG Music', duration: 180, category: 'Trending' },
  { id: 'm2', name: 'Chill Vibes', artist: 'CNG Music', duration: 210, category: 'Trending' },
  { id: 'm3', name: 'Epic Cinematic', artist: 'CNG Music', duration: 240, category: 'Cinematic' },
  { id: 'm4', name: 'Lo-Fi Study', artist: 'CNG Music', duration: 195, category: 'Lo-Fi' },
  { id: 'm5', name: 'Pop Energy', artist: 'CNG Music', duration: 165, category: 'Pop' },
  { id: 'm6', name: 'Hip Hop Beat', artist: 'CNG Music', duration: 200, category: 'Hip Hop' },
  { id: 'm7', name: 'Acoustic Guitar', artist: 'CNG Music', duration: 185, category: 'Acoustic' },
  { id: 'm8', name: 'Dance Floor', artist: 'CNG Music', duration: 220, category: 'Electronic' },
];

// ─── Mock sound effects ───────────────────────────────────────────────────
export const MOCK_SOUND_EFFECTS = [
  { id: 'se1', name: 'Whoosh', duration: 0.5, icon: '💨' },
  { id: 'se2', name: 'Pop', duration: 0.3, icon: '🫧' },
  { id: 'se3', name: 'Ding', duration: 0.4, icon: '🔔' },
  { id: 'se4', name: 'Boom', duration: 0.8, icon: '💥' },
  { id: 'se5', name: 'Click', duration: 0.2, icon: '👆' },
  { id: 'se6', name: 'Swoosh', duration: 0.6, icon: '🌬' },
];

// ─── Mock fonts ──────────────────────────────────────────────────────────
export const MOCK_FONTS = [
  { id: 'default', name: 'Default', fontFamily: undefined },
  { id: 'bold', name: 'Bold', fontFamily: undefined },
  { id: 'mono', name: 'Mono', fontFamily: 'monospace' },
  { id: 'serif', name: 'Serif', fontFamily: 'serif' },
];

// ─── Default blank project ────────────────────────────────────────────────
export function createBlankProject(id: string): EditorProject {
  return {
    id,
    name: 'New Project',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    aspectRatio: '9:16',
    clips: [],
    audioTracks: [],
    globalAdjustments: {
      brightness: 0,
      contrast: 0,
      saturation: 0,
      sharpness: 0,
      vignette: 0,
      fade: 0,
      temperature: 0,
      tint: 0,
      highlight: 0,
      shadow: 0,
    },
  };
}

// ─── Fake clip builder ────────────────────────────────────────────────────
export function buildClipFromAsset(
  asset: import('../types').MediaAsset,
): Clip {
  const duration = asset.duration ?? 5;
  return {
    id: `clip_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    asset,
    startTime: 0,
    endTime: duration,
    timelineStart: 0,
    speed: 1,
    opacity: 1,
    volume: 1,
    transform: {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      flipX: false,
      flipY: false,
    },
    textLayers: [],
    stickerLayers: [],
  };
}

// ─── Fake audio track builder ─────────────────────────────────────────────
export function buildAudioTrack(
  asset: import('../types').MediaAsset,
  start = 0,
): AudioTrack {
  return {
    id: `audio_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    asset,
    timelineStart: start,
    timelineEnd: start + (asset.duration ?? 10),
    volume: 1,
    fadeIn: 0,
    fadeOut: 0,
  };
}

// ─── Fake export simulation ───────────────────────────────────────────────
export function simulateExport(
  onProgress: (pct: number) => void,
): Promise<string> {
  return new Promise((resolve) => {
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 8 + 2;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        onProgress(100);
        setTimeout(() => resolve('file:///exports/output.mp4'), 200);
      } else {
        onProgress(Math.round(pct));
      }
    }, 150);
  });
}

// ─── Unique ID generator ──────────────────────────────────────────────────
export function uid(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
