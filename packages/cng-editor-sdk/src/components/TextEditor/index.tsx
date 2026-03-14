import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { PanelHeader } from '../common';
import { uid } from '../../utils/mockData';
import type { TextLayer, TextAnimation } from '../../types';

const COLORS = [
  '#FFFFFF', '#000000', '#FE2C55', '#FFD700', '#00E5FF',
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
];

const ANIMATIONS: { id: TextAnimation; label: string }[] = [
  { id: 'fade', label: 'Fade' },
  { id: 'slide-up', label: 'Slide Up' },
  { id: 'slide-down', label: 'Slide Down' },
  { id: 'bounce', label: 'Bounce' },
  { id: 'typewriter', label: 'Typewriter' },
  { id: 'zoom', label: 'Zoom' },
];

const FONT_SIZES = [12, 16, 20, 24, 32, 40, 48];

export function TextEditor(): React.JSX.Element {
  const { theme, closeTool, selectedClip, addTextLayer } = useEditor();
  const [text, setText] = useState('');
  const [color, setColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(24);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [animation, setAnimation] = useState<TextAnimation>('fade');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');

  const handleAdd = () => {
    if (!selectedClip || !text.trim()) return;
    const layer: TextLayer = {
      id: uid(),
      text: text.trim(),
      x: 0.5,
      y: 0.5,
      fontSize,
      fontFamily: undefined,
      color,
      bold,
      italic,
      alignment,
      animationIn: animation,
    };
    addTextLayer(selectedClip.id, layer);
    setText('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <PanelHeader
        title="Text"
        onClose={closeTool}
        rightAction={
          <TouchableOpacity
            onPress={handleAdd}
            disabled={!text.trim() || !selectedClip}
          >
            <Text
              style={[
                styles.addBtn,
                { color: text.trim() && selectedClip ? theme.accent : theme.textSecondary },
              ]}
            >
              Add
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Text input */}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.surfaceAlt,
              borderColor: theme.border,
              fontWeight: bold ? '700' : '400',
              fontStyle: italic ? 'italic' : 'normal',
              fontSize,
              textAlign: alignment,
            },
          ]}
          placeholder="Type something…"
          placeholderTextColor={theme.textSecondary}
          value={text}
          onChangeText={setText}
          multiline
        />

        {/* Style controls */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.styleBtn,
              { borderColor: theme.border, backgroundColor: theme.surfaceAlt },
              bold && { borderColor: theme.accent },
            ]}
            onPress={() => setBold((b) => !b)}
          >
            <Text style={[styles.styleBtnText, { color: bold ? theme.accent : theme.text }]}>
              B
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.styleBtn,
              { borderColor: theme.border, backgroundColor: theme.surfaceAlt },
              italic && { borderColor: theme.accent },
            ]}
            onPress={() => setItalic((i) => !i)}
          >
            <Text
              style={[
                styles.styleBtnText,
                { color: italic ? theme.accent : theme.text, fontStyle: 'italic' },
              ]}
            >
              I
            </Text>
          </TouchableOpacity>
          {(['left', 'center', 'right'] as const).map((a) => (
            <TouchableOpacity
              key={a}
              style={[
                styles.styleBtn,
                { borderColor: theme.border, backgroundColor: theme.surfaceAlt },
                alignment === a && { borderColor: theme.accent },
              ]}
              onPress={() => setAlignment(a)}
            >
              <Text style={{ color: alignment === a ? theme.accent : theme.text, fontSize: 12 }}>
                {a === 'left' ? '⬛◻◻' : a === 'center' ? '◻⬛◻' : '◻◻⬛'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Font size */}
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Font Size</Text>
        <View style={styles.chips}>
          {FONT_SIZES.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.chip,
                { borderColor: theme.border, backgroundColor: theme.surfaceAlt },
                fontSize === size && { borderColor: theme.accent },
              ]}
              onPress={() => setFontSize(size)}
            >
              <Text style={{ color: fontSize === size ? theme.accent : theme.text, fontSize: 12 }}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Color picker */}
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Color</Text>
        <View style={styles.colors}>
          {COLORS.map((c) => (
            <TouchableOpacity
              key={c}
              style={[
                styles.colorDot,
                { backgroundColor: c },
                color === c && styles.colorDotSelected,
              ]}
              onPress={() => setColor(c)}
            />
          ))}
        </View>

        {/* Animation */}
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Animation</Text>
        <View style={styles.chips}>
          {ANIMATIONS.map(({ id, label }) => (
            <TouchableOpacity
              key={id}
              style={[
                styles.chip,
                { borderColor: theme.border, backgroundColor: theme.surfaceAlt },
                animation === id && { borderColor: theme.accent },
              ]}
              onPress={() => setAnimation(id)}
            >
              <Text style={{ color: animation === id ? theme.accent : theme.text, fontSize: 12 }}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {!selectedClip && (
          <Text style={[styles.hint, { color: theme.textSecondary }]}>
            Select a clip first to add text
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  addBtn: { fontSize: 15, fontWeight: '700' },
  input: {
    minHeight: 80,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  row: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  styleBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleBtnText: { fontSize: 16, fontWeight: '700' },
  sectionLabel: { fontSize: 12, fontWeight: '600', marginBottom: 8, letterSpacing: 0.5 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  colors: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  colorDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorDotSelected: { borderColor: '#FFFFFF', transform: [{ scale: 1.2 }] },
  hint: { textAlign: 'center', marginTop: 12, fontSize: 13 },
});
