import { en, pt, getStrings, getAvailableLocales } from '../i18n/strings';
import type { Locale, LocaleStrings } from '../i18n/strings';

describe('i18n - getStrings()', () => {
  it('returns English strings for "en"', () => {
    const strings = getStrings('en');
    expect(strings).toBe(en);
  });

  it('returns Portuguese strings for "pt"', () => {
    const strings = getStrings('pt');
    expect(strings).toBe(pt);
  });

  it('falls back to English for unknown locale', () => {
    const strings = getStrings('xx' as Locale);
    expect(strings).toBe(en);
  });
});

describe('i18n - getAvailableLocales()', () => {
  it('returns at least en and pt', () => {
    const locales = getAvailableLocales();
    expect(locales).toContain('en');
    expect(locales).toContain('pt');
    expect(locales.length).toBeGreaterThanOrEqual(2);
  });
});

describe('i18n - English strings (en)', () => {
  it('has all creation flow keys', () => {
    expect(en.creationFlow_title).toBe('Create');
    expect(en.creationFlow_gallery).toBe('Gallery');
    expect(en.creationFlow_camera).toBe('Camera');
    expect(en.creationFlow_blankProject).toBe('Blank Project');
    expect(en.creationFlow_back).toBe('Back');
    expect(en.creationFlow_next).toBe('Next');
  });

  it('has all media picker keys', () => {
    expect(en.mediaPicker_title).toBe('Select Media');
    expect(en.mediaPicker_all).toBe('All');
    expect(en.mediaPicker_videos).toBe('Videos');
    expect(en.mediaPicker_images).toBe('Photos');
    expect(en.mediaPicker_continue).toBe('Continue');
  });

  it('has camera keys', () => {
    expect(en.camera_photo).toBe('Photo');
    expect(en.camera_video).toBe('Video');
    expect(en.camera_flip).toBe('Flip');
    expect(en.camera_retake).toBe('Retake');
    expect(en.camera_useMedia).toBe('Use');
  });

  it('has toolbar keys', () => {
    expect(en.toolbar_trim).toBe('Trim');
    expect(en.toolbar_speed).toBe('Speed');
    expect(en.toolbar_filters).toBe('Filters');
    expect(en.toolbar_audio).toBe('Audio');
  });

  it('has export / save keys', () => {
    expect(en.export_title).toBe('Export');
    expect(en.export_button).toContain('Export');
    expect(en.save_title).toBe('Save');
    expect(en.save_saveProject).toBe('Save Project');
  });
});

describe('i18n - Portuguese strings (pt)', () => {
  it('has translated creation flow keys', () => {
    expect(pt.creationFlow_title).toBe('Criar');
    expect(pt.creationFlow_gallery).toBe('Galeria');
    expect(pt.creationFlow_camera).toBe('Câmera');
    expect(pt.creationFlow_back).toBe('Voltar');
    expect(pt.creationFlow_next).toBe('Próximo');
  });

  it('has translated media picker keys', () => {
    expect(pt.mediaPicker_title).toBe('Selecionar Mídia');
    expect(pt.mediaPicker_all).toBe('Todos');
    expect(pt.mediaPicker_continue).toBe('Continuar');
  });

  it('has translated camera keys', () => {
    expect(pt.camera_photo).toBe('Foto');
    expect(pt.camera_video).toBe('Vídeo');
    expect(pt.camera_flip).toBe('Virar');
    expect(pt.camera_retake).toBe('Refazer');
  });

  it('has translated export / save keys', () => {
    expect(pt.export_title).toBe('Exportar');
    expect(pt.save_title).toBe('Salvar');
    expect(pt.save_saveProject).toBe('Salvar Projeto');
  });
});

describe('i18n - completeness check', () => {
  it('Portuguese has all keys that English has', () => {
    const enKeys = Object.keys(en) as (keyof LocaleStrings)[];
    const ptKeys = Object.keys(pt) as (keyof LocaleStrings)[];

    // Every English key should exist in Portuguese
    enKeys.forEach((key) => {
      expect(ptKeys).toContain(key);
      expect(typeof pt[key]).toBe('string');
      expect(pt[key].length).toBeGreaterThan(0);
    });
  });

  it('all string values are non-empty', () => {
    const enKeys = Object.keys(en) as (keyof LocaleStrings)[];
    enKeys.forEach((key) => {
      expect(en[key].length).toBeGreaterThan(0);
      expect(pt[key].length).toBeGreaterThan(0);
    });
  });
});
