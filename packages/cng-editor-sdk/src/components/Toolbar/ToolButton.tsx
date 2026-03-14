import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface ToolButtonProps {
  label: string;
  onPress: () => void;
  isActive?: boolean;
  icon?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const ToolButton: React.FC<ToolButtonProps> = ({
  label,
  onPress,
  isActive = false,
  icon,
  color = '#666',
  backgroundColor = '#F5F5F5',
  activeBackgroundColor = '#1E88E5',
  size = 'medium',
  style,
}) => {
  const sizeStyles = {
    small: { padding: 8, minWidth: 60 },
    medium: { padding: 12, minWidth: 80 },
    large: { padding: 16, minWidth: 100 },
  };

  const textSizes = {
    small: 12,
    medium: 14,
    large: 16,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        sizeStyles[size],
        {
          backgroundColor: isActive ? activeBackgroundColor : backgroundColor,
        },
        style,
      ]}
    >
      {icon && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
      <Text
        style={[
          styles.label,
          {
            fontSize: textSizes[size],
            color: isActive ? '#fff' : color,
            fontWeight: isActive ? '600' : '500',
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    flexDirection: 'row',
    gap: 6,
  },
  iconContainer: {
    marginRight: 2,
  },
  label: {
    textAlign: 'center',
  },
});
