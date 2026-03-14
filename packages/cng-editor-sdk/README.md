# cng-editor-sdk

A **CapCut-inspired** video, photo and audio editor SDK for React Native, written in TypeScript.

## Features

| Feature | Status |
|---|---|
| 🎬 Video / photo clip timeline | ✅ |
| ✂️ Trim & cut clips | ✅ UI |
| ⚡ Speed control (0.25× – 16×) | ✅ UI |
| ✨ 12+ filters | ✅ UI |
| 🎚 10 adjustment sliders | ✅ UI |
| 🔤 Text overlays with animations | ✅ UI |
| 😊 Stickers (20+ emojis) | ✅ UI |
| 🔀 12 transitions | ✅ UI |
| 🎵 Music / voice-over / SFX | ✅ UI |
| ⬆ Export (480p – 4K, MP4/MOV/GIF) | ✅ UI (simulated) |
| ↩ Undo / redo | ✅ |
| 📐 Aspect ratio selector | ✅ |

## Installation

```bash
yarn add cng-editor-sdk
```

### Peer dependencies

```bash
yarn add react react-native
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { EditorModal } from 'cng-editor-sdk';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open Editor" onPress={() => setOpen(true)} />
      <EditorModal
        visible={open}
        config={{ onClose: () => setOpen(false) }}
      />
    </View>
  );
}
```

## Embedding the editor inline

```tsx
import { EditorScreen } from 'cng-editor-sdk';

<EditorScreen config={{ onClose: () => navigation.goBack() }} />
```

## Custom theme

```tsx
<EditorModal
  visible={open}
  config={{
    theme: {
      accent: '#7C3AED',   // purple accent
    },
    onClose: () => setOpen(false),
  }}
/>
```

## Using individual panels

```tsx
import {
  EditorProvider,
  FilterPanel,
  Timeline,
  Toolbar,
} from 'cng-editor-sdk';

function MyCustomEditor() {
  return (
    <EditorProvider config={{}}>
      <Timeline />
      <Toolbar />
      <FilterPanel />
    </EditorProvider>
  );
}
```

## Hooks

```tsx
import { useEditor } from 'cng-editor-sdk';

function MyComponent() {
  const {
    state,
    addMediaAsset,
    selectedClip,
    applyFilter,
    startExport,
    undo,
    redo,
  } = useEditor();
}
```

## API Reference

### `<EditorScreen config={...} />`

Full-screen editor component.

### `<EditorModal visible={boolean} config={...} />`

Full-screen editor inside a Modal.

### `EditorConfig`

```ts
interface EditorConfig {
  theme?: Partial<EditorTheme>;
  showWatermark?: boolean;
  maxDuration?: number;
  aspectRatios?: AspectRatio[];
  onClose?: () => void;
  onExportComplete?: (outputUri: string) => void;
}
```

## Monorepo structure

```
/
├── packages/
│   └── cng-editor-sdk/   ← SDK package
│       ├── src/
│       ├── android/       ← Android native stubs
│       ├── ios/           ← iOS native stubs
│       └── CngEditorSdk.podspec
└── apps/
    └── example/          ← Demo React Native app
```

## Running the example app

```bash
# Install dependencies
yarn install

# iOS (first time — install CocoaPods)
cd apps/example/ios && pod install && cd ../../..
yarn ios

# Android
yarn android

# Or use the longer aliases
yarn example:ios
yarn example:android
```

## Roadmap

- [ ] Real video playback with `react-native-video`
- [ ] Real media picker with `react-native-image-picker`
- [ ] GPU-accelerated filters (native modules)
- [ ] Real export with `react-native-ffmpeg`
- [ ] Drag-to-reorder timeline clips
- [ ] Multi-layer text editor
- [ ] AI-powered auto-cut

## License

MIT
