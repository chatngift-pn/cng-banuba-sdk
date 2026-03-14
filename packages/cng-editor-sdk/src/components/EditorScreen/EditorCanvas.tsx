import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { CANVAS_ASPECT_RATIOS } from '../../utils/theme';

/**
 * EditorCanvas – the preview area at the top of the editor.
 * Renders a placeholder canvas with clip info. Real rendering
 * would use a native video/image view.
 */
export function EditorCanvas(): React.JSX.Element {
  const { state, theme, togglePlay, totalDuration } = useEditor();
  const { width } = useWindowDimensions();

  const ratio = CANVAS_ASPECT_RATIOS[state.project.aspectRatio] ?? (9 / 16);
  const canvasHeight = Math.min(width / ratio, 340);

  const selectedClip = state.project.clips.find(
    (c) => c.id === state.selectedClipId,
  );
  const activeClip = state.project.clips.find((c) => {
    const dur = (c.endTime - c.startTime) / c.speed;
    return (
      state.currentTime >= c.timelineStart &&
      state.currentTime < c.timelineStart + dur
    );
  }) ?? state.project.clips[0];

  return (
    <View
      style={[
        styles.canvas,
        {
          width,
          height: canvasHeight,
          backgroundColor: '#000',
        },
      ]}
    >
      {/* Background placeholder */}
      {activeClip ? (
        <View style={styles.previewInner}>
          <Text style={styles.previewIcon}>
            {activeClip.asset.type === 'video' ? '🎬' : '🖼'}
          </Text>
          <Text style={styles.previewName} numberOfLines={1}>
            {activeClip.asset.name}
          </Text>
          {activeClip.filterId && activeClip.filterId !== 'none' && (
            <Text style={styles.filterBadge}>✨ {activeClip.filterId}</Text>
          )}
          {/* Text layer overlays */}
          {activeClip.textLayers.map((layer) => (
            <Text
              key={layer.id}
              style={[
                styles.textOverlay,
                {
                  color: layer.color,
                  fontSize: layer.fontSize,
                  fontWeight: layer.bold ? '700' : '400',
                  fontStyle: layer.italic ? 'italic' : 'normal',
                  textAlign: layer.alignment,
                },
              ]}
            >
              {layer.text}
            </Text>
          ))}
          {/* Sticker overlays */}
          {activeClip.stickerLayers.map((layer) => (
            <Text
              key={layer.id}
              style={[
                styles.stickerOverlay,
                {
                  fontSize: 40 * layer.scale,
                  transform: [{ rotate: `${layer.rotation}deg` }],
                },
              ]}
            >
              {/* Display the sticker emoji from mock data */}
              😊
            </Text>
          ))}
        </View>
      ) : (
        <View style={styles.emptyCanvas}>
          <Text style={styles.emptyIcon}>🎬</Text>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Add media to get started
          </Text>
        </View>
      )}

      {/* Playback overlay */}
      <TouchableOpacity
        style={styles.playBtn}
        onPress={togglePlay}
        activeOpacity={0.8}
      >
        <View style={[styles.playBtnCircle, { backgroundColor: '#0007' }]}>
          <Text style={styles.playBtnIcon}>
            {state.isPlaying ? '⏸' : '▶'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Timecode */}
      <View style={styles.timecode}>
        <Text style={styles.timecodeText}>
          {formatTime(state.currentTime)} / {formatTime(totalDuration)}
        </Text>
      </View>
    </View>
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${ms}`;
}

const styles = StyleSheet.create({
  canvas: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  previewInner: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  previewIcon: { fontSize: 48 },
  previewName: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
  },
  filterBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: '#FFD700',
    fontSize: 11,
    backgroundColor: '#0006',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  textOverlay: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: '40%',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  stickerOverlay: {
    position: 'absolute',
  },
  emptyCanvas: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  emptyIcon: { fontSize: 48, opacity: 0.4 },
  emptyText: { fontSize: 13 },
  playBtn: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  playBtnCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtnIcon: { fontSize: 16, color: '#fff' },
  timecode: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#0007',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  timecodeText: { color: '#fff', fontSize: 11, fontFamily: 'monospace' },
});
