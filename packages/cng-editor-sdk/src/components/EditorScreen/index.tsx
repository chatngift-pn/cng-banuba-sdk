import React from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { EditorProvider, useEditor } from '../../context/EditorContext';
import type { EditorConfig } from '../../types';
import { EditorCanvas } from './EditorCanvas';
import { Toolbar } from '../Toolbar';
import { Timeline } from '../Timeline';
import { FilterPanel } from '../FilterPanel';
import { AdjustPanel } from '../AdjustPanel';
import { TextEditor } from '../TextEditor';
import { StickerPanel } from '../StickerPanel';
import { TransitionPanel } from '../TransitionPanel';
import { AudioPanel } from '../AudioPanel';
import { ExportPanel } from '../ExportPanel';
import { TrimPanel } from '../TrimPanel';
import { SpeedPanel } from '../SpeedPanel';
import { MediaPicker } from '../MediaPicker';

// ─────────────────────────────────────────────────────────────────────────────
//  Inner editor (must be inside EditorProvider)
// ─────────────────────────────────────────────────────────────────────────────

function EditorInner(): React.JSX.Element {
  const {
    theme,
    state,
    closeTool,
    undo,
    redo,
    canUndo,
    canRedo,
    removeClip,
    selectedClip,
    selectClip,
  } = useEditor();

  const activeTool = state.activeTool;

  const renderBottomPanel = () => {
    switch (activeTool) {
      case 'filters':      return <FilterPanel />;
      case 'adjust':       return <AdjustPanel />;
      case 'text':         return <TextEditor />;
      case 'stickers':     return <StickerPanel />;
      case 'transitions':  return <TransitionPanel />;
      case 'audio':        return <AudioPanel />;
      case 'export':       return <ExportPanel />;
      case 'trim':         return <TrimPanel />;
      case 'speed':        return <SpeedPanel />;
      case 'media-picker': return <MediaPicker />;
      default:             return null;
    }
  };

  const panel = renderBottomPanel();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.background} />

      {/* Top bar */}
      <View style={[styles.topBar, { borderBottomColor: theme.border }]}>
        <TouchableOpacity
          onPress={state.config.onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.topBarBtn, { color: theme.text }]}>✕</Text>
        </TouchableOpacity>
        <Text style={[styles.projectName, { color: theme.text }]}>
          {state.project.name}
        </Text>
        <View style={styles.topBarRight}>
          <TouchableOpacity
            onPress={undo}
            disabled={!canUndo}
            style={[!canUndo && styles.disabled]}
          >
            <Text style={[styles.topBarBtn, { color: canUndo ? theme.text : theme.textSecondary }]}>
              ↩
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={redo}
            disabled={!canRedo}
            style={[!canRedo && styles.disabled]}
          >
            <Text style={[styles.topBarBtn, { color: canRedo ? theme.text : theme.textSecondary }]}>
              ↪
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Canvas */}
      <EditorCanvas />

      {/* Selected clip actions bar */}
      {selectedClip && (
        <View style={[styles.clipActionsBar, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.clipActions}>
            <Text style={[styles.clipActionsLabel, { color: theme.textSecondary }]} numberOfLines={1}>
              ✂ {selectedClip.asset.name}
            </Text>
            <TouchableOpacity
              style={[styles.clipActionBtn, { backgroundColor: theme.surfaceAlt }]}
              onPress={() => selectClip(null)}
            >
              <Text style={{ color: theme.textSecondary, fontSize: 12 }}>Deselect</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.clipActionBtn, { backgroundColor: theme.danger + '20', borderColor: theme.danger }]}
              onPress={() => { removeClip(selectedClip.id); selectClip(null); }}
            >
              <Text style={{ color: theme.danger, fontSize: 12 }}>🗑 Remove</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Timeline */}
      <Timeline />

      {/* Toolbar */}
      <Toolbar />

      {/* Bottom panel sheet */}
      {panel && (
        <View
          style={[
            styles.bottomSheet,
            { backgroundColor: theme.surface, borderTopColor: theme.border },
          ]}
        >
          {panel}
        </View>
      )}
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  EditorScreen – public entry point
// ─────────────────────────────────────────────────────────────────────────────

export interface EditorScreenProps {
  config?: EditorConfig;
}

export function EditorScreen({ config = {} }: EditorScreenProps): React.JSX.Element {
  return (
    <EditorProvider config={config}>
      <EditorInner />
    </EditorProvider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  EditorModal – render the editor inside a full-screen Modal
// ─────────────────────────────────────────────────────────────────────────────

export interface EditorModalProps {
  visible: boolean;
  config?: EditorConfig;
}

export function EditorModal({ visible, config = {} }: EditorModalProps): React.JSX.Element {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
    >
      <EditorScreen config={config} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  topBarBtn: { fontSize: 20, width: 32 },
  projectName: { flex: 1, textAlign: 'center', fontSize: 14, fontWeight: '600' },
  topBarRight: { flexDirection: 'row', gap: 4 },
  disabled: { opacity: 0.3 },
  clipActionsBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  clipActions: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clipActionsLabel: { fontSize: 12, maxWidth: 140 },
  clipActionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '50%',
    borderTopWidth: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
});
