import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';
import { MOCK_MUSIC_TRACKS, MOCK_SOUND_EFFECTS } from '../../utils/mockData';
import { PanelHeader, SliderRow } from '../common';
import { uid } from '../../utils/mockData';
import type { MediaAsset } from '../../types';

type AudioTab = 'music' | 'voiceover' | 'sounds';

const TABS: { id: AudioTab; label: string; icon: string }[] = [
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'voiceover', label: 'Voice', icon: '🎤' },
  { id: 'sounds', label: 'Effects', icon: '🔊' },
];

export function AudioPanel(): React.JSX.Element {
  const { theme, closeTool, state, addAudioAsset, removeAudioTrack, updateAudioTrack } =
    useEditor();
  const [activeTab, setActiveTab] = useState<AudioTab>('music');

  const handleAddMockTrack = (track: { id: string; name: string; artist: string; duration: number }) => {
    const asset: MediaAsset = {
      id: uid(),
      uri: `mock://music/${track.id}`,
      type: 'audio',
      name: track.name,
      duration: track.duration,
    };
    addAudioAsset(asset);
  };

  const handleAddSoundEffect = (se: { id: string; name: string; duration: number }) => {
    const asset: MediaAsset = {
      id: uid(),
      uri: `mock://sfx/${se.id}`,
      type: 'audio',
      name: se.name,
      duration: se.duration,
    };
    addAudioAsset(asset);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <PanelHeader title="Audio" onClose={closeTool} />

      {/* Tabs */}
      <View style={[styles.tabs, { borderBottomColor: theme.border }]}>
        {TABS.map(({ id, label, icon }) => (
          <TouchableOpacity
            key={id}
            style={[
              styles.tab,
              activeTab === id && { borderBottomColor: theme.accent },
            ]}
            onPress={() => setActiveTab(id)}
          >
            <Text style={{ fontSize: 16 }}>{icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                { color: activeTab === id ? theme.accent : theme.textSecondary },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Active audio tracks */}
        {state.project.audioTracks.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              ADDED TRACKS
            </Text>
            {state.project.audioTracks.map((track) => (
              <View
                key={track.id}
                style={[styles.trackRow, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}
              >
                <Text style={styles.trackIcon}>🎵</Text>
                <View style={styles.trackInfo}>
                  <Text style={[styles.trackName, { color: theme.text }]} numberOfLines={1}>
                    {track.asset.name}
                  </Text>
                  <SliderRow
                    label="Vol"
                    value={track.volume}
                    min={0}
                    max={1}
                    onValueChange={(v) => updateAudioTrack(track.id, { volume: v })}
                    formatValue={(v) => `${Math.round(v * 100)}%`}
                  />
                </View>
                <TouchableOpacity onPress={() => removeAudioTrack(track.id)}>
                  <Text style={[styles.removeBtn, { color: theme.danger }]}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'music' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              RECOMMENDED
            </Text>
            {MOCK_MUSIC_TRACKS.map((track) => (
              <TouchableOpacity
                key={track.id}
                style={[styles.musicRow, { borderColor: theme.border }]}
                onPress={() => handleAddMockTrack(track)}
                activeOpacity={0.8}
              >
                <View style={[styles.musicThumb, { backgroundColor: theme.surfaceAlt }]}>
                  <Text style={{ fontSize: 20 }}>🎵</Text>
                </View>
                <View style={styles.musicInfo}>
                  <Text style={[styles.musicName, { color: theme.text }]}>{track.name}</Text>
                  <Text style={[styles.musicArtist, { color: theme.textSecondary }]}>
                    {track.artist} · {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                  </Text>
                </View>
                <Text style={[styles.addIcon, { color: theme.accent }]}>＋</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'voiceover' && (
          <View style={[styles.voiceover, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
            <Text style={{ fontSize: 40 }}>🎤</Text>
            <Text style={[styles.voiceLabel, { color: theme.text }]}>Record Voice-Over</Text>
            <Text style={[styles.voiceSub, { color: theme.textSecondary }]}>
              Tap the mic button to start recording
            </Text>
            <TouchableOpacity
              style={[styles.micBtn, { backgroundColor: theme.accent }]}
              onPress={() => {/* fake – recording not implemented */}}
            >
              <Text style={styles.micBtnText}>🎙 Record</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'sounds' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              SOUND EFFECTS
            </Text>
            <View style={styles.seGrid}>
              {MOCK_SOUND_EFFECTS.map((se) => (
                <TouchableOpacity
                  key={se.id}
                  style={[styles.seTile, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}
                  onPress={() => handleAddSoundEffect(se)}
                >
                  <Text style={{ fontSize: 28 }}>{se.icon}</Text>
                  <Text style={[styles.seName, { color: theme.text }]}>{se.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: 2,
  },
  tabLabel: { fontSize: 11, fontWeight: '600' },
  scroll: { padding: 16, paddingBottom: 32 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 10 },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 8,
    gap: 10,
  },
  trackIcon: { fontSize: 24 },
  trackInfo: { flex: 1 },
  trackName: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  removeBtn: { fontSize: 18, padding: 4 },
  musicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  musicThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicInfo: { flex: 1 },
  musicName: { fontSize: 14, fontWeight: '600' },
  musicArtist: { fontSize: 11, marginTop: 2 },
  addIcon: { fontSize: 22, fontWeight: '600' },
  voiceover: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
  },
  voiceLabel: { fontSize: 16, fontWeight: '700' },
  voiceSub: { fontSize: 12, textAlign: 'center' },
  micBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 8,
  },
  micBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  seGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  seTile: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  seName: { fontSize: 11, fontWeight: '600' },
});
