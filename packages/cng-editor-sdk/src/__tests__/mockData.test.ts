import {
  createBlankProject,
  buildClipFromAsset,
  buildAudioTrack,
  uid,
  MOCK_FILTERS,
  MOCK_STICKERS,
  MOCK_TRANSITIONS,
  MOCK_MUSIC_TRACKS,
} from '../utils/mockData';
import type { MediaAsset } from '../types';

const MOCK_VIDEO_ASSET: MediaAsset = {
  id: 'asset_test_1',
  uri: 'mock://video/test',
  type: 'video',
  name: 'test_video.mp4',
  duration: 10,
  width: 1080,
  height: 1920,
};

const MOCK_IMAGE_ASSET: MediaAsset = {
  id: 'asset_test_2',
  uri: 'mock://image/test',
  type: 'image',
  name: 'test_image.jpg',
  width: 1080,
  height: 1350,
};

describe('uid()', () => {
  it('generates a non-empty string', () => {
    expect(uid()).toBeTruthy();
    expect(typeof uid()).toBe('string');
  });

  it('generates unique values', () => {
    const ids = new Set(Array.from({ length: 100 }, () => uid()));
    expect(ids.size).toBe(100);
  });
});

describe('createBlankProject()', () => {
  it('creates a project with the given id', () => {
    const p = createBlankProject('test-id');
    expect(p.id).toBe('test-id');
  });

  it('has no clips or audio tracks', () => {
    const p = createBlankProject('blank');
    expect(p.clips).toHaveLength(0);
    expect(p.audioTracks).toHaveLength(0);
  });

  it('defaults to 9:16 aspect ratio', () => {
    const p = createBlankProject('ar');
    expect(p.aspectRatio).toBe('9:16');
  });

  it('has zeroed global adjustments', () => {
    const p = createBlankProject('adj');
    const adj = p.globalAdjustments;
    expect(adj.brightness).toBe(0);
    expect(adj.contrast).toBe(0);
    expect(adj.saturation).toBe(0);
  });
});

describe('buildClipFromAsset()', () => {
  it('builds a clip from a video asset', () => {
    const clip = buildClipFromAsset(MOCK_VIDEO_ASSET);
    expect(clip.asset).toBe(MOCK_VIDEO_ASSET);
    expect(clip.startTime).toBe(0);
    expect(clip.endTime).toBe(10);
    expect(clip.speed).toBe(1);
    expect(clip.opacity).toBe(1);
    expect(clip.volume).toBe(1);
    expect(clip.textLayers).toHaveLength(0);
    expect(clip.stickerLayers).toHaveLength(0);
  });

  it('uses 5s default duration for image assets', () => {
    const clip = buildClipFromAsset(MOCK_IMAGE_ASSET);
    expect(clip.endTime).toBe(5);
  });

  it('builds a clip with default identity transform', () => {
    const clip = buildClipFromAsset(MOCK_VIDEO_ASSET);
    const t = clip.transform;
    expect(t.x).toBe(0);
    expect(t.y).toBe(0);
    expect(t.scale).toBe(1);
    expect(t.rotation).toBe(0);
    expect(t.flipX).toBe(false);
    expect(t.flipY).toBe(false);
  });
});

describe('buildAudioTrack()', () => {
  const audioAsset: MediaAsset = {
    id: 'audio_test',
    uri: 'mock://audio/1',
    type: 'audio',
    name: 'track.mp3',
    duration: 180,
  };

  it('builds an audio track with default start 0', () => {
    const track = buildAudioTrack(audioAsset);
    expect(track.timelineStart).toBe(0);
    expect(track.timelineEnd).toBe(180);
    expect(track.volume).toBe(1);
    expect(track.fadeIn).toBe(0);
    expect(track.fadeOut).toBe(0);
  });

  it('respects provided start offset', () => {
    const track = buildAudioTrack(audioAsset, 30);
    expect(track.timelineStart).toBe(30);
    expect(track.timelineEnd).toBe(210);
  });
});

describe('Mock data', () => {
  it('MOCK_FILTERS has at least 2 entries and includes none', () => {
    expect(MOCK_FILTERS.length).toBeGreaterThanOrEqual(2);
    expect(MOCK_FILTERS.find((f) => f.id === 'none')).toBeDefined();
  });

  it('MOCK_STICKERS covers multiple categories', () => {
    const categories = new Set(MOCK_STICKERS.map((s) => s.category));
    expect(categories.size).toBeGreaterThan(1);
  });

  it('MOCK_TRANSITIONS includes none', () => {
    expect(MOCK_TRANSITIONS.find((t) => t.id === 'none')).toBeDefined();
  });

  it('MOCK_MUSIC_TRACKS has name and duration', () => {
    MOCK_MUSIC_TRACKS.forEach((t) => {
      expect(t.name).toBeTruthy();
      expect(t.duration).toBeGreaterThan(0);
    });
  });
});
