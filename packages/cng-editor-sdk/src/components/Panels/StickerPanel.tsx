import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Grid,
} from 'react-native';

interface StickerPanelProps {
  onStickerSelect: (sticker: {
    id: string;
    name: string;
    emoji: string;
  }) => void;
  theme?: any;
}

const STICKER_CATEGORIES = {
  emoji: ['😊', '😂', '😍', '🤔', '😎', '🤗', '😴', '😤'],
  objects: ['🎉', '🎈', '🎁', '🎂', '💡', '⭐', '🌟', '✨'],
  shapes: ['❤️', '💛', '💚', '💙', '💜', '🔥', '✅', '❌'],
  nature: ['🌸', '🌺', '🌻', '🍀', '🌈', '☀️', '🌙', '⛅'],
};

export const StickerPanel: React.FC<StickerPanelProps> = ({
  onStickerSelect,
  theme = {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState('emoji');
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  const handleStickerSelect = (emoji: string) => {
    setSelectedSticker(emoji);
    onStickerSelect({
      id: Date.now().toString(),
      name: emoji,
      emoji,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface || '#FFFFFF' }]}>
      <Text style={[styles.title, { color: theme.text || '#333' }]}>Stickers</Text>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryTabs}
      >
        {Object.keys(STICKER_CATEGORIES).map((cat) => (
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
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sticker Grid */}
      <ScrollView
        contentContainerStyle={styles.stickerGrid}
        showsVerticalScrollIndicator={false}
      >
        {STICKER_CATEGORIES[selectedCategory as keyof typeof STICKER_CATEGORIES].map((sticker) => (
          <TouchableOpacity
            key={sticker}
            style={[
              styles.stickerItem,
              selectedSticker === sticker && [
                styles.stickerItemSelected,
                { borderColor: theme.accent || '#1E88E5' },
              ],
            ]}
            onPress={() => handleStickerSelect(sticker)}
          >
            <Text style={styles.stickerEmoji}>{sticker}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Info */}
      <View
        style={[
          styles.infoBox,
          {
            backgroundColor: theme.background || '#F5F5F5',
            borderColor: theme.border || '#E0E0E0',
          },
        ]}
      >
        <Text style={[styles.infoText, { color: theme.textSecondary || '#999' }]}>
          Tap to add sticker to your clip. Stickers can be scaled and positioned on the canvas.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  categoryTabs: {
    gap: 8,
    marginBottom: 16,
    paddingRight: 16,
  },
  categoryTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
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
  stickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 16,
  },
  stickerItem: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickerItemSelected: {
    borderWidth: 2,
  },
  stickerEmoji: {
    fontSize: 40,
    textAlign: 'center',
  },
  infoBox: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 16,
  },
});
