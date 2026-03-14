import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { PanelHeader, SliderRow } from '../common';
import type { Adjustments } from '../../types';

const ADJUSTMENTS: {
  key: keyof Adjustments;
  label: string;
  min: number;
  max: number;
  icon: string;
}[] = [
  { key: 'brightness', label: 'Brightness', min: -1, max: 1, icon: '☀️' },
  { key: 'contrast', label: 'Contrast', min: -1, max: 1, icon: '◑' },
  { key: 'saturation', label: 'Saturation', min: -1, max: 1, icon: '🎨' },
  { key: 'sharpness', label: 'Sharpness', min: 0, max: 1, icon: '🔍' },
  { key: 'temperature', label: 'Temperature', min: -1, max: 1, icon: '🌡' },
  { key: 'tint', label: 'Tint', min: -1, max: 1, icon: '🎭' },
  { key: 'highlight', label: 'Highlights', min: -1, max: 1, icon: '✨' },
  { key: 'shadow', label: 'Shadows', min: -1, max: 1, icon: '🌑' },
  { key: 'fade', label: 'Fade', min: 0, max: 1, icon: '🌫' },
  { key: 'vignette', label: 'Vignette', min: 0, max: 1, icon: '⬛' },
];

export function AdjustPanel(): React.JSX.Element {
  const { theme, closeTool, state, setAdjustments } = useEditor();
  const adj = state.project.globalAdjustments;

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <PanelHeader title="Adjust" onClose={closeTool} />
      <ScrollView contentContainerStyle={styles.content}>
        {ADJUSTMENTS.map(({ key, label, min, max, icon }) => (
          <SliderRow
            key={key}
            label={`${icon}  ${label}`}
            value={adj[key]}
            min={min}
            max={max}
            onValueChange={(v) => setAdjustments({ [key]: v })}
            formatValue={(v) => {
              if (min === 0) return `${Math.round(v * 100)}%`;
              return (v > 0 ? '+' : '') + Math.round(v * 100);
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
});
