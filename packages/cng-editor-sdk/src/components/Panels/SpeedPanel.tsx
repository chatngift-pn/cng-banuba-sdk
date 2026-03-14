import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { StepSlider } from '../Sliders/StepSlider';

interface SpeedPanelProps {
  currentSpeed?: number;
  onSpeedChange: (speed: number) => void;
  theme?: any;
}

const SPEED_OPTIONS = ['0.25x', '0.5x', '1x', '2x', '4x'];
const SPEED_VALUES = [0.25, 0.5, 1, 2, 4];

export const SpeedPanel: React.FC<SpeedPanelProps> = ({
  currentSpeed = 1,
  onSpeedChange,
  theme = {},
}) => {
  const [selectedSpeed, setSelectedSpeed] = useState(
    SPEED_OPTIONS[SPEED_VALUES.indexOf(currentSpeed)] || '1x'
  );

  const handleSpeedChange = (option: string | number) => {
    const optionStr = String(option);
    setSelectedSpeed(optionStr);
    const index = SPEED_OPTIONS.indexOf(optionStr);
    if (index !== -1) {
      onSpeedChange(SPEED_VALUES[index]);
    }
  };

  const speedDetails = {
    '0.25x': 'Slow Motion - Very Slow',
    '0.5x': 'Slow Motion',
    '1x': 'Normal Speed',
    '2x': 'Fast Motion',
    '4x': 'Ultra Fast Motion',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface || '#FFFFFF' }]}>
      <Text style={[styles.title, { color: theme.text || '#333' }]}>Playback Speed</Text>

      {/* Speed Slider */}
      <View style={styles.sliderSection}>
        <StepSlider
          value={selectedSpeed}
          options={SPEED_OPTIONS}
          onChange={handleSpeedChange}
          color={theme.accent || '#1E88E5'}
          backgroundColor={theme.background || '#F5F5F5'}
        />
      </View>

      {/* Speed Description */}
      <View style={styles.descriptionContainer}>
        <Text style={[styles.description, { color: theme.textSecondary || '#999' }]}>
          {speedDetails[selectedSpeed as keyof typeof speedDetails]}
        </Text>
      </View>

      {/* Info Box */}
      <View
        style={[
          styles.infoBox,
          {
            backgroundColor: theme.background || '#F5F5F5',
            borderColor: theme.border || '#E0E0E0',
          },
        ]}
      >
        <Text style={[styles.infoText, { color: theme.text || '#666' }]}>
          Current Speed: <Text style={styles.boldText}>{selectedSpeed}</Text>
        </Text>
        <Text style={[styles.infoText, { color: theme.textSecondary || '#999' }]}>
          This affects how fast the video clip plays back during playback and export.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 24,
  },
  sliderSection: {
    marginVertical: 24,
  },
  descriptionContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  infoBox: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 20,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },
  boldText: {
    fontWeight: '600',
  },
});
