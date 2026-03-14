// ─────────────────────────────────────────────
//  Locale string keys and translations
// ─────────────────────────────────────────────

export type Locale = 'en' | 'pt';

export interface LocaleStrings {
  // ─── Creation Flow ──────────────────────────
  creationFlow_title: string;
  creationFlow_selectSource: string;
  creationFlow_gallery: string;
  creationFlow_camera: string;
  creationFlow_blankProject: string;
  creationFlow_galleryDesc: string;
  creationFlow_cameraDesc: string;
  creationFlow_blankDesc: string;
  creationFlow_back: string;
  creationFlow_next: string;
  creationFlow_stepMedia: string;
  creationFlow_stepEdit: string;
  creationFlow_stepAudio: string;
  creationFlow_stepSave: string;

  // ─── Media Picker ───────────────────────────
  mediaPicker_title: string;
  mediaPicker_all: string;
  mediaPicker_videos: string;
  mediaPicker_images: string;
  mediaPicker_selected: string;
  mediaPicker_continue: string;
  mediaPicker_empty: string;

  // ─── Camera ─────────────────────────────────
  camera_title: string;
  camera_photo: string;
  camera_video: string;
  camera_flip: string;
  camera_flash: string;
  camera_capture: string;
  camera_recording: string;
  camera_stop: string;
  camera_retake: string;
  camera_useMedia: string;
  camera_timer: string;

  // ─── Editor ─────────────────────────────────
  editor_projectName: string;
  editor_deselect: string;
  editor_remove: string;

  // ─── Toolbar ────────────────────────────────
  toolbar_trim: string;
  toolbar_speed: string;
  toolbar_filters: string;
  toolbar_adjust: string;
  toolbar_text: string;
  toolbar_sticker: string;
  toolbar_audio: string;
  toolbar_transitions: string;
  toolbar_add: string;

  // ─── Filter Panel ───────────────────────────
  filters_title: string;
  filters_intensity: string;
  filters_selectClip: string;

  // ─── Adjust Panel ───────────────────────────
  adjust_title: string;

  // ─── Trim Panel ─────────────────────────────
  trim_title: string;
  trim_selectClip: string;
  trim_start: string;
  trim_duration: string;
  trim_end: string;
  trim_startPoint: string;
  trim_endPoint: string;
  trim_splitAtPlayhead: string;

  // ─── Speed Panel ────────────────────────────
  speed_title: string;
  speed_currentSpeed: string;
  speed_selectClip: string;

  // ─── Text Editor ────────────────────────────
  text_title: string;
  text_placeholder: string;

  // ─── Audio Panel ────────────────────────────
  audio_title: string;
  audio_music: string;
  audio_voice: string;
  audio_effects: string;
  audio_addedTracks: string;
  audio_recommended: string;
  audio_recordVoiceover: string;
  audio_tapToRecord: string;
  audio_record: string;
  audio_soundEffects: string;

  // ─── Sticker Panel ──────────────────────────
  stickers_title: string;

  // ─── Transition Panel ───────────────────────
  transitions_title: string;

  // ─── Export / Save ──────────────────────────
  export_title: string;
  export_aspectRatio: string;
  export_quality: string;
  export_format: string;
  export_frameRate: string;
  export_includeAudio: string;
  export_exporting: string;
  export_complete: string;
  export_failed: string;
  export_button: string;
  save_title: string;
  save_preview: string;
  save_projectSummary: string;
  save_clips: string;
  save_audioTracks: string;
  save_duration: string;
  save_saveProject: string;
  save_exportVideo: string;
  save_saved: string;
}

