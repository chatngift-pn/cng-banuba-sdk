import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import type { Clip } from '../../types';

interface TimelineClipProps {
  clip: Clip;
  isSelected: boolean;
  onSelect: () => void;
  width: number;
  pxPerSecond: number;
  theme?: any;
}

export const TimelineClip: React.FC<TimelineClipProps> = ({
  clip,
  isSelected,
  onSelect,
  width,
  pxPerSecond,
  theme = {},
}) => {
  const clipDuration = clip.endTime - clip.startTime;
  const displayDuration = clipDuration / clip.speed;
  const clipWidth = displayDuration * pxPerSecond;

  return (
    <TouchableOpacity
      style={[
        styles.clipContainer,
        {
          width: Math.max(40, clipWidth),
          borderColor: isSelected ? theme.accent || '#1E88E5' : theme.border || '#E0E0E0',
          backgroundColor: theme.surface || '#F0F0F0',
        },
      ]}
      onPress={onSelect}
      activeOpacity={0.8}
    >
      {/* Thumbnail */}
      <View style={styles.thumbnail}>
        {clip.asset.thumbnailUri ? (
          <Image
            source={{ uri: clip.asset.thumbnailUri }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholderThumbnail, { backgroundColor: '#DDD' }]}>
            <Text style={styles.placeholderText}>
              {clip.asset.type === 'video' ? '🎬' : clip.asset.type === 'image' ? '🖼️' : '🔊'}
            </Text>
          </View>
        )}
      </View>

      {/* Overlay */}
      {isSelected && (
        <View
          style={[
            styles.selectedOverlay,
            {
              backgroundColor: 'rgba(30, 136, 229, 0.3)',
            },
          ]}
        />
      )}

      {/* Duration Label */}
      {clipWidth > 50 && (
        <View style={styles.durationLabel}>
          <Text style={styles.durationText}>
            {displayDuration.toFixed(1)}s
          </Text>
        </View>
      )}

      {/* Speed Indicator */}
      {clip.speed !== 1 && (
        <View style={[styles.speedBadge, { backgroundColor: theme.accent || '#1E88E5' }]}>
          <Text style={styles.speedText}>{clip.speed.toFixed(2)}x</Text>
        </View>
      )}

      {/* Transition Indicator */}
      {clip.transition && (
        <View style={styles.transitionIndicator}>
          <Text style={styles.transitionText}>⇄</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  clipContainer: {
    borderWidth: 2,
    borderRadius: 6,
    overflow: 'hidden',
    marginHorizontal: 2,
    position: 'relative',
    minHeight: 60,
  },
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholderThumbnail: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  durationLabel: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  speedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  speedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  transitionIndicator: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  transitionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});
