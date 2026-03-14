import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StandardSlider } from '../Sliders/StandardSlider';
import { StepSlider } from '../Sliders/StepSlider';

interface TextPanelProps {
  onTextAdd: (text: {
    content: string;
    fontSize: number;
    color: string;
    alignment: 'left' | 'center' | 'right';
  }) => void;
  theme?: any;
}

const FONT_SIZES = [16, 20, 24, 32, 40, 48];
const ALIGNMENTS = ['left', 'center', 'right'] as const;
const COLORS = ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

export const TextPanel: React.FC<TextPanelProps> = ({
  onTextAdd,
  theme = {},
}) => {
  const [textContent, setTextContent] = useState('Enter text here');
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');

  const handleAddText = () => {
    if (textContent.trim()) {
      onTextAdd({
        content: textContent,
        fontSize,
        color: textColor,
        alignment,
      });
      setTextContent('Enter text here');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface || '#FFFFFF' }]}>
      <Text style={[styles.title, { color: theme.text || '#333' }]}>Add Text</Text>

      {/* Text Input */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>Text</Text>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: theme.background || '#F5F5F5',
              color: theme.text || '#333',
              borderColor: theme.border || '#E0E0E0',
            },
          ]}
          placeholder="Enter your text"
          placeholderTextColor="#999"
          value={textContent}
          onChangeText={setTextContent}
          multiline
          maxLength={100}
        />
      </View>

      {/* Font Size */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>Font Size</Text>
        <StepSlider
          value={fontSize}
          options={FONT_SIZES}
          onChange={(val) => setFontSize(val as number)}
          color={theme.accent || '#1E88E5'}
          backgroundColor={theme.background || '#F5F5F5'}
        />
      </View>

      {/* Text Alignment */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>Alignment</Text>
        <View style={styles.alignmentRow}>
          {ALIGNMENTS.map((align) => (
            <TouchableOpacity
              key={align}
              style={[
                styles.alignmentButton,
                alignment === align && [
                  styles.alignmentButtonSelected,
                  { backgroundColor: theme.accent || '#1E88E5' },
                ],
              ]}
              onPress={() => setAlignment(align)}
            >
              <Text
                style={[
                  styles.alignmentText,
                  { color: alignment === align ? '#fff' : theme.text || '#666' },
                ]}
              >
                {align.charAt(0).toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Color Selection */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>Color</Text>
        <View style={styles.colorRow}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorButton,
                {
                  backgroundColor: color,
                  borderWidth: textColor === color ? 3 : 1,
                  borderColor: textColor === color ? '#333' : '#CCC',
                },
              ]}
              onPress={() => setTextColor(color)}
            />
          ))}
        </View>
      </View>

      {/* Preview */}
      <View style={styles.previewContainer}>
        <Text style={[styles.label, { color: theme.text || '#666' }]}>Preview</Text>
        <View
          style={[
            styles.previewBox,
            {
              backgroundColor: theme.background || '#F5F5F5',
              borderColor: theme.border || '#E0E0E0',
            },
          ]}
        >
          <Text
            style={[
              styles.previewText,
              {
                fontSize,
                color: textColor,
                textAlign: alignment,
              },
            ]}
          >
            {textContent}
          </Text>
        </View>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.accent || '#1E88E5' }]}
        onPress={handleAddText}
      >
        <Text style={styles.addButtonText}>Add Text Layer</Text>
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
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  alignmentRow: {
    flexDirection: 'row',
    gap: 8,
  },
  alignmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  alignmentButtonSelected: {
    borderColor: 'transparent',
  },
  alignmentText: {
    fontSize: 14,
    fontWeight: '600',
  },
  colorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  previewContainer: {
    marginVertical: 16,
  },
  previewBox: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 100,
    justifyContent: 'center',
  },
  previewText: {
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
