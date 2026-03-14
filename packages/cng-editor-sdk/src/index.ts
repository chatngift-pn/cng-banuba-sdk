/**
 * cng-editor-sdk
 * CapCut-inspired video/photo/audio editor SDK for React Native
 *
 * @packageDocumentation
 */

// ─── Components ───────────────────────────────────────────────────────────────
export { EditorScreen, EditorModal } from './components/EditorScreen';
export type { EditorScreenProps, EditorModalProps } from './components/EditorScreen';

// Multi-step creation flow
export { CreationFlow } from './components/CreationFlow';
export type { CreationFlowProps } from './components/CreationFlow';

// Camera
export { CameraScreen } from './components/CameraScreen';
export type { CameraScreenProps } from './components/CameraScreen';

// Save
export { SaveScreen } from './components/SaveScreen';
export type { SaveScreenProps } from './components/SaveScreen';

// Individual panels (for custom layouts)
export { Toolbar } from './components/Toolbar';
export { Timeline } from './components/Timeline';
export { FilterPanel } from './components/FilterPanel';
export { AdjustPanel } from './components/AdjustPanel';
export { TextEditor } from './components/TextEditor';
export { StickerPanel } from './components/StickerPanel';
export { TransitionPanel } from './components/TransitionPanel';
export { AudioPanel } from './components/AudioPanel';
export { ExportPanel } from './components/ExportPanel';
export { TrimPanel } from './components/TrimPanel';
export { SpeedPanel } from './components/SpeedPanel';
export { MediaPicker } from './components/MediaPicker';
export { EditorCanvas } from './components/EditorScreen/EditorCanvas';

// ─── Context / Hooks ──────────────────────────────────────────────────────────
export {
  EditorProvider,
  EditorContext,
  useEditor,
} from './context/EditorContext';
export type { EditorContextValue, EditorState } from './context/EditorContext';

// ─── i18n / Localization ──────────────────────────────────────────────────────
export {
  LocaleProvider,
  useLocale,
  LocaleContext,
  getStrings,
  getAvailableLocales,
  en,
  pt,
} from './i18n';
export type { Locale, LocaleStrings, LocaleProviderProps } from './i18n';

// ─── Types ────────────────────────────────────────────────────────────────────
export type {
  // Media
  MediaType,
  MediaAsset,
  // Timeline
  Clip,
  ClipTransform,
  CropRect,
  // Audio
  AudioTrack,
  AudioTrackType,
  // Text
  TextLayer,
  TextAnimation,
  // Stickers
  StickerLayer,
  StickerItem,
  // Filters
  Filter,
  // Transitions
  Transition,
  // Adjustments
  Adjustments,
  // Project
  EditorProject,
  AspectRatio,
  ActiveTool,
  // Creation flow
  CreationFlowStep,
  // Export
  ExportQuality,
  ExportFormat,
  ExportOptions,
  ExportProgress,
  // Config
  EditorConfig,
  EditorTheme,
} from './types';

// ─── Utilities ─────────────────────────────────────────────────────────────
export {
  MOCK_FILTERS,
  MOCK_STICKERS,
  MOCK_TRANSITIONS,
  MOCK_MUSIC_TRACKS,
  MOCK_SOUND_EFFECTS,
  createBlankProject,
  buildClipFromAsset,
  buildAudioTrack,
  simulateExport,
  uid,
} from './utils/mockData';

export { DEFAULT_THEME } from './utils/theme';
