import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { PanelHeader, SliderRow } from '../common';

export function TrimPanel(): React.JSX.Element {
  const { theme, closeTool, selectedClip, updateClip } = useEditor();

  if (!selectedClip) {
    return (
      <View style={[styles.container, { backgroundColor: theme.surface }]}>
        <PanelHeader title="Trim" onClose={closeTool} />
        <Text style={[styles.hint, { color: theme.textSecondary }]}>
          Select a clip to trim it
        </Text>
      </View>
    );
  }

  const totalDur = selectedClip.asset.duration ?? 10;
  const startPct = (selectedClip.startTime / totalDur) * 100;
  const endPct = (selectedClip.endTime / totalDur) * 100;
  const clipDur = selectedClip.endTime - selectedClip.startTime;

  const handleStartChange = (v: number) => {
    const newStart = (v / 100) * totalDur;
    if (newStart < selectedClip.endTime - 0.5) {
      updateClip(selectedClip.id, { startTime: newStart });
    }
  };

  const handleEndChange = (v: number) => {
    const newEnd = (v / 100) * totalDur;
    if (newEnd > selectedClip.startTime + 0.5) {
      updateClip(selectedClip.id, { endTime: newEnd });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <PanelHeader title="Trim / Cut" onClose={closeTool} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Trim bar visualizer */}
        <View style={[styles.trimBar, { backgroundColor: theme.surfaceAlt }]}>
          <View style={{ flex: startPct / 100 }} />
          <View
            style={[
              styles.trimActive,
              { flex: (endPct - startPct) / 100, backgroundColor: theme.accent + '40', borderColor: theme.accent },
            ]}
          >
            <View style={[styles.trimHandle, { backgroundColor: theme.accent }]} />
            <View style={[styles.trimHandle, { backgroundColor: theme.accent }]} />
          </View>
          <View style={{ flex: (100 - endPct) / 100 }} />
        </View>

        {/* Duration info */}
        <View style={styles.info}>
          <Text style={[styles.infoItem, { color: theme.textSecondary }]}>
            Start: <Text style={{ color: theme.text }}>{selectedClip.startTime.toFixed(2)}s</Text>
          </Text>
          <Text style={[styles.infoItem, { color: theme.textSecondary }]}>
            Duration: <Text style={{ color: theme.accent }}>{clipDur.toFixed(2)}s</Text>
          </Text>
          <Text style={[styles.infoItem, { color: theme.textSecondary }]}>
            End: <Text style={{ color: theme.text }}>{selectedClip.endTime.toFixed(2)}s</Text>
          </Text>
        </View>

        <SliderRow
          label="Start Point"
          value={startPct}
          min={0}
          max={100}
          onValueChange={handleStartChange}
          formatValue={(v) => `${((v / 100) * totalDur).toFixed(1)}s`}
        />

        <SliderRow
          label="End Point"
          value={endPct}
          min={0}
          max={100}
          onValueChange={handleEndChange}
          formatValue={(v) => `${((v / 100) * totalDur).toFixed(1)}s`}
        />

        {/* Quick split button */}
        <TouchableOpacity
          style={[styles.splitBtn, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}
          onPress={() => {/* fake split action */}}
        >
          <Text style={{ fontSize: 18 }}>✂️</Text>
          <Text style={[styles.splitBtnText, { color: theme.text }]}>Split at Playhead</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hint: { textAlign: 'center', padding: 24, fontSize: 13 },
  content: { padding: 16, paddingBottom: 32 },
  trimBar: {
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 16,
  },
  trimActive: {
    borderWidth: 2,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  trimHandle: {
    width: 8,
    borderRadius: 2,
    opacity: 0.9,
  },
  info: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  infoItem: { fontSize: 12 },
  splitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  splitBtnText: { fontSize: 14, fontWeight: '600' },
});
