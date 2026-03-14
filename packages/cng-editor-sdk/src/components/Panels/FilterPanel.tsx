import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { StandardSlider } from '../Sliders/StandardSlider';
import type { Filter } from '../../types';

interface FilterPanelProps {
  onFilterSelect: (filter: Filter) => void;
  onIntensityChange: (intensity: number) => void;
  selectedFilterType?: string;
  intensity?: number;
  theme?: any;
}

const FILTERS: { id: string; type: string; name: string; color: string }[] = [
  { id: '1', type: 'vivid', name: 'Vivid', color: '#FF6B6B' },
  { id: '2', type: 'warm', name: 'Warm', color: '#FFA500' },
  { id: '3', type: 'cool', name: 'Cool', color: '#4ECDC4' },
  { id: '4', type: 'bw', name: 'B&W', color: '#808080' },
  { id: '5', type: 'vintage', name: 'Vintage', color: '#C4A57B' },
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  onFilterSelect,
  onIntensityChange,
  selectedFilterType,
  intensity = 50,
  theme = {},
}) => {
  const [localIntensity, setLocalIntensity] = useState(intensity);

  const handleFilterSelect = (filter: Filter) => {
    onFilterSelect(filter);
  };

  const handleIntensityChange = (newIntensity: number) => {
    setLocalIntensity(newIntensity);
    onIntensityChange(newIntensity);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface || '#FFFFFF' }]}>
      <Text style={[styles.title, { color: theme.text || '#333' }]}>Filters</Text>

      {/* Filter Grid */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterItem,
              selectedFilterType === filter.type && styles.filterItemSelected,
            ]}
            onPress={() =>
              handleFilterSelect({
                id: filter.id,
                name: filter.name,
                previewColor: filter.color,
                intensity: localIntensity,
              })
            }
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.filterPreview,
                {
                  backgroundColor: filter.color,
                  opacity: 0.7,
                },
              ]}
            />
            <Text style={styles.filterLabel}>{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Intensity Slider */}
      <View style={styles.sliderSection}>
        <Text style={[styles.sliderLabel, { color: theme.text || '#333' }]}>
          Intensity
        </Text>
        <StandardSlider
          value={localIntensity}
          onChange={handleIntensityChange}
          min={0}
          max={100}
          step={1}
          color={theme.accent || '#1E88E5'}
          backgroundColor={theme.border || '#E0E0E0'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  gridContainer: {
    paddingVertical: 8,
    gap: 12,
  },
  filterItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  filterItemSelected: {
    opacity: 1,
  },
  filterPreview: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  sliderSection: {
    marginTop: 20,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
});
