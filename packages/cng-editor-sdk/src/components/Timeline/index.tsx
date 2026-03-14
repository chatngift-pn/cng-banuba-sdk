import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { Waveform } from './Waveform';
import type { Clip } from '../../types';

const ImageComponent = () => null; // Placeholder for Image component from react-native

const PIXELS_PER_SECOND = 40;
const TRACK_HEIGHT = 56;

export function Timeline(): React.JSX.Element {
  const { state, selectClip, theme, totalDuration } = useEditor();
  const { clips, audioTracks } = state.project;
  const { currentTime } = state;
  const screenWidth = Dimensions.get('window').width;
  const scrollViewRef = useRef<ScrollView>(null);

  const timelineWidth = Math.max(totalDuration * PIXELS_PER_SECOND + 100, screenWidth);
  const playheadPosition = currentTime * PIXELS_PER_SECOND;

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Timeline Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.timeText, { color: theme.text }]}>
          {formatTime(currentTime)}
        </Text>
        <View style={styles.timeRange}>
          <Text style={[styles.rangeText, { color: theme.textSecondary }]}>
            {formatTime(totalDuration)}
          </Text>
        </View>
      </View>

      {/* Main Timeline Scroll */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={true}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { width: timelineWidth }]}
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
                theme={theme}
              />
            ))
          )}
        </View>

        {/* Audio tracks */}
        {state.project.audioTracks.map((track, index) => {
          const dur = track.timelineEnd - track.timelineStart;
          const w = Math.max(dur * PIXELS_PER_SECOND, 60);
          return (
            <View key={track.id} style={[styles.audioTrack]}>
              <Text style={[styles.audioTrackLabel, { color: theme.text }]}>
                Audio {index + 1}
              </Text>
              <View
                style={[
                  styles.audioBlock,
                  {
                    width: w,
                    left: track.timelineStart * PIXELS_PER_SECOND,
                    backgroundColor: theme.accent || '#1E88E5',
                    borderColor: theme.accent || '#1E88E5',
                  },
                ]}
              >
                <Waveform
                  duration={dur}
                  height={24}
                  barWidth={2}
                  barGap={0.5}
                  color="#FFFFFF"
                  backgroundColor="rgba(255, 255, 255, 0.2)"
                  theme={theme}
                />
              </View>
            </View>
          );
        })}

        {/* Playhead */}
        <View
          style={[
            styles.playheadLine,
            { left: playheadPosition, backgroundColor: theme.accent },
          ]}
          pointerEvents="none"
        />
      </ScrollView>
    </View>
  );
}

interface ClipBlockProps {
  clip: Clip;
  isSelected: boolean;
  onPress: () => void;
  theme?: any;
}

function ClipBlock({ clip, isSelected, onPress, theme }: ClipBlockProps): React.JSX.Element {
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
          borderWidth: isSelected ? 2 : 1,
        },
      ]}
    >
      {clip.asset.thumbnailUri && (
        <View style={StyleSheet.absoluteFill}>
          {/* Thumbnail would be rendered here */}
          <View style={[styles.thumbnail, { backgroundColor: isImage ? '#2A2A5E' : '#2A4A2A', opacity: 0.6 }]} />
        </View>
      )}
      <View style={styles.noThumb}>
        <Text style={styles.noThumbIcon}>{isImage ? '🖼' : '🎬'}</Text>
      </View>
      <Text style={[styles.clipLabel, { color: theme.text || '#FFF' }]} numberOfLines={1}>
        {clip.asset.name}
      </Text>
      {clip.speed !== 1 && (
        <Text style={[styles.speedBadge, { color: theme.accent || '#1E88E5' }]}>
          {clip.speed.toFixed(2)}×
        </Text>
      )}
      {clip.transition && (
        <Text style={styles.transitionBadge}>⇄</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: TRACK_HEIGHT + 80,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    gap: 8,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  timeRange: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rangeText: {
    fontSize: 12,
  },
  playheadLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 3,
    zIndex: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.3)',
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
    marginBottom: 8,
  },
  audioTrack: {
    height: 48,
    position: 'relative',
    marginBottom: 8,
  },
  audioTrackLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  audioBlock: {
    position: 'absolute',
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 6,
    overflow: 'hidden',
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
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 4,
  },
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
  },
  noThumb: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noThumbIcon: {
    fontSize: 20,
  },
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 2,
  },
  transitionBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 2,
    color: '#fff',
  },
});
