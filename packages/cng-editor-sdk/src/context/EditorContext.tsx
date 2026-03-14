import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from 'react';
import type {
  ActiveTool,
  Adjustments,
  AspectRatio,
  AudioTrack,
  Clip,
  EditorConfig,
  EditorProject,
  EditorTheme,
  ExportOptions,
  ExportProgress,
  Filter,
  StickerLayer,
  TextLayer,
  Transition,
} from '../types';
import { DEFAULT_THEME } from '../utils/theme';
import {
  buildAudioTrack,
  buildClipFromAsset,
  createBlankProject,
  simulateExport,
  uid,
} from '../utils/mockData';

// ─────────────────────────────────────────────────────────────────────────────
//  State shape
// ─────────────────────────────────────────────────────────────────────────────

export interface EditorState {
  project: EditorProject;
  selectedClipId: string | null;
  selectedAudioTrackId: string | null;
  activeTool: ActiveTool;
  isPlaying: boolean;
  currentTime: number;
  exportProgress: ExportProgress;
  undoStack: EditorProject[];
  redoStack: EditorProject[];
  theme: EditorTheme;
  config: EditorConfig;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Actions
// ─────────────────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_PROJECT'; payload: EditorProject }
  | { type: 'ADD_CLIP'; payload: Clip }
  | { type: 'REMOVE_CLIP'; payload: string }
  | { type: 'UPDATE_CLIP'; payload: Partial<Clip> & { id: string } }
  | { type: 'REORDER_CLIPS'; payload: Clip[] }
  | { type: 'ADD_AUDIO_TRACK'; payload: AudioTrack }
  | { type: 'REMOVE_AUDIO_TRACK'; payload: string }
  | { type: 'UPDATE_AUDIO_TRACK'; payload: Partial<AudioTrack> & { id: string } }
  | { type: 'SET_SELECTED_CLIP'; payload: string | null }
  | { type: 'SET_SELECTED_AUDIO'; payload: string | null }
  | { type: 'SET_ACTIVE_TOOL'; payload: ActiveTool }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_ASPECT_RATIO'; payload: AspectRatio }
  | { type: 'APPLY_FILTER'; payload: { clipId: string; filter: Filter } }
  | { type: 'SET_GLOBAL_ADJUSTMENTS'; payload: Partial<Adjustments> }
  | { type: 'SET_CLIP_TRANSITION'; payload: { clipId: string; transition: Transition } }
  | { type: 'ADD_TEXT_LAYER'; payload: { clipId: string; layer: TextLayer } }
  | { type: 'UPDATE_TEXT_LAYER'; payload: { clipId: string; layer: Partial<TextLayer> & { id: string } } }
  | { type: 'REMOVE_TEXT_LAYER'; payload: { clipId: string; layerId: string } }
  | { type: 'ADD_STICKER_LAYER'; payload: { clipId: string; layer: StickerLayer } }
  | { type: 'REMOVE_STICKER_LAYER'; payload: { clipId: string; layerId: string } }
  | { type: 'SET_EXPORT_PROGRESS'; payload: ExportProgress }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'PUSH_UNDO' };

// ─────────────────────────────────────────────────────────────────────────────
//  Reducer
// ─────────────────────────────────────────────────────────────────────────────

function updateClipInList(clips: Clip[], id: string, patch: Partial<Clip>): Clip[] {
  return clips.map((c) => (c.id === id ? { ...c, ...patch } : c));
}

