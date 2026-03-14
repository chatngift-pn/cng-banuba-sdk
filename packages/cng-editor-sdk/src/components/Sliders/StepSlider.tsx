import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

interface StepSliderProps {
  value: string | number;
  options: (string | number)[];
  onChange: (value: string | number) => void;
  color?: string;
  backgroundColor?: string;
  textColor?: string;
  selectedTextColor?: string;
}

export const StepSlider: React.FC<StepSliderProps> = ({
  value,
  options,
  onChange,
  color = '#1E88E5',
  backgroundColor = '#F5F5F5',
  textColor = '#666',
  selectedTextColor = '#fff',
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.stepContainer, { backgroundColor }]}>
        {options.map((option, index) => {
          const isSelected = value === option;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.stepButton,
                isSelected && [styles.stepButtonSelected, { backgroundColor: color }],
              ]}
              onPress={() => onChange(option)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.stepText,
                  {
                    color: isSelected ? selectedTextColor : textColor,
                    fontWeight: isSelected ? '600' : '500',
                  },
                ]}
              >
                {String(option)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stepContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    gap: 8,
    padding: 4,
  },
  stepButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 36,
  },
  stepButtonSelected: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  stepText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
