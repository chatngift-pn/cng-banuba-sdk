import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  onApply?: () => void;
  onCancel?: () => void;
  title?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  height?: number | string;
  snapPoints?: number[];
  showDragHandle?: boolean;
  showActions?: boolean;
  theme?: any;
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  onApply,
  onCancel,
  title,
  children,
  backgroundColor = '#FFFFFF',
  height = '70%',
  snapPoints = [100, 300, 500],
  showDragHandle = true,
  showActions = true,
  theme = {},
}) => {
  const panY = useRef(new Animated.Value(0)).current;
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(visible);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt: GestureResponderEvent, state: PanResponderGestureState) => {
        // Only allow downward movement to close
        if (state.dy > 0) {
          panY.setValue(state.dy);
        }
      },
      onPanResponderRelease: (evt: GestureResponderEvent, state: PanResponderGestureState) => {
        // Close if dragged down more than 50px or velocity is high
        if (state.dy > 50 || state.vy > 0.5) {
          handleClose();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleClose = () => {
    setIsBottomSheetOpen(false);
    onClose();
  };

  const handleApply = () => {
    if (onApply) {
      onApply();
    }
    handleClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    handleClose();
  };

  const animatedStyle = {
    transform: [{ translateY: panY }],
  };

  return (
    <Modal
      visible={visible && isBottomSheetOpen}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={handleClose}
      />

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          {
            height,
            backgroundColor,
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Drag Handle */}
        {showDragHandle && (
          <View style={styles.dragHandleContainer}>
            <View
              style={[
                styles.dragHandle,
                {
                  backgroundColor: theme.border || '#CCCCCC',
                },
              ]}
            />
          </View>
        )}

        {/* Title */}
        {title && (
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.text || '#333',
                },
              ]}
            >
              {title}
            </Text>
          </View>
        )}

        {/* Content */}
        <View style={styles.contentContainer}>
          {children}
        </View>

        {/* Action Buttons */}
        {showActions && (
          <View
            style={[
              styles.actionsContainer,
              {
                borderTopColor: theme.border || '#E0E0E0',
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.cancelButton,
                {
                  backgroundColor: theme.background || '#F5F5F5',
                },
              ]}
              onPress={handleCancel}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  {
                    color: theme.text || '#333',
                  },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.applyButton,
                {
                  backgroundColor: theme.accent || '#1E88E5',
                },
              ]}
              onPress={handleApply}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  {
                    color: '#FFFFFF',
                  },
                ]}
              >
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 100,
  },
  dragHandleContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  applyButton: {},
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