function reducer(state: EditorState, action: Action): EditorState {
  switch (action.type) {
    case 'SET_PROJECT':
      return { ...state, project: action.payload };

    case 'ADD_CLIP': {
      const updatedClips = [...state.project.clips];
      // Compute correct timeline start
      const totalDuration = updatedClips.reduce(
        (acc, c) => acc + (c.endTime - c.startTime) / c.speed,
        0,
      );
      const clip = { ...action.payload, timelineStart: totalDuration };
      return {
        ...state,
        project: { ...state.project, clips: [...updatedClips, clip] },
      };
    }

    case 'REMOVE_CLIP':
      return {
        ...state,
        project: {
          ...state.project,
          clips: state.project.clips.filter((c) => c.id !== action.payload),
        },
        selectedClipId:
          state.selectedClipId === action.payload ? null : state.selectedClipId,
      };

    case 'UPDATE_CLIP':
      return {
        ...state,
        project: {
          ...state.project,
          clips: updateClipInList(state.project.clips, action.payload.id, action.payload),
        },
      };

    case 'REORDER_CLIPS':
      return {
        ...state,
        project: { ...state.project, clips: action.payload },
      };

    case 'ADD_AUDIO_TRACK':
      return {
        ...state,
        project: {
          ...state.project,
          audioTracks: [...state.project.audioTracks, action.payload],
        },
      };

    case 'REMOVE_AUDIO_TRACK':
      return {
        ...state,
        project: {
          ...state.project,
          audioTracks: state.project.audioTracks.filter(
            (t) => t.id !== action.payload,
          ),
        },
      };

    case 'UPDATE_AUDIO_TRACK':
      return {
        ...state,
        project: {
          ...state.project,
          audioTracks: state.project.audioTracks.map((t) =>
            t.id === action.payload.id ? { ...t, ...action.payload } : t,
          ),
        },
      };

    case 'SET_SELECTED_CLIP':
      return { ...state, selectedClipId: action.payload };

    case 'SET_SELECTED_AUDIO':
      return { ...state, selectedAudioTrackId: action.payload };

    case 'SET_ACTIVE_TOOL':
      return { ...state, activeTool: action.payload };

    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };

    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };

    case 'SET_ASPECT_RATIO':
      return {
        ...state,
        project: { ...state.project, aspectRatio: action.payload },
      };

    case 'APPLY_FILTER':
      return {
        ...state,
        project: {
          ...state.project,
          clips: updateClipInList(state.project.clips, action.payload.clipId, {
            filterId: action.payload.filter.id,
          }),
        },
      };

    case 'SET_GLOBAL_ADJUSTMENTS':
      return {
        ...state,
        project: {
          ...state.project,
          globalAdjustments: {
            ...state.project.globalAdjustments,
            ...action.payload,
          },
        },
      };

    case 'SET_CLIP_TRANSITION':
      return {
        ...state,
        project: {
          ...state.project,
          clips: updateClipInList(state.project.clips, action.payload.clipId, {
            transition: action.payload.transition,
          }),
        },
      };

    case 'ADD_TEXT_LAYER':
      return {
        ...state,
        project: {
          ...state.project,
          clips: updateClipInList(
            state.project.clips,
            action.payload.clipId,
            {
              textLayers: [
                ...(state.project.clips.find((c) => c.id === action.payload.clipId)
                  ?.textLayers ?? []),
                action.payload.layer,
              ],
            },
          ),
        },
      };

    case 'UPDATE_TEXT_LAYER':
      return {
        ...state,
        project: {
          ...state.project,
          clips: state.project.clips.map((c) =>
            c.id === action.payload.clipId
              ? {
                  ...c,
                  textLayers: c.textLayers.map((l) =>
                    l.id === action.payload.layer.id
                      ? { ...l, ...action.payload.layer }
                      : l,
                  ),
                }
              : c,
          ),
        },
      };

    case 'REMOVE_TEXT_LAYER':
      return {
        ...state,
        project: {
          ...state.project,
          clips: state.project.clips.map((c) =>
            c.id === action.payload.clipId
              ? {
                  ...c,
                  textLayers: c.textLayers.filter(
                    (l) => l.id !== action.payload.layerId,
                  ),
                }
              : c,
          ),
        },
      };

    case 'ADD_STICKER_LAYER':
      return {
        ...state,
        project: {
          ...state.project,
          clips: updateClipInList(
            state.project.clips,
            action.payload.clipId,
            {
              stickerLayers: [
                ...(state.project.clips.find((c) => c.id === action.payload.clipId)
                  ?.stickerLayers ?? []),
                action.payload.layer,
              ],
            },
          ),
        },
      };

    case 'REMOVE_STICKER_LAYER':
      return {
        ...state,
        project: {
          ...state.project,
          clips: state.project.clips.map((c) =>
            c.id === action.payload.clipId
              ? {
                  ...c,
                  stickerLayers: c.stickerLayers.filter(
                    (l) => l.id !== action.payload.layerId,
                  ),
                }
              : c,
          ),
        },
      };

    case 'SET_EXPORT_PROGRESS':
      return { ...state, exportProgress: action.payload };

    case 'PUSH_UNDO':
      return {
        ...state,
        undoStack: [...state.undoStack.slice(-19), state.project],
        redoStack: [],
      };

    case 'UNDO': {
      if (state.undoStack.length === 0) return state;
      const prev = state.undoStack[state.undoStack.length - 1];
      return {
        ...state,
        project: prev,
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [state.project, ...state.redoStack.slice(0, 19)],
      };
    }

    case 'REDO': {
      if (state.redoStack.length === 0) return state;
      const next = state.redoStack[0];
      return {
        ...state,
        project: next,
        undoStack: [...state.undoStack, state.project],
        redoStack: state.redoStack.slice(1),
      };
    }

    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Context value shape
// ─────────────────────────────────────────────────────────────────────────────

