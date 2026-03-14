import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { ToolButton } from '../common';
import type { ActiveTool } from '../../types';

const TOOL_CATEGORIES = {
  basic: [
    { icon: '✂️', label: 'Trim', tool: 'trim' as ActiveTool },
    { icon: '📍', label: 'Split', tool: 'split' as ActiveTool },
    { icon: '⚡', label: 'Speed', tool: 'speed' as ActiveTool },
  ],
  adjust: [
    { icon: '✨', label: 'Filter', tool: 'filters' as ActiveTool },
    { icon: '🎚', label: 'Adjust', tool: 'adjust' as ActiveTool },
    { icon: '🔤', label: 'Text', tool: 'text' as ActiveTool },
    { icon: '😊', label: 'Sticker', tool: 'stickers' as ActiveTool },
  ],
  audio: [
    { icon: '🎵', label: 'Audio', tool: 'audio' as ActiveTool },
    { icon: '🔀', label: 'Transitions', tool: 'transitions' as ActiveTool },
  ],
};

export function Toolbar(): React.JSX.Element {
  const { state, setActiveTool, closeTool, theme } = useEditor();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('basic');

  const handleTool = (tool: ActiveTool) => {
    if (state.activeTool === tool) {
      closeTool();
    } else {
      setActiveTool(tool);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Basic Tools */}
        <View style={styles.categorySection}>
          <TouchableOpacity
            style={[styles.categoryHeader, { backgroundColor: theme.surface }]}
            onPress={() => toggleCategory('basic')}
          >
            <Text style={[styles.categoryTitle, { color: theme.text }]}>Basic</Text>
          </TouchableOpacity>
          {expandedCategory === 'basic' && (
            <View style={styles.toolsRow}>
              {TOOL_CATEGORIES.basic.map(({ icon, label, tool }) => (
                <ToolButton
                  key={tool}
                  icon={icon}
                  label={label}
                  onPress={() => handleTool(tool)}
                  isActive={state.activeTool === tool}
                />
              ))}
            </View>
          )}
        </View>

        {/* Adjust Tools */}
        <View style={styles.categorySection}>
          <TouchableOpacity
            style={[styles.categoryHeader, { backgroundColor: theme.surface }]}
            onPress={() => toggleCategory('adjust')}
          >
            <Text style={[styles.categoryTitle, { color: theme.text }]}>Adjust</Text>
          </TouchableOpacity>
          {expandedCategory === 'adjust' && (
            <View style={styles.toolsRow}>
              {TOOL_CATEGORIES.adjust.map(({ icon, label, tool }) => (
                <ToolButton
                  key={tool}
                  icon={icon}
                  label={label}
                  onPress={() => handleTool(tool)}
                  isActive={state.activeTool === tool}
                />
              ))}
            </View>
          )}
        </View>

        {/* Audio Tools */}
        <View style={styles.categorySection}>
          <TouchableOpacity
            style={[styles.categoryHeader, { backgroundColor: theme.surface }]}
            onPress={() => toggleCategory('audio')}
          >
            <Text style={[styles.categoryTitle, { color: theme.text }]}>Audio</Text>
          </TouchableOpacity>
          {expandedCategory === 'audio' && (
            <View style={styles.toolsRow}>
              {TOOL_CATEGORIES.audio.map(({ icon, label, tool }) => (
                <ToolButton
                  key={tool}
                  icon={icon}
                  label={label}
                  onPress={() => handleTool(tool)}
                  isActive={state.activeTool === tool}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    maxHeight: 300,
  },
  scroll: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  categorySection: {
    marginBottom: 12,
  },
  categoryHeader: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  toolsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
