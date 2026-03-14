import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import type { Clip } from '../../types';

const PIXELS_PER_SECOND = 40;
const TRACK_HEIGHT = 56;

export function Timeline(): React.JSX.Element {
  const { state, selectClip, theme, totalDuration } = useEditor();
  const { clips, audioTracks } = state.project;
  const { currentTime } = state;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Playhead */}
      <View
        style={[
          styles.playheadLine,
          { left: currentTime * PIXELS_PER_SECOND, backgroundColor: theme.accent },
        ]}
        pointerEvents="none"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingRight: 120 },
        ]}
      >
        {/* Video / Image track */}
        <View style={styles.track}>
          {state.project.clips.length === 0 ? (
            <View
              style={[
                styles.emptyTrack,
                { borderColor: theme.border, backgroundColor: theme.surface },
              ]}
            >
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                ＋ Add media
              </Text>
            </View>
          ) : (
            state.project.clips.map((clip) => (
              <ClipBlock
                key={clip.id}
                clip={clip}
                isSelected={state.selectedClipId === clip.id}
                onPress={() =>
                  selectClip(state.selectedClipId === clip.id ? null : clip.id)
                }
              />
            ))
          )}
        </View>

        {/* Audio tracks */}
        {state.project.audioTracks.map((track) => {
          const dur = track.timelineEnd - track.timelineStart;
          const w = Math.max(dur * PIXELS_PER_SECOND, 60);
          return (
            <View key={track.id} style={[styles.audioTrack]}>
              <View
                style={[
                  styles.audioBlock,
                  {
                    width: w,
                    left: track.timelineStart * PIXELS_PER_SECOND,
                    backgroundColor: '#1C3B2F',
                    borderColor: '#2ECC71',
                  },
                ]}
              >
                <Text style={styles.audioLabel} numberOfLines={1}>
                  🎵 {track.asset.name}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

interface ClipBlockProps {
  clip: Clip;
  isSelected: boolean;
  onPress: () => void;
}

function ClipBlock({ clip, isSelected, onPress }: ClipBlockProps): React.JSX.Element {
  const { theme } = useEditor();
  const dur = (clip.endTime - clip.startTime) / clip.speed;
  const w = Math.max(dur * PIXELS_PER_SECOND, 30);

  const isImage = clip.asset.type === 'image';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.clip,
        {
          width: w,
          borderColor: isSelected ? theme.accent : theme.border,
          backgroundColor: isImage ? '#1A1A3E' : '#1A3A1A',
        },
      ]}
    >
      {clip.asset.thumbnailUri ? (
        <Image
          source={{ uri: clip.asset.thumbnailUri }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.noThumb, { backgroundColor: isImage ? '#2A2A5E' : '#2A4A2A' }]}>
          <Text style={styles.noThumbIcon}>{isImage ? '🖼' : '🎬'}</Text>
        </View>
      )}
      <Text style={[styles.clipLabel, { color: theme.text }]} numberOfLines={1}>
        {clip.asset.name}
      </Text>
      {clip.speed !== 1 && (
        <Text style={[styles.speedBadge, { color: theme.accent }]}>
          {clip.speed}×
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: TRACK_HEIGHT + 40,
    position: 'relative',
  },
  playheadLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    zIndex: 10,
  },
  scrollContent: {
    paddingVertical: 8,
    paddingLeft: 8,
    flexDirection: 'column',
    gap: 4,
  },
  track: {
    flexDirection: 'row',
    height: TRACK_HEIGHT,
    gap: 2,
  },
  audioTrack: {
    height: 28,
    position: 'relative',
  },
  audioBlock: {
    position: 'absolute',
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  audioLabel: {
    color: '#2ECC71',
    fontSize: 10,
  },
  emptyTrack: {
    width: 120,
    height: TRACK_HEIGHT,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 12,
  },
  clip: {
    height: TRACK_HEIGHT,
    borderWidth: 2,
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 4,
  },
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  noThumb: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noThumbIcon: { fontSize: 20 },
  clipLabel: {
    fontSize: 9,
    fontWeight: '600',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  speedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    fontSize: 9,
    fontWeight: '700',
  },
});
