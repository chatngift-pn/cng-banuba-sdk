import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { PanelHeader } from '../common';
import { uid } from '../../utils/mockData';
import type { MediaAsset } from '../../types';

// Fake media library entries to simulate photo/video picker
const MOCK_LIBRARY: MediaAsset[] = [
  { id: 'mv1', uri: 'mock://video/1', type: 'video', name: 'beach_sunset.mp4', duration: 15, width: 1080, height: 1920 },
  { id: 'mv2', uri: 'mock://video/2', type: 'video', name: 'city_timelapse.mp4', duration: 30, width: 1920, height: 1080 },
  { id: 'mv3', uri: 'mock://video/3', type: 'video', name: 'dancing_clip.mp4', duration: 8, width: 1080, height: 1920 },
  { id: 'mi1', uri: 'mock://image/1', type: 'image', name: 'portrait_photo.jpg', width: 1080, height: 1350 },
  { id: 'mi2', uri: 'mock://image/2', type: 'image', name: 'landscape_shot.jpg', width: 4000, height: 3000 },
  { id: 'mi3', uri: 'mock://image/3', type: 'image', name: 'food_pic.jpg', width: 1080, height: 1080 },
  { id: 'mi4', uri: 'mock://image/4', type: 'image', name: 'selfie_01.jpg', width: 1080, height: 1920 },
  { id: 'mv4', uri: 'mock://video/4', type: 'video', name: 'travel_vlog.mp4', duration: 60, width: 1920, height: 1080 },
  { id: 'mi5', uri: 'mock://image/5', type: 'image', name: 'concert_night.jpg', width: 2048, height: 1536 },
];

export function MediaPicker(): React.JSX.Element {
  const { theme, closeTool, addMediaAsset } = useEditor();

  const handleSelect = (asset: MediaAsset) => {
    addMediaAsset({ ...asset, id: uid() });
    closeTool();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <PanelHeader title="Add Media" onClose={closeTool} />

      <FlatList
        data={MOCK_LIBRARY}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <MediaTile asset={item} onPress={() => handleSelect(item)} />
        )}
      />
    </View>
  );
}

interface MediaTileProps {
  asset: MediaAsset;
  onPress: () => void;
}

function MediaTile({ asset, onPress }: MediaTileProps): React.JSX.Element {
  const { theme } = useEditor();
  return (
    <TouchableOpacity
      style={[
        styles.tile,
        { backgroundColor: theme.surfaceAlt, borderColor: theme.border },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.thumb}>
        <Text style={styles.thumbIcon}>{asset.type === 'video' ? '🎬' : '🖼'}</Text>
      </View>
      {asset.type === 'video' && (
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>
            {asset.duration ? `${asset.duration}s` : ''}
          </Text>
        </View>
      )}
      <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
        {asset.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  grid: { padding: 8, paddingBottom: 32 },
  tile: {
    flex: 1,
    margin: 4,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  thumb: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  thumbIcon: { fontSize: 36 },
  durationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#000A',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: { color: '#fff', fontSize: 9, fontWeight: '600' },
  name: { fontSize: 9, padding: 5, fontWeight: '500' },
});