export interface EditorContextValue {
  state: EditorState;
  // clips
  addMediaAsset: (asset: import('../types').MediaAsset) => void;
  removeClip: (clipId: string) => void;
  updateClip: (id: string, patch: Partial<Clip>) => void;
  selectClip: (clipId: string | null) => void;
  selectedClip: Clip | null;
  // audio
  addAudioAsset: (asset: import('../types').MediaAsset) => void;
  removeAudioTrack: (trackId: string) => void;
  updateAudioTrack: (id: string, patch: Partial<AudioTrack>) => void;
  // tools
  setActiveTool: (tool: ActiveTool) => void;
  closeTool: () => void;
  // playback
  togglePlay: () => void;
  seekTo: (t: number) => void;
  // filters
  applyFilter: (clipId: string, filter: Filter) => void;
  // adjustments
  setAdjustments: (adj: Partial<Adjustments>) => void;
  // transitions
  setTransition: (clipId: string, transition: Transition) => void;
  // text layers
  addTextLayer: (clipId: string, layer: TextLayer) => void;
  updateTextLayer: (clipId: string, layer: Partial<TextLayer> & { id: string }) => void;
  removeTextLayer: (clipId: string, layerId: string) => void;
  // sticker layers
  addStickerLayer: (clipId: string, layer: StickerLayer) => void;
  removeStickerLayer: (clipId: string, layerId: string) => void;
  // aspect ratio
  setAspectRatio: (ratio: AspectRatio) => void;
  // export
  startExport: (options: ExportOptions) => Promise<void>;
  // undo / redo
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  // computed
  totalDuration: number;
  theme: EditorTheme;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────────────────────────────────────

export const EditorContext = createContext<EditorContextValue | null>(null);

// ─────────────────────────────────────────────────────────────────────────────
//  Provider
// ─────────────────────────────────────────────────────────────────────────────

interface EditorProviderProps {
  children: React.ReactNode;
  config?: EditorConfig;
  initialProject?: EditorProject;
}

export function EditorProvider({
  children,
  config = {},
  initialProject,
}: EditorProviderProps): React.JSX.Element {
  const theme: EditorTheme = { ...DEFAULT_THEME, ...(config.theme ?? {}) };

  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    project: initialProject ?? createBlankProject(uid()),
    selectedClipId: null,
    selectedAudioTrackId: null,
    activeTool: null,
    isPlaying: false,
    currentTime: 0,
    exportProgress: { status: 'idle', progress: 0 },
    undoStack: [],
    redoStack: [],
    theme,
    config,
  } satisfies EditorState));

  // playback ticker ref
  const playbackRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pushUndo = useCallback(() => dispatch({ type: 'PUSH_UNDO' }), []);

  // ── Clip actions ─────────────────────────────────────────────────────────
  const addMediaAsset = useCallback(
    (asset: import('../types').MediaAsset) => {
      pushUndo();
      dispatch({ type: 'ADD_CLIP', payload: buildClipFromAsset(asset) });
    },
    [pushUndo],
  );

  const removeClip = useCallback(
    (clipId: string) => {
      pushUndo();
      dispatch({ type: 'REMOVE_CLIP', payload: clipId });
    },
    [pushUndo],
  );

  const updateClip = useCallback(
    (id: string, patch: Partial<Clip>) => {
      dispatch({ type: 'UPDATE_CLIP', payload: { ...patch, id } });
    },
    [],
  );

  const selectClip = useCallback((clipId: string | null) => {
    dispatch({ type: 'SET_SELECTED_CLIP', payload: clipId });
  }, []);

  const selectedClip =
    state.project.clips.find((c) => c.id === state.selectedClipId) ?? null;

  // ── Audio actions ─────────────────────────────────────────────────────────
  const addAudioAsset = useCallback(
    (asset: import('../types').MediaAsset) => {
      pushUndo();
      dispatch({ type: 'ADD_AUDIO_TRACK', payload: buildAudioTrack(asset) });
    },
    [pushUndo],
  );

  const removeAudioTrack = useCallback(
    (trackId: string) => {
      pushUndo();
      dispatch({ type: 'REMOVE_AUDIO_TRACK', payload: trackId });
    },
    [pushUndo],
  );

  const updateAudioTrack = useCallback(
    (id: string, patch: Partial<AudioTrack>) => {
      dispatch({ type: 'UPDATE_AUDIO_TRACK', payload: { ...patch, id } });
    },
    [],
  );

  // ── Tool actions ──────────────────────────────────────────────────────────
  const setActiveTool = useCallback((tool: ActiveTool) => {
    dispatch({ type: 'SET_ACTIVE_TOOL', payload: tool });
  }, []);

  const closeTool = useCallback(() => {
    dispatch({ type: 'SET_ACTIVE_TOOL', payload: null });
  }, []);

  // ── Playback ──────────────────────────────────────────────────────────────
  const totalDuration = state.project.clips.reduce(
    (acc, c) => acc + (c.endTime - c.startTime) / c.speed,
    0,
  );

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      if (playbackRef.current) clearInterval(playbackRef.current);
      playbackRef.current = null;
      dispatch({ type: 'SET_PLAYING', payload: false });
    } else {
      dispatch({ type: 'SET_PLAYING', payload: true });
      // Ref-based ticker to avoid stale closures
      let t = state.currentTime;
      const dur = totalDuration || 10;
      playbackRef.current = setInterval(() => {
        t += 0.05;
        if (t >= dur) {
          t = 0;
          if (playbackRef.current) clearInterval(playbackRef.current);
          playbackRef.current = null;
          dispatch({ type: 'SET_PLAYING', payload: false });
        }
        dispatch({ type: 'SET_CURRENT_TIME', payload: t });
      }, 50);
    }
  }, [state.isPlaying, state.currentTime, totalDuration]);

  const seekTo = useCallback((t: number) => {
    dispatch({ type: 'SET_CURRENT_TIME', payload: t });
  }, []);

  // ── Filters ───────────────────────────────────────────────────────────────
  const applyFilter = useCallback(
    (clipId: string, filter: Filter) => {
      dispatch({ type: 'APPLY_FILTER', payload: { clipId, filter } });
    },
    [],
  );

  // ── Adjustments ───────────────────────────────────────────────────────────
  const setAdjustments = useCallback((adj: Partial<Adjustments>) => {
    dispatch({ type: 'SET_GLOBAL_ADJUSTMENTS', payload: adj });
  }, []);

  // ── Transitions ───────────────────────────────────────────────────────────
  const setTransition = useCallback(
    (clipId: string, transition: Transition) => {
      dispatch({ type: 'SET_CLIP_TRANSITION', payload: { clipId, transition } });
    },
    [],
  );

  // ── Text layers ───────────────────────────────────────────────────────────
  const addTextLayer = useCallback((clipId: string, layer: TextLayer) => {
    pushUndo();
    dispatch({ type: 'ADD_TEXT_LAYER', payload: { clipId, layer } });
  }, [pushUndo]);

  const updateTextLayer = useCallback(
    (clipId: string, layer: Partial<TextLayer> & { id: string }) => {
      dispatch({ type: 'UPDATE_TEXT_LAYER', payload: { clipId, layer } });
    },
    [],
  );

  const removeTextLayer = useCallback(
    (clipId: string, layerId: string) => {
      dispatch({ type: 'REMOVE_TEXT_LAYER', payload: { clipId, layerId } });
    },
    [],
  );

  // ── Sticker layers ────────────────────────────────────────────────────────
  const addStickerLayer = useCallback(
    (clipId: string, layer: StickerLayer) => {
      pushUndo();
      dispatch({ type: 'ADD_STICKER_LAYER', payload: { clipId, layer } });
    },
    [pushUndo],
  );

  const removeStickerLayer = useCallback(
    (clipId: string, layerId: string) => {
      dispatch({ type: 'REMOVE_STICKER_LAYER', payload: { clipId, layerId } });
    },
    [],
  );

  // ── Aspect ratio ──────────────────────────────────────────────────────────
  const setAspectRatio = useCallback((ratio: AspectRatio) => {
    dispatch({ type: 'SET_ASPECT_RATIO', payload: ratio });
  }, []);

  // ── Export ────────────────────────────────────────────────────────────────
  const startExport = useCallback(
    async (options: ExportOptions): Promise<void> => {
      dispatch({
        type: 'SET_EXPORT_PROGRESS',
        payload: { status: 'processing', progress: 0 },
      });
      try {
        const outputUri = await simulateExport((pct) => {
          dispatch({
            type: 'SET_EXPORT_PROGRESS',
            payload: { status: 'processing', progress: pct },
          });
        });
        dispatch({
          type: 'SET_EXPORT_PROGRESS',
          payload: { status: 'done', progress: 100, outputUri },
        });
        config.onExportComplete?.(outputUri);
      } catch (e) {
        dispatch({
          type: 'SET_EXPORT_PROGRESS',
          payload: { status: 'error', progress: 0, error: String(e) },
        });
      }
    },
    [config],
  );

  // ── Undo / redo ───────────────────────────────────────────────────────────
  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), []);

  const value: EditorContextValue = {
    state,
    addMediaAsset,
    removeClip,
    updateClip,
    selectClip,
    selectedClip,
    addAudioAsset,
    removeAudioTrack,
    updateAudioTrack,
    setActiveTool,
    closeTool,
    togglePlay,
    seekTo,
    applyFilter,
    setAdjustments,
    setTransition,
    addTextLayer,
    updateTextLayer,
    removeTextLayer,
    addStickerLayer,
    removeStickerLayer,
    setAspectRatio,
    startExport,
    undo,
    redo,
    canUndo: state.undoStack.length > 0,
    canRedo: state.redoStack.length > 0,
    totalDuration,
    theme,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useEditor(): EditorContextValue {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    throw new Error('useEditor must be used inside <EditorProvider>');
  }
  return ctx;
}
