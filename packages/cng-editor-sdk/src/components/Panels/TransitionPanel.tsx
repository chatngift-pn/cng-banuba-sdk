import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StandardSlider } from '../Sliders/StandardSlider';
import type { Transition } from '../../types';

interface TransitionPanelProps {
  onTransitionSelect: (transition: Transition) => void;
  theme?: any;
}

const TRANSITIONS: { id: string; name: string; icon: string; type: string }[] = [
  { id: '1', name: 'Fade', icon: '◯', type: 'fade' },
  { id: '2', name: 'Slide', icon: '→', type: 'slide' },
  { id: '3', name: 'Zoom', icon: '⊙', type: 'zoom' },
  { id: '4', name: 'Wipe', icon: '⊢', type: 'wipe' },
];

export const TransitionPanel: React.FC<TransitionPanelProps> = ({
  onTransitionSelect,
  theme = {},
}) => {
  const [selectedTransition, setSelectedTransition] = useState(TRANSITIONS[0].type);
  const [duration, setDuration] = useState(0.5);
  const [intensity, setIntensity] = useState(50);

  const handleTransitionSelect = (transitionType: string) => {
    setSelectedTransition(transitionType);
  };

  const handleApplyTransition = () => {
    const transition: Transition = {
      id: Date.now().toString(),
      name: selectedTransition,
      duration,
      icon: selectedTransition,
    };
    onTransitionSelect(transition);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface || '#FFFFFF' }]}>
      <Text style={[styles.title, { color: theme.text || '#333' }]}>Transitions</Text>

      {/* Transition Selection */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>Choose Transition</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.transitionRow}
        >
          {TRANSITIONS.map((trans) => (
            <TouchableOpacity
              key={trans.id}
              style={[
                styles.transitionItem,
                selectedTransition === trans.type && [
                  styles.transitionItemSelected,
                  { backgroundColor: theme.accent || '#1E88E5' },
                ],
              ]}
              onPress={() => handleTransitionSelect(trans.type)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.transitionIcon,
                  {
                    color: selectedTransition === trans.type ? '#fff' : theme.text || '#333',
                  },
                ]}
              >
                {trans.icon}
              </Text>
              <Text
                style={[
                  styles.transitionLabel,
                  {
                    color: selectedTransition === trans.type ? '#fff' : theme.text || '#333',
                  },
                ]}
              >
                {trans.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Duration Slider */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>Duration</Text>
        <View style={styles.valueDisplay}>
          <Text style={[styles.valueText, { color: theme.accent || '#1E88E5' }]}>
            {(duration * 1000).toFixed(0)} ms
          </Text>
        </View>
        <StandardSlider
          value={duration * 100}
          onChange={(val) => setDuration(val / 100)}
          min={0}
          max={300}
          step={10}
          color={theme.accent || '#1E88E5'}
          backgroundColor={theme.border || '#E0E0E0'}
        />
      </View>

      {/* Intensity Slider */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>Intensity</Text>
        <View style={styles.valueDisplay}>
          <Text style={[styles.valueText, { color: theme.accent || '#1E88E5' }]}>
            {intensity}%
          </Text>
        </View>
        <StandardSlider
          value={intensity}
          onChange={setIntensity}
          min={0}
          max={100}
          step={5}
          color={theme.accent || '#1E88E5'}
          backgroundColor={theme.border || '#E0E0E0'}
        />
      </View>

      {/* Preview & Apply */}
      <View
        style={[
          styles.previewBox,
          {
            backgroundColor: theme.background || '#F5F5F5',
            borderColor: theme.border || '#E0E0E0',
          },
        ]}
      >
        <Text style={[styles.previewText, { color: theme.text || '#666' }]}>
          Transition Preview
        </Text>
        <Text style={[styles.previewDetail, { color: theme.textSecondary || '#999' }]}>
          {selectedTransition} • {(duration * 1000).toFixed(0)} ms
        </Text>
      </View>

      {/* Apply Button */}
      <TouchableOpacity
        style={[styles.applyButton, { backgroundColor: theme.accent || '#1E88E5' }]}
        onPress={handleApplyTransition}
      >
        <Text style={styles.applyButtonText}>Apply Transition</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 10,
  },
  transitionRow: {
    gap: 10,
  },
  transitionItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 80,
  },
  transitionItemSelected: {
    borderColor: 'transparent',
  },
  transitionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  transitionLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  valueDisplay: {
    paddingVertical: 8,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '600',
  },
  previewBox: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 16,
  },
  previewText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  previewDetail: {
    fontSize: 12,
  },
  applyButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