// ─── English translations ─────────────────────────────────────────────────
export const en: LocaleStrings = {
  // Creation Flow
  creationFlow_title: 'Create',
  creationFlow_selectSource: 'Select media source',
  creationFlow_gallery: 'Gallery',
  creationFlow_camera: 'Camera',
  creationFlow_blankProject: 'Blank Project',
  creationFlow_galleryDesc: 'Pick from photos & videos',
  creationFlow_cameraDesc: 'Take a photo or record video',
  creationFlow_blankDesc: 'Start with an empty timeline',
  creationFlow_back: 'Back',
  creationFlow_next: 'Next',
  creationFlow_stepMedia: 'Media',
  creationFlow_stepEdit: 'Edit',
  creationFlow_stepAudio: 'Audio',
  creationFlow_stepSave: 'Save',

  // Media Picker
  mediaPicker_title: 'Select Media',
  mediaPicker_all: 'All',
  mediaPicker_videos: 'Videos',
  mediaPicker_images: 'Photos',
  mediaPicker_selected: 'selected',
  mediaPicker_continue: 'Continue',
  mediaPicker_empty: 'No media found',

  // Camera
  camera_title: 'Camera',
  camera_photo: 'Photo',
  camera_video: 'Video',
  camera_flip: 'Flip',
  camera_flash: 'Flash',
  camera_capture: 'Capture',
  camera_recording: 'Recording',
  camera_stop: 'Stop',
  camera_retake: 'Retake',
  camera_useMedia: 'Use',
  camera_timer: 'Timer',

  // Editor
  editor_projectName: 'New Project',
  editor_deselect: 'Deselect',
  editor_remove: 'Remove',

  // Toolbar
  toolbar_trim: 'Trim',
  toolbar_speed: 'Speed',
  toolbar_filters: 'Filters',
  toolbar_adjust: 'Adjust',
  toolbar_text: 'Text',
  toolbar_sticker: 'Sticker',
  toolbar_audio: 'Audio',
  toolbar_transitions: 'Transit.',
  toolbar_add: 'Add',

  // Filter
  filters_title: 'Filters',
  filters_intensity: 'Intensity',
  filters_selectClip: 'Select a clip to apply filters',

  // Adjust
  adjust_title: 'Adjustments',

  // Trim
  trim_title: 'Trim / Cut',
  trim_selectClip: 'Select a clip to trim it',
  trim_start: 'Start',
  trim_duration: 'Duration',
  trim_end: 'End',
  trim_startPoint: 'Start Point',
  trim_endPoint: 'End Point',
  trim_splitAtPlayhead: 'Split at Playhead',

  // Speed
  speed_title: 'Speed',
  speed_currentSpeed: 'Current Speed',
  speed_selectClip: 'Select a clip to change speed',

  // Text
  text_title: 'Text',
  text_placeholder: 'Enter text…',

  // Audio
  audio_title: 'Audio',
  audio_music: 'Music',
  audio_voice: 'Voice',
  audio_effects: 'Effects',
  audio_addedTracks: 'ADDED TRACKS',
  audio_recommended: 'RECOMMENDED',
  audio_recordVoiceover: 'Record Voice-Over',
  audio_tapToRecord: 'Tap the mic button to start recording',
  audio_record: 'Record',
  audio_soundEffects: 'SOUND EFFECTS',

  // Stickers
  stickers_title: 'Stickers',

  // Transitions
  transitions_title: 'Transitions',

  // Export / Save
  export_title: 'Export',
  export_aspectRatio: 'Aspect Ratio',
  export_quality: 'Quality',
  export_format: 'Format',
  export_frameRate: 'Frame Rate',
  export_includeAudio: 'Include Audio',
  export_exporting: 'Exporting…',
  export_complete: 'Export Complete!',
  export_failed: 'Export failed',
  export_button: '⬆ Export Video',
  save_title: 'Save',
  save_preview: 'Preview',
  save_projectSummary: 'Project Summary',
  save_clips: 'Clips',
  save_audioTracks: 'Audio Tracks',
  save_duration: 'Duration',
  save_saveProject: 'Save Project',
  save_exportVideo: 'Export Video',
  save_saved: 'Saved!',
};

