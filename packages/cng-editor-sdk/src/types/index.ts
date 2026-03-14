// ─────────────────────────────────────────────
//  Core media types
// ─────────────────────────────────────────────

export type MediaType = 'video' | 'image' | 'audio';

export interface MediaAsset {
  id: string;
  uri: string;
  type: MediaType;
  /** Duration in seconds (video/audio only) */
  duration?: number;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Display name / filename */
  name: string;
  /** Thumbnail URI */
  thumbnailUri?: string;
  /** File size in bytes */
  size?: number;
}

// ─────────────────────────────────────────────
//  Timeline / Clip types
// ─────────────────────────────────────────────

export interface Clip {
  id: string;
  asset: MediaAsset;
  /** Start offset inside the original asset (seconds) */
  startTime: number;
  /** End offset inside the original asset (seconds) */
  endTime: number;
  /** Position on the timeline (seconds from beginning) */
  timelineStart: number;
  /** Playback speed multiplier (0.25 – 4.0) */
  speed: number;
  /** Opacity 0–1 */
  opacity: number;
  /** Volume 0–1 (video clips with embedded audio) */
  volume: number;
  /** Applied filter id, if any */
  filterId?: string;
  /** Transform */
  transform: ClipTransform;
  /** Text overlays on this clip */
  textLayers: TextLayer[];
  /** Sticker overlays on this clip */
  stickerLayers: StickerLayer[];
  /** Transition after this clip */
  transition?: Transition;
}

export interface ClipTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  cropRect?: CropRect;
}

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

// ─────────────────────────────────────────────
//  Audio types
// ─────────────────────────────────────────────

export interface AudioTrack {
  id: string;
  asset: MediaAsset;
  timelineStart: number;
  timelineEnd: number;
  volume: number;
  fadeIn: number;
  fadeOut: number;
}

export type AudioTrackType = 'music' | 'voiceover' | 'sound-effect';

// ─────────────────────────────────────────────
//  Text overlay types
// ─────────────────────────────────────────────

export interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string | undefined;
  color: string;
  backgroundColor?: string;
  bold: boolean;
  italic: boolean;
  alignment: 'left' | 'center' | 'right';
  animationIn?: TextAnimation;
  animationOut?: TextAnimation;
  startTime?: number;
  endTime?: number;
}

export type TextAnimation =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'bounce'
  | 'typewriter'
  | 'zoom';

// ─────────────────────────────────────────────
//  Sticker types
// ─────────────────────────────────────────────

export interface StickerLayer {
  id: string;
  stickerId: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  startTime?: number;
  endTime?: number;
}

export interface StickerItem {
  id: string;
  name: string;
  /** Emoji or URI */
  source: string;
  category: string;
}

// ─────────────────────────────────────────────
//  Filter types
// ─────────────────────────────────────────────

export interface Filter {
  id: string;
  name: string;
  /** Preview tint color (used as a visual stand-in for the real LUT) */
  previewColor: string;
  /** Intensity range 0–1 */
  intensity: number;
}

// ─────────────────────────────────────────────
//  Transition types
// ─────────────────────────────────────────────

export interface Transition {
  id: string;
  name: string;
  duration: number;
  icon: string;
}

// ─────────────────────────────────────────────
//  Adjustment types
// ─────────────────────────────────────────────

export interface Adjustments {
  brightness: number;   // -1 to 1
  contrast: number;     // -1 to 1
  saturation: number;   // -1 to 1
  sharpness: number;    // 0 to 1
  vignette: number;     // 0 to 1
  fade: number;         // 0 to 1
  temperature: number;  // -1 to 1
  tint: number;         // -1 to 1
  highlight: number;    // -1 to 1
  shadow: number;       // -1 to 1
}

// ─────────────────────────────────────────────
//  Project / Editor state types
// ─────────────────────────────────────────────

export interface EditorProject {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  /** Canvas aspect ratio e.g. "9:16" | "16:9" | "1:1" | "4:3" */
  aspectRatio: AspectRatio;
  clips: Clip[];
  audioTracks: AudioTrack[];
  globalAdjustments: Adjustments;
}

export type AspectRatio = '9:16' | '16:9' | '1:1' | '4:3' | '3:4';

export type ActiveTool =
  | null
  | 'trim'
  | 'split'
  | 'speed'
  | 'filters'
  | 'adjust'
  | 'text'
  | 'stickers'
  | 'audio'
  | 'transitions'
  | 'export'
  | 'media-picker';

// ─────────────────────────────────────────────
//  Export types
// ─────────────────────────────────────────────

export type ExportQuality = '480p' | '720p' | '1080p' | '4K';
export type ExportFormat = 'mp4' | 'mov' | 'gif';

export interface ExportOptions {
  quality: ExportQuality;
  format: ExportFormat;
  frameRate: 24 | 30 | 60;
  includeAudio: boolean;
}

export interface ExportProgress {
  status: 'idle' | 'processing' | 'done' | 'error';
  progress: number; // 0–100
  outputUri?: string;
  error?: string;
}

// ─────────────────────────────────────────────
//  SDK config type
// ─────────────────────────────────────────────

export interface EditorConfig {
  /** Theme override */
  theme?: Partial<EditorTheme>;
  /** Whether to show a watermark on export */
  showWatermark?: boolean;
  /** Maximum video duration the user can import (seconds). 0 = unlimited */
  maxDuration?: number;
  /** Supported aspect ratios */
  aspectRatios?: AspectRatio[];
  /** Called when the user taps the back / close button */
  onClose?: () => void;
  /** Called when export is complete */
  onExportComplete?: (outputUri: string) => void;
}

export interface EditorTheme {
  background: string;
  surface: string;
  surfaceAlt: string;
  accent: string;
  text: string;
  textSecondary: string;
  border: string;
  danger: string;
  success: string;
}
