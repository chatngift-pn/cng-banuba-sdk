import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { MOCK_TRANSITIONS } from '../../utils/mockData';
import { PanelHeader } from '../common';
import type { Transition } from '../../types';

export function TransitionPanel(): React.JSX.Element {
  const { theme, closeTool, selectedClip, setTransition, state } = useEditor();

  const currentTransitionId = selectedClip?.transition?.id ?? 'none';

  const handleSelect = (transition: Transition) => {
    if (!selectedClip) return;
    setTransition(selectedClip.id, transition);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <PanelHeader title="Transitions" onClose={closeTool} />

      <FlatList
        data={MOCK_TRANSITIONS}
        keyExtractor={(t) => t.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.tile,
              { backgroundColor: theme.surfaceAlt, borderColor: theme.border },
              currentTransitionId === item.id && {
                borderColor: theme.accent,
                backgroundColor: theme.accent + '15',
              },
            ]}
            onPress={() => handleSelect(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text
              style={[
                styles.name,
                { color: currentTransitionId === item.id ? theme.accent : theme.text },
              ]}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            {item.id !== 'none' && (
              <Text style={[styles.dur, { color: theme.textSecondary }]}>
                {item.duration}s
              </Text>
            )}
          </TouchableOpacity>
        )}
      />

      {!selectedClip && (
        <Text style={[styles.hint, { color: theme.textSecondary }]}>
          Select a clip to set its outgoing transition
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, gap: 10 },
  tile: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  icon: { fontSize: 24, marginBottom: 4 },
  name: { fontSize: 10, fontWeight: '600', textAlign: 'center' },
  dur: { fontSize: 9, marginTop: 2 },
  hint: { textAlign: 'center', padding: 12, fontSize: 13 },
});
