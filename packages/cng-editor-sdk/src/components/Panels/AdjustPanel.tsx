import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { StandardSlider } from '../Sliders/StandardSlider';
import type { Adjustments } from '../../types';

interface AdjustPanelProps {
  adjustments?: Adjustments;
  onAdjustmentsChange: (adjustments: Partial<Adjustments>) => void;
  theme?: any;
}

export const AdjustPanel: React.FC<AdjustPanelProps> = ({
  adjustments = {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    sharpness: 0,
    vignette: 0,
    fade: 0,
    temperature: 0,
    tint: 0,
    highlight: 0,
    shadow: 0,
  },
  onAdjustmentsChange,
  theme = {},
}) => {
  const [localAdjustments, setLocalAdjustments] = useState(adjustments);

  const handleAdjustmentChange = (key: keyof Adjustments, value: number) => {
    const updated = { ...localAdjustments, [key]: value };
    setLocalAdjustments(updated);
    onAdjustmentsChange(updated);
  };

  const adjustmentLabels: Record<keyof Adjustments, string> = {
    brightness: 'Brightness',
    contrast: 'Contrast',
    saturation: 'Saturation',
    sharpness: 'Sharpness',
    vignette: 'Vignette',
    fade: 'Fade',
    temperature: 'Temperature',
    tint: 'Tint',
    highlight: 'Highlight',
    shadow: 'Shadow',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface || '#FFFFFF' }]}>
      <Text style={[styles.title, { color: theme.text || '#333' }]}>Adjustments</Text>

      {/* Brightness */}
      <View style={styles.adjustmentRow}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>
          {adjustmentLabels.brightness}
        </Text>
        <StandardSlider
          value={Math.max(0, (localAdjustments.brightness || 0) + 50)}
          onChange={(val) => handleAdjustmentChange('brightness', val - 50)}
          min={0}
          max={100}
          step={1}
          color={theme.accent || '#1E88E5'}
          backgroundColor={theme.border || '#E0E0E0'}
        />
      </View>

      {/* Contrast */}
      <View style={styles.adjustmentRow}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>
          {adjustmentLabels.contrast}
        </Text>
        <StandardSlider
          value={Math.max(0, (localAdjustments.contrast || 0) + 50)}
          onChange={(val) => handleAdjustmentChange('contrast', val - 50)}
          min={0}
          max={100}
          step={1}
          color={theme.accent || '#1E88E5'}
          backgroundColor={theme.border || '#E0E0E0'}
        />
      </View>

      {/* Saturation */}
      <View style={styles.adjustmentRow}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>
          {adjustmentLabels.saturation}
        </Text>
        <StandardSlider
          value={Math.max(0, (localAdjustments.saturation || 0) + 50)}
          onChange={(val) => handleAdjustmentChange('saturation', val - 50)}
          min={0}
          max={100}
          step={1}
          color={theme.accent || '#1E88E5'}
          backgroundColor={theme.border || '#E0E0E0'}
        />
      </View>

      {/* Sharpness */}
      <View style={styles.adjustmentRow}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>
          {adjustmentLabels.sharpness}
        </Text>
        <StandardSlider
          value={(localAdjustments.sharpness || 0) * 100}
          onChange={(val) => handleAdjustmentChange('sharpness', val / 100)}
          min={0}
          max={100}
          step={1}
          color={theme.accent || '#1E88E5'}
          backgroundColor={theme.border || '#E0E0E0'}
        />
      </View>

      {/* Temperature */}
      <View style={styles.adjustmentRow}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>
          {adjustmentLabels.temperature}
        </Text>
        <StandardSlider
          value={Math.max(0, (localAdjustments.temperature || 0) + 50)}
          onChange={(val) => handleAdjustmentChange('temperature', val - 50)}
          min={0}
          max={100}
          step={1}
          color={theme.accent || '#1E88E5'}
          backgroundColor={theme.border || '#E0E0E0'}
        />
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
    marginBottom: 16,
  },
  adjustmentRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
});
