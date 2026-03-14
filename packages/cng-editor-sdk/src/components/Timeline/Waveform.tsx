import React from 'react';
import {
  View,
  StyleSheet,
  Canvas,
  Svg,
  G,
  Rect,
  Line,
  Text,
} from 'react-native';

interface WaveformProps {
  duration: number;
  height?: number;
  barWidth?: number;
  barGap?: number;
  color?: string;
  backgroundColor?: string;
  theme?: any;
}

export const Waveform: React.FC<WaveformProps> = ({
  duration,
  height = 60,
  barWidth = 3,
  barGap = 1,
  color = '#1E88E5',
  backgroundColor = '#F5F5F5',
  theme = {},
}) => {
  // Generate random waveform bars
  const generateWaveformBars = () => {
    const barCount = Math.floor(duration * 10); // ~10 bars per second
    const bars = [];
    
    for (let i = 0; i < barCount; i++) {
      // Create a more realistic waveform with peaks and valleys
      const frequency = Math.sin(i / 10) * 0.5 + 0.5;
      const randomFactor = Math.random() * 0.8 + 0.2;
      const barHeight = (frequency * randomFactor) * height;
      bars.push(barHeight);
    }
    
    return bars;
  };

  const bars = generateWaveformBars();

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <View style={styles.barsContainer}>
        {bars.map((barHeight, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              {
                width: barWidth,
                height: barHeight,
                marginRight: barGap,
                backgroundColor: color,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Alternative SVG-based waveform component
export const WaveformSVG: React.FC<WaveformProps> = ({
  duration,
  height = 60,
  color = '#1E88E5',
  backgroundColor = '#F5F5F5',
  theme = {},
}) => {
  const pointCount = Math.floor(duration * 20); // 20 points per second
  const points: string[] = [];
  const centerY = height / 2;
  const maxAmplitude = height / 2 - 2;

  for (let i = 0; i < pointCount; i++) {
    const x = (i / (pointCount - 1)) * 100;
    // Create smooth wave pattern
    const frequency = Math.sin(i / 5) * 0.7 + 0.3;
    const randomFactor = Math.random() * 0.8 + 0.2;
    const amplitude = frequency * randomFactor * maxAmplitude;
    const y = centerY - amplitude;

    points.push(`${x},${y}`);
  }

  const pointString = points.join(' ');

  return (
    <View
      style={[
        styles.svgContainer,
        {
          height,
          backgroundColor,
        },
      ]}
    >
      <Svg width="100%" height={height} viewBox={`0 0 100 ${height}`}>
        <G>
          <Rect x="0" y="0" width="100" height={height} fill={backgroundColor} />
          <Line
            x1="0"
            y1={centerY}
            x2="100"
            y2={centerY}
            stroke={color}
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          {/* Waveform bars */}
          {Array.from({ length: Math.floor(duration * 10) }).map((_, i) => {
            const x = (i / (Math.floor(duration * 10) - 1)) * 100;
            const frequency = Math.sin(i / 5) * 0.7 + 0.3;
            const randomFactor = Math.random() * 0.8 + 0.2;
            const barHeight = frequency * randomFactor * (height / 2 - 2);

            return (
              <Rect
                key={i}
                x={x}
                y={centerY - barHeight / 2}
                width="1.5"
                height={barHeight}
                fill={color}
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    height: '100%',
  },
  bar: {
    borderRadius: 1.5,
  },
  svgContainer: {
    width: '100%',
    overflow: 'hidden',
  },
});
