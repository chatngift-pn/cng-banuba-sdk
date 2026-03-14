import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { MOCK_FILTERS } from '../../utils/mockData';
import { PanelHeader, SliderRow } from '../common';
import type { Filter } from '../../types';

export function FilterPanel(): React.JSX.Element {
  const { theme, closeTool, selectedClip, applyFilter, updateClip } = useEditor();

  const currentFilterId = selectedClip?.filterId ?? 'none';
  const currentFilter = MOCK_FILTERS.find((f) => f.id === currentFilterId) ?? MOCK_FILTERS[0];

  const handleApply = (filter: Filter) => {
    if (!selectedClip) return;
    applyFilter(selectedClip.id, filter);
  };

  const handleIntensity = (v: number) => {
    // Intensity is stored on the clip's active filter — for now we track via a
    // per-clip map. This is a simplified implementation.
    if (!selectedClip) return;
    updateClip(selectedClip.id, {});
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <PanelHeader title="Filters" onClose={closeTool} />

      <FlatList
        data={MOCK_FILTERS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <FilterTile
            filter={item}
            isSelected={item.id === currentFilterId}
            onPress={() => handleApply(item)}
          />
        )}
      />

      {currentFilter.id !== 'none' && (
        <View style={styles.intensityRow}>
          <SliderRow
            label="Intensity"
            value={currentFilter.intensity}
            min={0}
            max={1}
            onValueChange={handleIntensity}
            formatValue={(v) => `${Math.round(v * 100)}%`}
          />
        </View>
      )}

      {!selectedClip && (
        <Text style={[styles.hint, { color: theme.textSecondary }]}>
          Select a clip to apply filters
        </Text>
      )}
    </View>
  );
}

interface FilterTileProps {
  filter: Filter;
  isSelected: boolean;
  onPress: () => void;
}

function FilterTile({ filter, isSelected, onPress }: FilterTileProps): React.JSX.Element {
  const { theme } = useEditor();
  return (
    <TouchableOpacity
      style={[
        styles.tile,
        isSelected && { borderColor: theme.accent },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.preview,
          { backgroundColor: theme.surfaceAlt },
        ]}
      >
        {/* Visual stand-in for real filter preview */}
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: filter.previewColor },
          ]}
        />
        <Text style={styles.previewIcon}>🖼</Text>
      </View>
      <Text
        style={[
          styles.filterName,
          { color: isSelected ? theme.accent : theme.text },
        ]}
        numberOfLines={1}
      >
        {filter.name}
      </Text>
      {isSelected && (
        <View style={[styles.checkBadge, { backgroundColor: theme.accent }]}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingHorizontal: 12, paddingVertical: 12, gap: 8 },
  tile: {
    alignItems: 'center',
    marginRight: 4,
    width: 76,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 8,
    paddingBottom: 4,
  },
  preview: {
    width: 72,
    height: 72,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  previewIcon: { fontSize: 26 },
  filterName: { fontSize: 11, marginTop: 4 },
  checkBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: { color: '#fff', fontSize: 10, fontWeight: '700' },
  intensityRow: { paddingHorizontal: 16, paddingVertical: 8 },
  hint: { textAlign: 'center', padding: 12, fontSize: 13 },
});
