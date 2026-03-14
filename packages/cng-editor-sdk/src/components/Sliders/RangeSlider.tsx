import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

interface RangeSliderProps {
  startValue: number;
  endValue: number;
  playheadPosition?: number;
  onStartChange: (value: number) => void;
  onEndChange: (value: number) => void;
  onPlayheadChange?: (value: number) => void;
  min?: number;
  max?: number;
  color?: string;
  backgroundColor?: string;
  trackHeight?: number;
  thumbRadius?: number;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  startValue,
  endValue,
  playheadPosition,
  onStartChange,
  onEndChange,
  onPlayheadChange,
  min = 0,
  max = 100,
  color = '#1E88E5',
  backgroundColor = '#E0E0E0',
  trackHeight = 6,
  thumbRadius = 14,
}) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const [activeDrag, setActiveDrag] = useState<'start' | 'end' | 'playhead' | null>(null);

  const calculatePosition = (val: number) => {
    const range = max - min;
    const normalized = (val - min) / range;
    return normalized * trackWidth;
  };

  const handlePanResponder = (
    dragType: 'start' | 'end' | 'playhead',
    currentValue: number
  ) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setActiveDrag(dragType);
      },
      onPanResponderMove: (evt: GestureResponderEvent, state: PanResponderGestureState) => {
        const newX = Math.max(0, Math.min(state.dx + calculatePosition(currentValue), trackWidth));
        const range = max - min;
        const newValue = min + (newX / trackWidth) * range;
        const clampedValue = Math.min(max, Math.max(min, newValue));

        if (dragType === 'start') {
          onStartChange(Math.min(clampedValue, endValue));
        } else if (dragType === 'end') {
          onEndChange(Math.max(clampedValue, startValue));
        } else if (dragType === 'playhead' && onPlayheadChange) {
          onPlayheadChange(clampedValue);
        }
      },
      onPanResponderRelease: () => {
        setActiveDrag(null);
      },
    }).panHandlers;

  const startPos = calculatePosition(startValue);
  const endPos = calculatePosition(endValue);
  const playheadPos = playheadPosition !== undefined ? calculatePosition(playheadPosition) : endPos;

  const startPanResponder = React.useRef(handlePanResponder('start', startValue)).current;
  const endPanResponder = React.useRef(handlePanResponder('end', endValue)).current;
  const playheadPanResponder = React.useRef(
    handlePanResponder('playhead', playheadPosition ?? endValue)
  ).current;

  return (
    <View style={styles.container}>
      <View
        style={styles.sliderContainer}
        onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
      >
        {/* Track background */}
        <View
          style={[
            styles.track,
            {
              height: trackHeight,
              backgroundColor: backgroundColor,
            },
          ]}
        />

        {/* Filled portion (between start and end) */}
        <View
          style={[
            styles.filledTrack,
            {
              height: trackHeight,
              left: startPos,
              width: endPos - startPos,
              backgroundColor: color,
            },
          ]}
        />

        {/* Start thumb */}
        <View
          style={[
            styles.thumb,
            {
              width: thumbRadius * 2,
              height: thumbRadius * 2,
              borderRadius: thumbRadius,
              backgroundColor: color,
              left: startPos - thumbRadius,
              borderWidth: activeDrag === 'start' ? 2 : 0,
              borderColor: '#fff',
            },
          ]}
          {...startPanResponder}
        />

        {/* Playhead (if provided) */}
        {playheadPosition !== undefined && (
          <View
            style={[
              styles.playhead,
              {
                left: playheadPos - 1,
                height: trackHeight + 8,
                backgroundColor: '#FF5252',
              },
            ]}
            {...playheadPanResponder}
          />
        )}

        {/* End thumb */}
        <View
          style={[
            styles.thumb,
            {
              width: thumbRadius * 2,
              height: thumbRadius * 2,
              borderRadius: thumbRadius,
              backgroundColor: color,
              left: endPos - thumbRadius,
              borderWidth: activeDrag === 'end' ? 2 : 0,
              borderColor: '#fff',
            },
          ]}
          {...endPanResponder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sliderContainer: {
    height: 50,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    width: '100%',
    borderRadius: 3,
  },
  filledTrack: {
    position: 'absolute',
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  playhead: {
    position: 'absolute',
    width: 2,
    borderRadius: 1,
  },
});
