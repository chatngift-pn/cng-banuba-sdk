import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { EditorModal } from 'cng-editor-sdk';

const FEATURES = [
  { icon: '🎬', title: 'Video Editing', desc: 'Trim, cut, split & reorder clips' },
  { icon: '🖼', title: 'Photo Editing', desc: 'Crop, rotate & enhance photos' },
  { icon: '🎵', title: 'Audio', desc: 'Add music, voice-over & sound effects' },
  { icon: '✨', title: 'Filters', desc: '12+ cinematic filters with intensity control' },
  { icon: '🎚', title: 'Adjustments', desc: 'Brightness, contrast, saturation & more' },
  { icon: '🔤', title: 'Text Overlays', desc: 'Animated text with custom fonts & colors' },
  { icon: '😊', title: 'Stickers', desc: 'Emoji & sticker overlays' },
  { icon: '🔀', title: 'Transitions', desc: '12 transition effects between clips' },
  { icon: '⚡', title: 'Speed Control', desc: '0.25× slow-mo to 16× fast forward' },
  { icon: '⬆', title: 'Export', desc: '480p – 4K, MP4/MOV/GIF' },
];

export default function HomeScreen(): React.JSX.Element {
  const [editorVisible, setEditorVisible] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>🎞</Text>
          <Text style={styles.heroTitle}>CNG Editor SDK</Text>
          <Text style={styles.heroSub}>CapCut-inspired editor for React Native</Text>

          <TouchableOpacity
            style={styles.openBtn}
            onPress={() => setEditorVisible(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.openBtnText}>▶ Open Editor</Text>
          </TouchableOpacity>
        </View>

        {/* Badge row */}
        <View style={styles.badges}>
          {['TypeScript', 'React Native', 'iOS', 'Android', 'Yarn'].map((b) => (
            <View key={b} style={styles.badge}>
              <Text style={styles.badgeText}>{b}</Text>
            </View>
          ))}
        </View>

        {/* Feature list */}
        <Text style={styles.featuresTitle}>Features</Text>
        {FEATURES.map(({ icon, title, desc }) => (
          <View key={title} style={styles.featureRow}>
            <Text style={styles.featureIcon}>{icon}</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>{title}</Text>
              <Text style={styles.featureDesc}>{desc}</Text>
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>cng-editor-sdk v0.1.0</Text>
          <Text style={styles.footerSub}>Install: yarn add cng-editor-sdk</Text>
        </View>
      </ScrollView>

      {/* Editor Modal */}
      <EditorModal
        visible={editorVisible}
        config={{ onClose: () => setEditorVisible(false) }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  scroll: { padding: 20, paddingBottom: 40 },
  hero: { alignItems: 'center', paddingVertical: 32, gap: 8 },
  heroIcon: { fontSize: 64 },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  heroSub: { fontSize: 14, color: '#888', marginBottom: 16 },
  openBtn: {
    backgroundColor: '#FE2C55',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 8,
  },
  openBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  badge: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  badgeText: { color: '#aaa', fontSize: 11, fontWeight: '600' },
  featuresTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 16,
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#222',
  },
  featureIcon: { fontSize: 28 },
  featureText: { flex: 1 },
  featureTitle: { color: '#fff', fontSize: 14, fontWeight: '600', marginBottom: 2 },
  featureDesc: { color: '#666', fontSize: 12 },
  footer: { alignItems: 'center', marginTop: 32, gap: 4 },
  footerText: { color: '#444', fontSize: 12, fontWeight: '700' },
  footerSub: { color: '#333', fontSize: 11, fontFamily: 'monospace' },
});
