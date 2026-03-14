import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocale } from '../../i18n';
import type { EditorProject, EditorTheme, ExportFormat, ExportOptions, ExportQuality } from '../../types';
import { DEFAULT_THEME } from '../../utils/theme';
import { simulateExport } from '../../utils/mockData';

export interface SaveScreenProps {
  theme?: EditorTheme;
  project: EditorProject;
  onClose: () => void;
  onExportComplete?: (outputUri: string) => void;
}

const QUALITIES: ExportQuality[] = ['480p', '720p', '1080p', '4K'];
const FORMATS: ExportFormat[] = ['mp4', 'mov', 'gif'];

export function SaveScreen({
  theme = DEFAULT_THEME,
  project,
  onClose,
  onExportComplete,
}: SaveScreenProps): React.JSX.Element {
  const { t } = useLocale();
  const [quality, setQuality] = useState<ExportQuality>('1080p');
  const [format, setFormat] = useState<ExportFormat>('mp4');
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [outputUri, setOutputUri] = useState('');

  const totalDuration = project.clips.reduce(
    (sum, c) => sum + (c.endTime - c.startTime) / c.speed,
    0,
  );

  const handleExport = async () => {
    setIsExporting(true);
    setProgress(0);
    try {
      const uri = await simulateExport((pct) => setProgress(pct));
      setOutputUri(uri);
      setIsDone(true);
      onExportComplete?.(uri);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      {/* Top bar */}
      <View style={[styles.topBar, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onClose}>
          <Text style={[styles.backBtn, { color: theme.text }]}>← {t.creationFlow_back}</Text>
        </TouchableOpacity>
        <Text style={[styles.topTitle, { color: theme.text }]}>{t.save_title}</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Preview placeholder */}
        <View style={[styles.previewBox, { backgroundColor: theme.surfaceAlt }]}>
          <Text style={styles.previewIcon}>🎞</Text>
          <Text style={[styles.previewLabel, { color: theme.text }]}>{t.save_preview}</Text>
          <Text style={[styles.previewSub, { color: theme.textSecondary }]}>
            {project.aspectRatio} · {project.clips.length} {t.save_clips.toLowerCase()}
          </Text>
        </View>

        {/* Project summary */}
        <View style={[styles.summaryCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.summaryTitle, { color: theme.text }]}>
            {t.save_projectSummary}
          </Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>{t.save_clips}</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>{project.clips.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>{t.save_audioTracks}</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>{project.audioTracks.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>{t.save_duration}</Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>{totalDuration.toFixed(1)}s</Text>
          </View>
        </View>

        {/* Quality picker */}
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>{t.export_quality}</Text>
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

        {/* Format picker */}
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>{t.export_format}</Text>
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

        {/* Progress */}
        {isExporting && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
              <View
                style={[styles.progressFill, { width: `${progress}%`, backgroundColor: theme.accent }]}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.text }]}>
              {t.export_exporting} {progress}%
            </Text>
          </View>
        )}

        {isDone && (
          <View style={[styles.successBox, { backgroundColor: '#1C3B2F', borderColor: theme.success }]}>
            <Text style={{ fontSize: 32 }}>✅</Text>
            <Text style={[styles.successText, { color: theme.success }]}>{t.export_complete}</Text>
            <Text style={[styles.successPath, { color: theme.textSecondary }]} numberOfLines={1}>
              {outputUri}
            </Text>
          </View>
        )}

        {isSaved && (
          <View style={[styles.savedBadge, { backgroundColor: theme.success + '20' }]}>
            <Text style={[styles.savedText, { color: theme.success }]}>✓ {t.save_saved}</Text>
          </View>
        )}

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}
            onPress={handleSave}
          >
            <Text style={[styles.saveBtnText, { color: theme.text }]}>
              💾 {t.save_saveProject}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.exportBtn, { backgroundColor: isExporting ? theme.surfaceAlt : theme.accent }]}
            onPress={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.exportBtnText}>{t.export_button}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: { fontSize: 15, fontWeight: '600' },
  topTitle: { fontSize: 16, fontWeight: '700' },
  scroll: { padding: 16, paddingBottom: 40 },
  previewBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    borderRadius: 16,
    marginBottom: 20,
    gap: 8,
  },
  previewIcon: { fontSize: 64 },
  previewLabel: { fontSize: 16, fontWeight: '700' },
  previewSub: { fontSize: 12 },
  summaryCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
    gap: 10,
  },
  summaryTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { fontSize: 13 },
  summaryValue: { fontSize: 13, fontWeight: '600' },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 8,
  },
  chips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 8 },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1.5,
  },
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
  savedBadge: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  savedText: { fontSize: 14, fontWeight: '700' },
  actions: { gap: 12, marginTop: 24 },
  saveBtn: {
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 1,
  },
  saveBtnText: { fontSize: 16, fontWeight: '700' },
  exportBtn: {
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
