import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { MOCK_STICKERS } from '../../utils/mockData';
import { PanelHeader } from '../common';
import { uid } from '../../utils/mockData';
import type { StickerLayer } from '../../types';

const CATEGORIES = ['All', 'emoji', 'music', 'fun', 'nature', 'misc'];

export function StickerPanel(): React.JSX.Element {
  const { theme, closeTool, selectedClip, addStickerLayer } = useEditor();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? MOCK_STICKERS
      : MOCK_STICKERS.filter((s) => s.category === activeCategory);

  const handleAdd = (stickerId: string) => {
    if (!selectedClip) return;
    const layer: StickerLayer = {
      id: uid(),
      stickerId,
      x: 0.5,
      y: 0.5,
      scale: 1,
      rotation: 0,
    };
    addStickerLayer(selectedClip.id, layer);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <PanelHeader title="Stickers" onClose={closeTool} />

      {/* Category chips */}
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(c) => c}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.catChip,
              { borderColor: theme.border, backgroundColor: theme.surfaceAlt },
              activeCategory === item && { borderColor: theme.accent, backgroundColor: theme.accent + '20' },
            ]}
            onPress={() => setActiveCategory(item)}
          >
            <Text
              style={[
                styles.catText,
                { color: activeCategory === item ? theme.accent : theme.text },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Sticker grid */}
      <FlatList
        data={filtered}
        keyExtractor={(s) => s.id}
        numColumns={5}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.stickerTile}
            onPress={() => handleAdd(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.stickerEmoji}>{item.source}</Text>
            <Text style={[styles.stickerName, { color: theme.textSecondary }]} numberOfLines={1}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {!selectedClip && (
        <Text style={[styles.hint, { color: theme.textSecondary }]}>
          Select a clip first
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  categories: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  catChip: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  catText: { fontSize: 12, fontWeight: '600' },
  grid: { paddingHorizontal: 8, paddingBottom: 24 },
  stickerTile: {
    flex: 1,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  stickerEmoji: { fontSize: 32 },
  stickerName: { fontSize: 9, marginTop: 4 },
  hint: { textAlign: 'center', padding: 12, fontSize: 13 },
});