// ─── Portuguese translations ──────────────────────────────────────────────
export const pt: LocaleStrings = {
  // Creation Flow
  creationFlow_title: 'Criar',
  creationFlow_selectSource: 'Selecione a fonte de mídia',
  creationFlow_gallery: 'Galeria',
  creationFlow_camera: 'Câmera',
  creationFlow_blankProject: 'Projeto em Branco',
  creationFlow_galleryDesc: 'Escolha entre fotos e vídeos',
  creationFlow_cameraDesc: 'Tire uma foto ou grave um vídeo',
  creationFlow_blankDesc: 'Comece com uma linha do tempo vazia',
  creationFlow_back: 'Voltar',
  creationFlow_next: 'Próximo',
  creationFlow_stepMedia: 'Mídia',
  creationFlow_stepEdit: 'Editar',
  creationFlow_stepAudio: 'Áudio',
  creationFlow_stepSave: 'Salvar',

  // Media Picker
  mediaPicker_title: 'Selecionar Mídia',
  mediaPicker_all: 'Todos',
  mediaPicker_videos: 'Vídeos',
  mediaPicker_images: 'Fotos',
  mediaPicker_selected: 'selecionado(s)',
  mediaPicker_continue: 'Continuar',
  mediaPicker_empty: 'Nenhuma mídia encontrada',

  // Camera
  camera_title: 'Câmera',
  camera_photo: 'Foto',
  camera_video: 'Vídeo',
  camera_flip: 'Virar',
  camera_flash: 'Flash',
  camera_capture: 'Capturar',
  camera_recording: 'Gravando',
  camera_stop: 'Parar',
  camera_retake: 'Refazer',
  camera_useMedia: 'Usar',
  camera_timer: 'Timer',

  // Editor
  editor_projectName: 'Novo Projeto',
  editor_deselect: 'Desmarcar',
  editor_remove: 'Remover',

  // Toolbar
  toolbar_trim: 'Cortar',
  toolbar_speed: 'Velocidade',
  toolbar_filters: 'Filtros',
  toolbar_adjust: 'Ajustar',
  toolbar_text: 'Texto',
  toolbar_sticker: 'Adesivo',
  toolbar_audio: 'Áudio',
  toolbar_transitions: 'Transição',
  toolbar_add: 'Adicionar',

  // Filter
  filters_title: 'Filtros',
  filters_intensity: 'Intensidade',
  filters_selectClip: 'Selecione um clipe para aplicar filtros',

  // Adjust
  adjust_title: 'Ajustes',

  // Trim
  trim_title: 'Cortar / Dividir',
  trim_selectClip: 'Selecione um clipe para cortá-lo',
  trim_start: 'Início',
  trim_duration: 'Duração',
  trim_end: 'Fim',
  trim_startPoint: 'Ponto Inicial',
  trim_endPoint: 'Ponto Final',
  trim_splitAtPlayhead: 'Dividir no ponto atual',

  // Speed
  speed_title: 'Velocidade',
  speed_currentSpeed: 'Velocidade Atual',
  speed_selectClip: 'Selecione um clipe para alterar a velocidade',

  // Text
  text_title: 'Texto',
  text_placeholder: 'Digite o texto…',

  // Audio
  audio_title: 'Áudio',
  audio_music: 'Música',
  audio_voice: 'Voz',
  audio_effects: 'Efeitos',
  audio_addedTracks: 'FAIXAS ADICIONADAS',
  audio_recommended: 'RECOMENDADAS',
  audio_recordVoiceover: 'Gravar Narração',
  audio_tapToRecord: 'Toque no botão do microfone para começar a gravar',
  audio_record: 'Gravar',
  audio_soundEffects: 'EFEITOS SONOROS',

  // Stickers
  stickers_title: 'Adesivos',

  // Transitions
  transitions_title: 'Transições',

  // Export / Save
  export_title: 'Exportar',
  export_aspectRatio: 'Proporção',
  export_quality: 'Qualidade',
  export_format: 'Formato',
  export_frameRate: 'Taxa de Quadros',
  export_includeAudio: 'Incluir Áudio',
  export_exporting: 'Exportando…',
  export_complete: 'Exportação Concluída!',
  export_failed: 'Falha na exportação',
  export_button: '⬆ Exportar Vídeo',
  save_title: 'Salvar',
  save_preview: 'Pré-visualização',
  save_projectSummary: 'Resumo do Projeto',
  save_clips: 'Clipes',
  save_audioTracks: 'Faixas de Áudio',
  save_duration: 'Duração',
  save_saveProject: 'Salvar Projeto',
  save_exportVideo: 'Exportar Vídeo',
  save_saved: 'Salvo!',
};

const locales: Record<Locale, LocaleStrings> = { en, pt };

/** Get all translations for a given locale. Falls back to English. */
export function getStrings(locale: Locale): LocaleStrings {
  return locales[locale] ?? locales.en;
}

/** Get available locale codes */
export function getAvailableLocales(): Locale[] {
  return Object.keys(locales) as Locale[];
}
