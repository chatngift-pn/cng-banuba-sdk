import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

interface StandardSliderProps {
  value: number; // 0-100
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  color?: string;
  backgroundColor?: string;
  trackHeight?: number;
  thumbRadius?: number;
}

export const StandardSlider: React.FC<StandardSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  color = '#1E88E5',
  backgroundColor = '#E0E0E0',
  trackHeight = 4,
  thumbRadius = 12,
}) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const panX = React.useRef(new Animated.Value(0)).current;

  const calculatePosition = (val: number) => {
    const range = max - min;
    const normalized = (val - min) / range;
    return normalized * trackWidth;
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        panX.flattenOffset();
      },
      onPanResponderMove: (evt: GestureResponderEvent, state: PanResponderGestureState) => {
        const newX = Math.max(0, Math.min(state.dx, trackWidth));
        const range = max - min;
        const newValue = min + (newX / trackWidth) * range;
        const steppedValue = Math.round(newValue / step) * step;
        onChange(Math.min(max, Math.max(min, steppedValue)));
      },
      onPanResponderRelease: () => {
        panX.flattenOffset();
      },
    })
  ).current;

  const thumbPosition = calculatePosition(value);

  return (
    <View style={styles.container}>
      {label && <View style={styles.label}>{/* Label text would go here */}</View>}
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

        {/* Filled portion */}
        <View
          style={[
            styles.filledTrack,
            {
              height: trackHeight,
              width: thumbPosition,
              backgroundColor: color,
            },
          ]}
        />

        {/* Thumb */}
        <View
          style={[
            styles.thumb,
            {
              width: thumbRadius * 2,
              height: thumbRadius * 2,
              borderRadius: thumbRadius,
              backgroundColor: color,
              left: thumbPosition - thumbRadius,
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>

      {/* Value display */}
      <View style={styles.valueContainer}>
        <View style={styles.valueLabel}>{/* Min label */}</View>
        <View style={styles.valueLabel}>{/* Max label */}</View>
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
  label: {
    marginBottom: 8,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 8,
  },
  track: {
    position: 'absolute',
    width: '100%',
    borderRadius: 2,
  },
  filledTrack: {
    position: 'absolute',
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueLabel: {
    fontSize: 12,
  },
});
