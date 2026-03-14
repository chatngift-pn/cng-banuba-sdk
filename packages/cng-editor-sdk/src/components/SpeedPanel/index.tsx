import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { PanelHeader, SliderRow } from '../common';

const SPEEDS = [
  { label: '0.25×', value: 0.25 },
  { label: '0.5×', value: 0.5 },
  { label: '0.75×', value: 0.75 },
  { label: '1×', value: 1 },
  { label: '1.5×', value: 1.5 },
  { label: '2×', value: 2 },
  { label: '4×', value: 4 },
  { label: '8×', value: 8 },
  { label: '16×', value: 16 },
];

export function SpeedPanel(): React.JSX.Element {
  const { theme, closeTool, selectedClip, updateClip } = useEditor();
  const currentSpeed = selectedClip?.speed ?? 1;

  const handleSpeed = (speed: number) => {
    if (!selectedClip) return;
    updateClip(selectedClip.id, { speed });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <PanelHeader title="Speed" onClose={closeTool} />

      <View style={styles.content}>
        <Text style={[styles.current, { color: theme.accent }]}>
          {currentSpeed}×
        </Text>
        <Text style={[styles.subLabel, { color: theme.textSecondary }]}>
          Current Speed
        </Text>

        <View style={styles.chips}>
          {SPEEDS.map(({ label, value }) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.chip,
                { borderColor: theme.border, backgroundColor: theme.surfaceAlt },
                currentSpeed === value && {
                  borderColor: theme.accent,
                  backgroundColor: theme.accent + '20',
                },
              ]}
              onPress={() => handleSpeed(value)}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: currentSpeed === value ? theme.accent : theme.text },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {!selectedClip && (
          <Text style={[styles.hint, { color: theme.textSecondary }]}>
            Select a clip to change speed
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, alignItems: 'center' },
  current: { fontSize: 48, fontWeight: '700' },
  subLabel: { fontSize: 13, marginBottom: 24 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipText: { fontSize: 14, fontWeight: '600' },
  hint: { textAlign: 'center', marginTop: 16, fontSize: 13 },
});
