import React, { useRef } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import { useEditor } from '../../context/EditorContext';

interface ToolButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  isActive?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export function ToolButton({
  icon,
  label,
  onPress,
  isActive = false,
  style,
  disabled = false,
  size = 'md',
}: ToolButtonProps): React.JSX.Element {
  const { theme } = useEditor();
  const small = size === 'sm';

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        small && styles.btnSm,
        isActive && { backgroundColor: theme.surfaceAlt },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.icon, small && styles.iconSm, isActive && { color: theme.accent }]}>
        {icon}
      </Text>
      <Text
        style={[
          styles.label,
          small && styles.labelSm,
          { color: isActive ? theme.accent : theme.textSecondary },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

interface PanelHeaderProps {
  title: string;
  onClose: () => void;
  rightAction?: React.ReactNode;
}

export function PanelHeader({ title, onClose, rightAction }: PanelHeaderProps): React.JSX.Element {
  const { theme } = useEditor();
  return (
    <View style={[styles.panelHeader, { borderBottomColor: theme.border }]}>
      <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={[styles.closeBtn, { color: theme.text }]}>✕</Text>
      </TouchableOpacity>
      <Text style={[styles.panelTitle, { color: theme.text }]}>{title}</Text>
      <View style={styles.rightSlot}>{rightAction}</View>
    </View>
  );
}

interface SliderRowProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onValueChange: (v: number) => void;
  formatValue?: (v: number) => string;
}

export function SliderRow({
  label,
  value,
  min = -1,
  max = 1,
  onValueChange,
  formatValue,
}: SliderRowProps): React.JSX.Element {
  const { theme } = useEditor();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <View style={styles.sliderRow}>
      <View style={styles.sliderLabelRow}>
        <Text style={[styles.sliderLabel, { color: theme.text }]}>{label}</Text>
        <Text style={[styles.sliderValue, { color: theme.accent }]}>
          {formatValue ? formatValue(value) : Math.round(value * 100)}
        </Text>
      </View>
      {/* Native Slider substitute (draggable track) */}
      <SliderTrack value={pct} min={0} max={100} onValueChange={(pctNew) => {
        onValueChange(min + (pctNew / 100) * (max - min));
      }} />
    </View>
  );
}

interface SliderTrackProps {
  value: number; // 0–100
  min: number;
  max: number;
  onValueChange: (v: number) => void;
}

function SliderTrack({ value, onValueChange }: SliderTrackProps): React.JSX.Element {
  const { theme } = useEditor();
  const trackWidthRef = useRef<number>(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    trackWidthRef.current = e.nativeEvent.layout.width;
  };

  const computeValue = (e: GestureResponderEvent) => {
    const trackW = trackWidthRef.current;
    if (trackW <= 0) return;
    const localX = e.nativeEvent.locationX;
    const newPct = Math.min(100, Math.max(0, (localX / trackW) * 100));
    onValueChange(newPct);
  };

  return (
    <View
      style={[styles.trackOuter, { backgroundColor: theme.border }]}
      onLayout={handleLayout}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={computeValue}
      onResponderMove={computeValue}
    >
      <View
        style={[
          styles.trackFill,
          { width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: theme.accent },
        ]}
      />
      <View
        style={[
          styles.trackThumb,
          {
            left: `${Math.min(96, Math.max(0, value))}%`,
            backgroundColor: theme.accent,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 56,
    borderRadius: 8,
  },
  btnSm: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    minWidth: 44,
  },
  disabled: { opacity: 0.35 },
  icon: { fontSize: 22 },
  iconSm: { fontSize: 18 },
  label: { fontSize: 10, marginTop: 3, textAlign: 'center' },
  labelSm: { fontSize: 9, marginTop: 2 },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  closeBtn: { fontSize: 16, fontWeight: '600', width: 32 },
  panelTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '600' },
  rightSlot: { width: 32, alignItems: 'flex-end' },
  sliderRow: { marginBottom: 16 },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderLabel: { fontSize: 14 },
  sliderValue: { fontSize: 13, fontWeight: '600' },
  trackOuter: {
    height: 4,
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 2,
  },
  trackThumb: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    top: -7,
    marginLeft: -9,
  },
});
