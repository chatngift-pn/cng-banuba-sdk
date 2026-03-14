import React, { useState, useCallback, useMemo } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LocaleProvider, useLocale } from '../../i18n';
import type { Locale } from '../../i18n';
import type { CreationFlowStep, EditorConfig, EditorTheme, MediaAsset } from '../../types';
import { DEFAULT_THEME } from '../../utils/theme';
import { uid } from '../../utils/mockData';
import { EditorScreen } from '../EditorScreen';
import { CameraScreen } from '../CameraScreen';
import { SaveScreen } from '../SaveScreen';
import { useEditor } from '../../context/EditorContext';
import { EditorProvider } from '../../context/EditorContext';

// ─── Mock local gallery data ─────────────────────────────────────────────────
const MOCK_LOCAL_MEDIA: MediaAsset[] = [
  { id: 'lg1', uri: 'mock://local/video/1', type: 'video', name: 'beach_sunset.mp4', duration: 15, width: 1080, height: 1920 },
  { id: 'lg2', uri: 'mock://local/video/2', type: 'video', name: 'city_timelapse.mp4', duration: 30, width: 1920, height: 1080 },
  { id: 'lg3', uri: 'mock://local/video/3', type: 'video', name: 'dancing_clip.mp4', duration: 8, width: 1080, height: 1920 },
  { id: 'lg4', uri: 'mock://local/image/1', type: 'image', name: 'portrait_photo.jpg', width: 1080, height: 1350 },
  { id: 'lg5', uri: 'mock://local/image/2', type: 'image', name: 'landscape_shot.jpg', width: 4000, height: 3000 },
  { id: 'lg6', uri: 'mock://local/image/3', type: 'image', name: 'food_pic.jpg', width: 1080, height: 1080 },
  { id: 'lg7', uri: 'mock://local/image/4', type: 'image', name: 'selfie_01.jpg', width: 1080, height: 1920 },
  { id: 'lg8', uri: 'mock://local/video/4', type: 'video', name: 'travel_vlog.mp4', duration: 60, width: 1920, height: 1080 },
  { id: 'lg9', uri: 'mock://local/image/5', type: 'image', name: 'concert_night.jpg', width: 2048, height: 1536 },
  { id: 'lg10', uri: 'mock://local/video/5', type: 'video', name: 'cooking_timelapse.mp4', duration: 22, width: 1080, height: 1920 },
  { id: 'lg11', uri: 'mock://local/image/6', type: 'image', name: 'sunset_beach.jpg', width: 1920, height: 1080 },
  { id: 'lg12', uri: 'mock://local/video/6', type: 'video', name: 'pet_video.mp4', duration: 12, width: 1080, height: 1920 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreationFlowProps {
  config?: EditorConfig;
  /** Override default locale */
  locale?: Locale;
  /** Called when the creation flow is closed */
  onClose?: () => void;
  /** Called when export is complete */
  onComplete?: (outputUri: string) => void;
}

type MediaFilter = 'all' | 'video' | 'image';

// Step definitions for the progress indicator
const FLOW_STEPS: { key: CreationFlowStep; icon: string; labelKey: 'creationFlow_stepMedia' | 'creationFlow_stepEdit' | 'creationFlow_stepAudio' | 'creationFlow_stepSave' }[] = [
  { key: 'source-select', icon: '📂', labelKey: 'creationFlow_stepMedia' },
  { key: 'edit', icon: '✏️', labelKey: 'creationFlow_stepEdit' },
  { key: 'save', icon: '💾', labelKey: 'creationFlow_stepSave' },
];

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({
  currentStep,
  theme,
}: {
  currentStep: CreationFlowStep;
  theme: EditorTheme;
}): React.JSX.Element {
  const { t } = useLocale();

  const stepIndex = (() => {
    switch (currentStep) {
      case 'source-select':
      case 'gallery':
      case 'camera':
        return 0;
      case 'edit':
      case 'audio':
        return 1;
      case 'save':
        return 2;
      default:
        return 0;
    }
  })();

  return (
    <View style={[siStyles.container, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
      {FLOW_STEPS.map((step, i) => {
        const isActive = i === stepIndex;
        const isCompleted = i < stepIndex;
        return (
          <View key={step.key} style={siStyles.step}>
            <View
              style={[
                siStyles.dot,
                {
                  backgroundColor: isActive
                    ? theme.accent
                    : isCompleted
                      ? theme.success
                      : theme.surfaceAlt,
                  borderColor: isActive ? theme.accent : isCompleted ? theme.success : theme.border,
                },
              ]}
            >
              <Text style={siStyles.dotIcon}>
                {isCompleted ? '✓' : step.icon}
              </Text>
            </View>
            <Text
              style={[
                siStyles.stepLabel,
                {
                  color: isActive ? theme.accent : isCompleted ? theme.success : theme.textSecondary,
                },
              ]}
            >
              {t[step.labelKey]}
            </Text>
            {i < FLOW_STEPS.length - 1 && (
              <View
                style={[
                  siStyles.line,
                  {
                    backgroundColor: isCompleted ? theme.success : theme.border,
                  },
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const siStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  step: { flexDirection: 'row', alignItems: 'center' },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  dotIcon: { fontSize: 14 },
  stepLabel: { fontSize: 11, fontWeight: '600', marginLeft: 4, marginRight: 8 },
  line: { width: 24, height: 2, borderRadius: 1, marginHorizontal: 2 },
});

// ─── Source Select Step ───────────────────────────────────────────────────────

function SourceSelectStep({
  theme,
  onSelect,
}: {
  theme: EditorTheme;
  onSelect: (source: 'gallery' | 'camera' | 'blank') => void;
}): React.JSX.Element {
  const { t } = useLocale();

  const sources = [
    { id: 'gallery' as const, icon: '🖼', title: t.creationFlow_gallery, desc: t.creationFlow_galleryDesc },
    { id: 'camera' as const, icon: '📷', title: t.creationFlow_camera, desc: t.creationFlow_cameraDesc },
    { id: 'blank' as const, icon: '📄', title: t.creationFlow_blankProject, desc: t.creationFlow_blankDesc },
  ];

  return (
    <View style={ssStyles.container}>
      <Text style={[ssStyles.heading, { color: theme.text }]}>
        {t.creationFlow_selectSource}
      </Text>
      {sources.map(({ id, icon, title, desc }) => (
        <TouchableOpacity
          key={id}
          style={[ssStyles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
          onPress={() => onSelect(id)}
          activeOpacity={0.85}
        >
          <Text style={ssStyles.cardIcon}>{icon}</Text>
          <View style={ssStyles.cardText}>
            <Text style={[ssStyles.cardTitle, { color: theme.text }]}>{title}</Text>
            <Text style={[ssStyles.cardDesc, { color: theme.textSecondary }]}>{desc}</Text>
          </View>
          <Text style={[ssStyles.cardArrow, { color: theme.textSecondary }]}>›</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const ssStyles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', gap: 16 },
  heading: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  cardIcon: { fontSize: 36 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardDesc: { fontSize: 12, marginTop: 2 },
  cardArrow: { fontSize: 24, fontWeight: '300' },
});

// ─── Gallery Picker Step ──────────────────────────────────────────────────────

function GalleryPickerStep({
  theme,
  onContinue,
  onBack,
}: {
  theme: EditorTheme;
  onContinue: (assets: MediaAsset[]) => void;
  onBack: () => void;
}): React.JSX.Element {
  const { t } = useLocale();
  const [filter, setFilter] = useState<MediaFilter>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    if (filter === 'all') return MOCK_LOCAL_MEDIA;
    return MOCK_LOCAL_MEDIA.filter((a) => a.type === filter);
  }, [filter]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContinue = () => {
    const assets = MOCK_LOCAL_MEDIA.filter((a) => selected.has(a.id)).map((a) => ({
      ...a,
      id: uid(),
    }));
    onContinue(assets);
  };

  const filters: { key: MediaFilter; label: string }[] = [
    { key: 'all', label: t.mediaPicker_all },
    { key: 'video', label: t.mediaPicker_videos },
    { key: 'image', label: t.mediaPicker_images },
  ];

  return (
    <View style={gpStyles.container}>
      {/* Filter tabs */}
      <View style={[gpStyles.filterRow, { borderBottomColor: theme.border }]}>
        {filters.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[
              gpStyles.filterTab,
              filter === key && { borderBottomColor: theme.accent },
            ]}
            onPress={() => setFilter(key)}
          >
            <Text style={{ color: filter === key ? theme.accent : theme.textSecondary, fontWeight: '600', fontSize: 13 }}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={gpStyles.grid}
        renderItem={({ item }) => {
          const isSelected = selected.has(item.id);
          return (
            <TouchableOpacity
              style={[
                gpStyles.tile,
                { backgroundColor: theme.surfaceAlt, borderColor: isSelected ? theme.accent : theme.border },
                isSelected && { borderWidth: 2 },
              ]}
              onPress={() => toggleSelect(item.id)}
              activeOpacity={0.8}
            >
              <View style={gpStyles.thumb}>
                <Text style={gpStyles.thumbIcon}>{item.type === 'video' ? '🎬' : '🖼'}</Text>
              </View>
              {item.type === 'video' && (
                <View style={gpStyles.durationBadge}>
                  <Text style={gpStyles.durationText}>
                    {item.duration ? `${item.duration}s` : ''}
                  </Text>
                </View>
              )}
              {isSelected && (
                <View style={[gpStyles.checkBadge, { backgroundColor: theme.accent }]}>
                  <Text style={gpStyles.checkIcon}>✓</Text>
                </View>
              )}
              <Text style={[gpStyles.name, { color: theme.text }]} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Bottom bar */}
      <View style={[gpStyles.bottomBar, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
        <TouchableOpacity onPress={onBack}>
          <Text style={[gpStyles.backText, { color: theme.textSecondary }]}>
            ← {t.creationFlow_back}
          </Text>
        </TouchableOpacity>
        <Text style={[gpStyles.selectedCount, { color: theme.text }]}>
          {selected.size} {t.mediaPicker_selected}
        </Text>
        <TouchableOpacity
          style={[
            gpStyles.continueBtn,
            {
              backgroundColor: selected.size > 0 ? theme.accent : theme.surfaceAlt,
            },
          ]}
          onPress={handleContinue}
          disabled={selected.size === 0}
        >
          <Text style={[gpStyles.continueBtnText, { opacity: selected.size > 0 ? 1 : 0.4 }]}>
            {t.mediaPicker_continue} →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const gpStyles = StyleSheet.create({
  container: { flex: 1 },
  filterRow: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  filterTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  grid: { padding: 4, paddingBottom: 80 },
  tile: {
    flex: 1,
    margin: 4,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    maxWidth: '33%',
  },
  thumb: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  thumbIcon: { fontSize: 32 },
  durationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#000A',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: { color: '#fff', fontSize: 9, fontWeight: '600' },
  checkBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: { color: '#fff', fontSize: 12, fontWeight: '700' },
  name: { fontSize: 9, padding: 5, fontWeight: '500' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  backText: { fontSize: 14, fontWeight: '600' },
  selectedCount: { fontSize: 13, fontWeight: '600' },
  continueBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  continueBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});

// ─── Edit Step Wrapper ────────────────────────────────────────────────────────

function EditStepWrapper({
  onNext,
  onBack,
  theme,
}: {
  onNext: () => void;
  onBack: () => void;
  theme: EditorTheme;
}): React.JSX.Element {
  const { t } = useLocale();
  return (
    <View style={{ flex: 1 }}>
      {/* Navigation overlay buttons */}
      <View style={[ewStyles.navOverlay, { borderTopColor: theme.border, backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={onBack}>
          <Text style={[ewStyles.navBtn, { color: theme.textSecondary }]}>← {t.creationFlow_back}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[ewStyles.nextBtn, { backgroundColor: theme.accent }]}
          onPress={onNext}
        >
          <Text style={ewStyles.nextBtnText}>{t.creationFlow_next} →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ewStyles = StyleSheet.create({
  navOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  navBtn: { fontSize: 14, fontWeight: '600' },
  nextBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  nextBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});

// ─── Inner Flow (wrapped in EditorProvider) ───────────────────────────────────

function CreationFlowInner({
  config = {},
  onComplete,
}: {
  config: EditorConfig;
  onComplete?: (outputUri: string) => void;
}): React.JSX.Element {
  const { theme, state, addMediaAsset } = useEditor();
  const { t } = useLocale();
  const [step, setStep] = useState<CreationFlowStep>('source-select');

  const handleSourceSelect = useCallback(
    (source: 'gallery' | 'camera' | 'blank') => {
      switch (source) {
        case 'gallery':
          setStep('gallery');
          break;
        case 'camera':
          setStep('camera');
          break;
        case 'blank':
          setStep('edit');
          break;
      }
    },
    [],
  );

  const handleGalleryContinue = useCallback(
    (assets: MediaAsset[]) => {
      assets.forEach((a) => addMediaAsset(a));
      setStep('edit');
    },
    [addMediaAsset],
  );

  const handleCameraCapture = useCallback(
    (asset: MediaAsset) => {
      addMediaAsset(asset);
      setStep('edit');
    },
    [addMediaAsset],
  );

  const handleClose = useCallback(() => {
    config.onClose?.();
  }, [config]);

  return (
    <SafeAreaView style={[cfStyles.root, { backgroundColor: theme.background }]}>
      {/* Step indicator */}
      <StepIndicator currentStep={step} theme={theme} />

      {/* Step content */}
      {step === 'source-select' && (
        <View style={cfStyles.stepContent}>
          {/* Top close button */}
          <View style={[cfStyles.topBar, { borderBottomColor: theme.border }]}>
            <TouchableOpacity onPress={handleClose}>
              <Text style={[cfStyles.closeBtn, { color: theme.text }]}>✕</Text>
            </TouchableOpacity>
            <Text style={[cfStyles.title, { color: theme.text }]}>{t.creationFlow_title}</Text>
            <View style={{ width: 32 }} />
          </View>
          <SourceSelectStep theme={theme} onSelect={handleSourceSelect} />
        </View>
      )}

      {step === 'gallery' && (
        <View style={cfStyles.stepContent}>
          <View style={[cfStyles.topBar, { borderBottomColor: theme.border }]}>
            <TouchableOpacity onPress={handleClose}>
              <Text style={[cfStyles.closeBtn, { color: theme.text }]}>✕</Text>
            </TouchableOpacity>
            <Text style={[cfStyles.title, { color: theme.text }]}>{t.mediaPicker_title}</Text>
            <View style={{ width: 32 }} />
          </View>
          <GalleryPickerStep
            theme={theme}
            onContinue={handleGalleryContinue}
            onBack={() => setStep('source-select')}
          />
        </View>
      )}

      {step === 'camera' && (
        <CameraScreen
          theme={theme}
          onCapture={handleCameraCapture}
          onClose={() => setStep('source-select')}
        />
      )}

      {step === 'edit' && (
        <View style={cfStyles.stepContent}>
          <EditorScreen config={{ ...config, onClose: undefined }} />
          <EditStepWrapper
            theme={theme}
            onBack={() => setStep('source-select')}
            onNext={() => setStep('save')}
          />
        </View>
      )}

      {step === 'save' && (
        <SaveScreen
          theme={theme}
          project={state.project}
          onClose={() => setStep('edit')}
          onExportComplete={onComplete}
        />
      )}
    </SafeAreaView>
  );
}

const cfStyles = StyleSheet.create({
  root: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  closeBtn: { fontSize: 20, width: 32 },
  title: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700' },
  stepContent: { flex: 1 },
});

// ─── Public CreationFlow component ────────────────────────────────────────────

export function CreationFlow({
  config = {},
  locale = config.locale ?? 'en',
  onClose,
  onComplete,
}: CreationFlowProps): React.JSX.Element {
  const mergedConfig: EditorConfig = {
    ...config,
    onClose: onClose ?? config.onClose,
  };

  return (
    <LocaleProvider locale={locale}>
      <EditorProvider config={mergedConfig}>
        <CreationFlowInner config={mergedConfig} onComplete={onComplete} />
      </EditorProvider>
    </LocaleProvider>
  );
}
