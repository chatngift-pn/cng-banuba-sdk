import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { ToolButton } from '../common';
import type { ActiveTool } from '../../types';

const TOOLS: { icon: string; label: string; tool: ActiveTool }[] = [
  { icon: '✂️', label: 'Trim', tool: 'trim' },
  { icon: '⚡', label: 'Speed', tool: 'speed' },
  { icon: '✨', label: 'Filters', tool: 'filters' },
  { icon: '🎚', label: 'Adjust', tool: 'adjust' },
  { icon: '🔤', label: 'Text', tool: 'text' },
  { icon: '😊', label: 'Sticker', tool: 'stickers' },
  { icon: '🎵', label: 'Audio', tool: 'audio' },
  { icon: '🔀', label: 'Transit.', tool: 'transitions' },
  { icon: '➕', label: 'Add', tool: 'media-picker' },
];

export function Toolbar(): React.JSX.Element {
  const { state, setActiveTool, closeTool, theme } = useEditor();

  const handleTool = (tool: ActiveTool) => {
    if (state.activeTool === tool) {
      closeTool();
    } else {
      setActiveTool(tool);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {TOOLS.map(({ icon, label, tool }) => (
          <ToolButton
            key={tool}
            icon={icon}
            label={label}
            onPress={() => handleTool(tool)}
            isActive={state.activeTool === tool}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  scroll: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    alignItems: 'center',
  },
});
