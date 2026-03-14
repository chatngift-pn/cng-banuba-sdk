import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocale } from '../../i18n';
import type { EditorTheme, MediaAsset } from '../../types';
import { DEFAULT_THEME } from '../../utils/theme';
import { uid } from '../../utils/mockData';

export interface CameraScreenProps {
  theme?: EditorTheme;
  onCapture: (asset: MediaAsset) => void;
  onClose: () => void;
}

type CameraMode = 'photo' | 'video';
type FlashMode = 'off' | 'on' | 'auto';

export function CameraScreen({
  theme = DEFAULT_THEME,
  onCapture,
  onClose,
}: CameraScreenProps): React.JSX.Element {
  const { t } = useLocale();
  const [mode, setMode] = useState<CameraMode>('photo');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [isFront, setIsFront] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [captured, setCaptured] = useState<MediaAsset | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setRecordTime(0);
    timerRef.current = setInterval(() => {
      setRecordTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const asset: MediaAsset = {
      id: uid(),
      uri: `mock://camera/video_${Date.now()}`,
      type: 'video',
      name: `recording_${Date.now()}.mp4`,
      duration: recordTime || 1,
      width: 1080,
      height: 1920,
    };
    setCaptured(asset);
  };

  const capturePhoto = () => {
    const asset: MediaAsset = {
      id: uid(),
      uri: `mock://camera/photo_${Date.now()}`,
      type: 'image',
      name: `photo_${Date.now()}.jpg`,
      width: 1080,
      height: 1920,
    };
    setCaptured(asset);
  };

  const handleCapture = () => {
    if (mode === 'video') {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    } else {
      capturePhoto();
    }
  };

  const handleRetake = () => {
    setCaptured(null);
    setRecordTime(0);
  };

  const handleUse = () => {
    if (captured) {
      onCapture(captured);
    }
  };

  const flashIcon = flash === 'off' ? '⚡' : flash === 'on' ? '⚡' : '⚡';
  const flashLabel = flash === 'off' ? 'Off' : flash === 'on' ? 'On' : 'Auto';

  const cycleFlash = () => {
    setFlash((prev) =>
      prev === 'off' ? 'on' : prev === 'on' ? 'auto' : 'off',
    );
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  // Captured preview state
  if (captured) {
    return (
      <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
        <View style={styles.previewContainer}>
          <View style={[styles.previewPlaceholder, { backgroundColor: theme.surfaceAlt }]}>
            <Text style={styles.previewIcon}>
              {captured.type === 'video' ? '🎬' : '🖼'}
            </Text>
            <Text style={[styles.previewLabel, { color: theme.text }]}>
              {captured.name}
            </Text>
            {captured.duration != null && (
              <Text style={[styles.previewDuration, { color: theme.textSecondary }]}>
                {formatTime(captured.duration)}
              </Text>
            )}
          </View>
        </View>
        <View style={[styles.previewActions, { backgroundColor: theme.surface }]}>
          <TouchableOpacity
            style={[styles.actionBtn, { borderColor: theme.border }]}
            onPress={handleRetake}
          >
            <Text style={[styles.actionBtnText, { color: theme.text }]}>
              ↺ {t.camera_retake}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: theme.accent, borderColor: theme.accent }]}
            onPress={handleUse}
          >
            <Text style={[styles.actionBtnText, { color: '#fff' }]}>
              ✓ {t.camera_useMedia}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onClose}>
          <Text style={[styles.topBtn, { color: theme.text }]}>✕</Text>
        </TouchableOpacity>
        <Text style={[styles.topTitle, { color: theme.text }]}>{t.camera_title}</Text>
        <TouchableOpacity onPress={cycleFlash}>
          <Text style={[styles.topBtn, { color: flash === 'off' ? theme.textSecondary : theme.accent }]}>
            {flashIcon} {flashLabel}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Camera viewfinder placeholder */}
      <View style={[styles.viewfinder, { backgroundColor: '#111' }]}>
        <Text style={styles.viewfinderIcon}>📷</Text>
        <Text style={[styles.viewfinderLabel, { color: theme.textSecondary }]}>
          {isFront ? '🤳 Front Camera' : '📸 Back Camera'}
        </Text>
        {isRecording && (
          <View style={styles.recBadge}>
            <View style={styles.recDot} />
            <Text style={styles.recText}>{formatTime(recordTime)}</Text>
          </View>
        )}
      </View>

      {/* Mode selector */}
      <View style={[styles.modeRow, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[
            styles.modeBtn,
            mode === 'photo' && { borderBottomColor: theme.accent },
          ]}
          onPress={() => !isRecording && setMode('photo')}
        >
          <Text
            style={[
              styles.modeText,
              { color: mode === 'photo' ? theme.accent : theme.textSecondary },
            ]}
          >
            📷 {t.camera_photo}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeBtn,
            mode === 'video' && { borderBottomColor: theme.accent },
          ]}
          onPress={() => !isRecording && setMode('video')}
        >
          <Text
            style={[
              styles.modeText,
              { color: mode === 'video' ? theme.accent : theme.textSecondary },
            ]}
          >
            🎬 {t.camera_video}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom controls */}
      <View style={[styles.controls, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={styles.sideBtn}
          onPress={() => {}}
        >
          <Text style={{ fontSize: 11, color: theme.textSecondary }}>
            ⏱ {t.camera_timer}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.captureBtn,
            mode === 'video' && isRecording
              ? { backgroundColor: theme.danger }
              : { backgroundColor: theme.accent },
          ]}
          onPress={handleCapture}
        >
          {mode === 'video' && isRecording ? (
            <View style={styles.stopSquare} />
          ) : (
            <View style={[styles.captureInner, mode === 'video' && styles.captureInnerVideo]} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBtn}
          onPress={() => setIsFront((prev) => !prev)}
        >
          <Text style={{ fontSize: 22 }}>🔄</Text>
          <Text style={{ fontSize: 10, color: theme.textSecondary }}>{t.camera_flip}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  topBtn: { fontSize: 15, fontWeight: '600' },
  topTitle: { fontSize: 16, fontWeight: '700' },
  viewfinder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  viewfinderIcon: { fontSize: 80 },
  viewfinderLabel: { fontSize: 14 },
  recBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000080',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 8,
    position: 'absolute',
    top: 16,
  },
  recDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
  },
  recText: { color: '#fff', fontSize: 14, fontWeight: '700', fontVariant: ['tabular-nums'] },
  modeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 8,
  },
  modeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  modeText: { fontSize: 14, fontWeight: '600' },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingBottom: 30,
  },
  sideBtn: { alignItems: 'center', width: 60, gap: 4 },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff40',
  },
  captureInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  },
  captureInnerVideo: {
    backgroundColor: '#FF0000',
  },
  stopSquare: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewPlaceholder: {
    width: '80%',
    aspectRatio: 9 / 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  previewIcon: { fontSize: 64 },
  previewLabel: { fontSize: 14, fontWeight: '600' },
  previewDuration: { fontSize: 12 },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  actionBtn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28,
    borderWidth: 1.5,
  },
  actionBtnText: { fontSize: 16, fontWeight: '700' },
});
