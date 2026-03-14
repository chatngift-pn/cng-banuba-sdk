import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StandardSlider } from '../Sliders/StandardSlider';

interface AudioPanelProps {
  onAudioAdd: (audio: {
    type: 'music' | 'voiceover' | 'sound-effect';
    name: string;
    volume: number;
  }) => void;
  theme?: any;
}

const AUDIO_CATEGORIES = {
  music: ['Lo-Fi Beat', 'Electronic Pop', 'Ambient', 'Hip-Hop', 'Dance'],
  voiceover: ['Clear Voice', 'Narrator', 'Commercial', 'Dialogue'],
  'sound-effect': ['Whoosh', 'Pop', 'Transition', 'Bell', 'Click'],
};

export const AudioPanel: React.FC<AudioPanelProps> = ({
  onAudioAdd,
  theme = {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'music' | 'voiceover' | 'sound-effect'>('music');
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [volume, setVolume] = useState(80);

  const handleAudioSelect = (audioName: string) => {
    setSelectedAudio(audioName);
  };

  const handleAddAudio = () => {
    if (selectedAudio) {
      onAudioAdd({
        type: selectedCategory,
        name: selectedAudio,
        volume: volume / 100,
      });
      setSelectedAudio(null);
      setVolume(80);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface || '#FFFFFF' }]}>
      <Text style={[styles.title, { color: theme.text || '#333' }]}>Add Audio</Text>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        {(Object.keys(AUDIO_CATEGORIES) as Array<'music' | 'voiceover' | 'sound-effect'>).map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryTab,
              selectedCategory === cat && [
                styles.categoryTabActive,
                { backgroundColor: theme.accent || '#1E88E5' },
              ],
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryTabText,
                {
                  color: selectedCategory === cat ? '#fff' : theme.text || '#666',
                  fontWeight: selectedCategory === cat ? '600' : '500',
                },
              ]}
            >
              {cat === 'sound-effect' ? 'SFX' : cat === 'music' ? 'Music' : 'Voice'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Audio List */}
      <View style={styles.audioList}>
        {AUDIO_CATEGORIES[selectedCategory].map((audio) => (
          <TouchableOpacity
            key={audio}
            style={[
              styles.audioItem,
              selectedAudio === audio && [
                styles.audioItemSelected,
                { borderColor: theme.accent || '#1E88E5' },
              ],
            ]}
            onPress={() => handleAudioSelect(audio)}
          >
            <View
              style={[
                styles.audioIcon,
                {
                  backgroundColor: selectedAudio === audio ? theme.accent || '#1E88E5' : theme.background || '#F5F5F5',
                },
              ]}
            >
              <Text
                style={[
                  styles.audioIconText,
                  { color: selectedAudio === audio ? '#fff' : theme.text || '#333' },
                ]}
              >
                ♪
              </Text>
            </View>
            <View style={styles.audioInfo}>
              <Text style={[styles.audioName, { color: theme.text || '#333' }]}>
                {audio}
              </Text>
              <Text style={[styles.audioDuration, { color: theme.textSecondary || '#999' }]}>
                {selectedCategory === 'music' ? '2:34' : selectedCategory === 'voiceover' ? '0:45' : '0:10'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Volume Control */}
      {selectedAudio && (
        <View style={styles.controlSection}>
          <Text style={[styles.label, { color: theme.text || '#666' }]}>Volume</Text>
          <View style={styles.volumeDisplay}>
            <Text style={[styles.volumeValue, { color: theme.accent || '#1E88E5' }]}>
              {volume}%
            </Text>
          </View>
          <StandardSlider
            value={volume}
            onChange={setVolume}
            min={0}
            max={100}
            step={5}
            color={theme.accent || '#1E88E5'}
            backgroundColor={theme.border || '#E0E0E0'}
          />
        </View>
      )}

      {/* Add Button */}
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: selectedAudio ? theme.accent || '#1E88E5' : '#CCC',
            opacity: selectedAudio ? 1 : 0.6,
          },
        ]}
        onPress={handleAddAudio}
        disabled={!selectedAudio}
      >
        <Text style={styles.addButtonText}>Add to Timeline</Text>
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
  categoryTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryTabActive: {
    borderColor: 'transparent',
  },
  categoryTabText: {
    fontSize: 12,
  },
  audioList: {
    marginBottom: 20,
  },
  audioItem: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#F5F5F5',
  },
  audioItemSelected: {
    borderWidth: 2,
  },
  audioIcon: {
    width: 44,
    height: 44,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  audioIconText: {
    fontSize: 20,
  },
  audioInfo: {
    flex: 1,
  },
  audioName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  audioDuration: {
    fontSize: 12,
  },
  controlSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  volumeDisplay: {
    paddingVertical: 8,
  },
  volumeValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
