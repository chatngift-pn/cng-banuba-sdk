import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { PanelHeader } from '../common';
import type { AspectRatio, ExportFormat, ExportOptions, ExportQuality } from '../../types';

const QUALITIES: ExportQuality[] = ['480p', '720p', '1080p', '4K'];
const FORMATS: ExportFormat[] = ['mp4', 'mov', 'gif'];
const FRAME_RATES: (24 | 30 | 60)[] = [24, 30, 60];
const ASPECT_RATIOS: { value: AspectRatio; label: string }[] = [
  { value: '9:16', label: '9:16\nPortrait' },
  { value: '16:9', label: '16:9\nLandscape' },
  { value: '1:1', label: '1:1\nSquare' },
  { value: '4:3', label: '4:3\nClassic' },
];

export function ExportPanel(): React.JSX.Element {
  const { theme, closeTool, state, startExport, setAspectRatio } = useEditor();
  const [quality, setQuality] = useState<ExportQuality>('1080p');
  const [format, setFormat] = useState<ExportFormat>('mp4');
  const [frameRate, setFrameRate] = useState<24 | 30 | 60>(30);
  const [includeAudio, setIncludeAudio] = useState(true);

  const { exportProgress } = state;
  const isExporting = exportProgress.status === 'processing';
  const isDone = exportProgress.status === 'done';
  const isError = exportProgress.status === 'error';

  const handleExport = async () => {
    const options: ExportOptions = { quality, format, frameRate, includeAudio };
    await startExport(options);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <PanelHeader title="Export" onClose={closeTool} />

      <View style={styles.content}>
        {/* Aspect ratio */}
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Aspect Ratio</Text>
        <View style={styles.row}>
          {ASPECT_RATIOS.map(({ value, label }) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.arTile,
                { borderColor: theme.border, backgroundColor: theme.surfaceAlt },
                state.project.aspectRatio === value && {
                  borderColor: theme.accent,
                  backgroundColor: theme.accent + '15',
                },
              ]}
              onPress={() => setAspectRatio(value)}
            >
              <Text
                style={[
                  styles.arLabel,
                  { color: state.project.aspectRatio === value ? theme.accent : theme.text },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quality */}
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Quality</Text>
        <View style={styles.chips}>
          {QUALITIES.map((q) => (
            <TouchableOpacity
              key={q}
              style={[
                styles.chip,
                { borderColor: theme.border, backgroundColor: theme.surfaceAlt },
                quality === q && { borderColor: theme.accent, backgroundColor: theme.accent + '20' },
              ]}
              onPress={() => setQuality(q)}
            >
              <Text style={{ color: quality === q ? theme.accent : theme.text, fontWeight: '600', fontSize: 13 }}>
                {q}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Format */}
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Format</Text>
        <View style={styles.chips}>
          {FORMATS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.chip,
                { borderColor: theme.border, backgroundColor: theme.surfaceAlt },
                format === f && { borderColor: theme.accent, backgroundColor: theme.accent + '20' },
              ]}
              onPress={() => setFormat(f)}
            >
              <Text style={{ color: format === f ? theme.accent : theme.text, fontWeight: '600', fontSize: 13 }}>
                .{f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Frame rate */}
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Frame Rate</Text>
        <View style={styles.chips}>
          {FRAME_RATES.map((fps) => (
            <TouchableOpacity
              key={fps}
              style={[
                styles.chip,
                { borderColor: theme.border, backgroundColor: theme.surfaceAlt },
                frameRate === fps && { borderColor: theme.accent, backgroundColor: theme.accent + '20' },
              ]}
              onPress={() => setFrameRate(fps)}
            >
              <Text style={{ color: frameRate === fps ? theme.accent : theme.text, fontWeight: '600', fontSize: 13 }}>
                {fps} fps
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Include audio toggle */}
        <TouchableOpacity
          style={[styles.toggleRow, { borderColor: theme.border }]}
          onPress={() => setIncludeAudio((v) => !v)}
        >
          <Text style={[styles.toggleLabel, { color: theme.text }]}>Include Audio</Text>
          <View
            style={[
              styles.toggle,
              { backgroundColor: includeAudio ? theme.accent : theme.surfaceAlt },
            ]}
          >
            <View
              style={[
                styles.toggleThumb,
                includeAudio ? styles.toggleThumbOn : styles.toggleThumbOff,
              ]}
            />
          </View>
        </TouchableOpacity>

        {/* Progress bar */}
        {isExporting && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${exportProgress.progress}%`,
                    backgroundColor: theme.accent,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.text }]}>
              Exporting… {exportProgress.progress}%
            </Text>
          </View>
        )}

        {isDone && (
          <View style={[styles.successBox, { backgroundColor: '#1C3B2F', borderColor: theme.success }]}>
            <Text style={{ fontSize: 32 }}>✅</Text>
            <Text style={[styles.successText, { color: theme.success }]}>Export Complete!</Text>
            <Text style={[styles.successPath, { color: theme.textSecondary }]} numberOfLines={1}>
              {exportProgress.outputUri}
            </Text>
          </View>
        )}

        {isError && (
          <Text style={[styles.error, { color: theme.danger }]}>
            Export failed: {exportProgress.error}
          </Text>
        )}

        {/* Export button */}
        <TouchableOpacity
          style={[
            styles.exportBtn,
            { backgroundColor: isExporting ? theme.surfaceAlt : theme.accent },
          ]}
          onPress={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.exportBtnText}>⬆ Export Video</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 8, marginTop: 12 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  arTile: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arLabel: { fontSize: 10, fontWeight: '600', textAlign: 'center' },
  chips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 4 },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 8,
  },
  toggleLabel: { fontSize: 14 },
  toggle: {
    width: 44,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    padding: 2,
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
  toggleThumbOn: { alignSelf: 'flex-end' },
  toggleThumbOff: { alignSelf: 'flex-start' },
  progressContainer: { marginTop: 16 },
  progressBar: { height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 6 },
  progressFill: { height: '100%', borderRadius: 3 },
  progressText: { fontSize: 12, textAlign: 'center' },
  successBox: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
    gap: 6,
  },
  successText: { fontSize: 15, fontWeight: '700' },
  successPath: { fontSize: 11 },
  error: { textAlign: 'center', marginTop: 12, fontSize: 13 },
  exportBtn: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
