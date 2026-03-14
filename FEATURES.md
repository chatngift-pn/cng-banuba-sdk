# Features, Rules & Steps:

> Complete reference for the **cng-editor-sdk** — a CapCut-inspired video/photo/audio editor SDK for React Native.

---

## Table of Contents

- [Features](#features)
- [Project Rules & Conventions](#project-rules--conventions)
- [Getting Started — Step by Step](#getting-started--step-by-step)
- [Running the Example App](#running-the-example-app)
- [SDK Integration Steps](#sdk-integration-steps)
- [Components Reference](#components-reference)
- [Hooks & Context API](#hooks--context-api)
- [Types Reference](#types-reference)
- [Localization (i18n)](#localization-i18n)
- [Theming](#theming)
- [Export Options](#export-options)
- [Monorepo Structure](#monorepo-structure)
- [Available Scripts](#available-scripts)
- [Roadmap](#roadmap)

---

## Features

| #   | Feature                           | Description                                                                                                                | Status            |
| --- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| 1   | 🎬 Video & Photo Timeline         | Multi-clip timeline with drag support for video and image clips                                                            | ✅ UI             |
| 2   | ✂️ Trim, Cut & Split              | Trim clip start/end, cut at playhead, split into segments                                                                  | ✅ UI             |
| 3   | ⚡ Speed Control                  | Adjust playback speed from 0.25× to 16× per clip                                                                           | ✅ UI             |
| 4   | ✨ Cinematic Filters              | 12+ built-in filters (Vivid, Warm, Cool, B&W, Vintage, Cinema, etc.) with adjustable intensity                             | ✅ UI             |
| 5   | 🎚 Adjustment Sliders              | 10 parameters: Brightness, Contrast, Saturation, Sharpness, Vignette, Fade, Temperature, Tint, Highlight, Shadow           | ✅ UI             |
| 6   | 🔤 Text Overlays                  | Add text with font, color, alignment, background; 6 animation types (fade, slide-up, slide-down, bounce, typewriter, zoom) | ✅ UI             |
| 7   | 😊 Sticker & Emoji Overlays       | 20+ emoji stickers organized by category (Smileys, Gestures, Hearts, Weather, Animals, Food)                               | ✅ UI             |
| 8   | 🔀 Transition Effects             | 12 transitions between clips: Fade, Dissolve, Slide Left/Right/Up/Down, Zoom In/Out, Rotate, Flip, Wipe, Blur              | ✅ UI             |
| 9   | 🎵 Audio (Music, Voice-over, SFX) | Add music tracks, voice-overs, and sound effects with volume, fade-in/out control                                          | ✅ UI             |
| 10  | ⬆ Export                          | Export to MP4, MOV, or GIF at 480p / 720p / 1080p / 4K, with frame rate options (24/30/60 fps)                             | ✅ UI (simulated) |
| 11  | ↩ Undo / Redo                     | Full undo/redo history for all editing operations                                                                          | ✅                |
| 12  | 📐 Aspect Ratio                   | Selector for 9:16, 16:9, 1:1, 4:3, 3:4 canvas ratios                                                                       | ✅                |
| 13  | 🎨 Theming                        | Fully customizable theme (accent color, backgrounds, surfaces, text colors)                                                | ✅                |
| 14  | 🌐 Localization                   | i18n support for English (en) and Portuguese (pt); extensible locale system                                                | ✅                |
| 15  | 📂 Multi-Step Creation Flow       | Guided flow: Source Select → Gallery/Camera → Edit → Save                                                                  | ✅                |
| 16  | 📷 Camera Screen                  | Built-in camera capture screen for recording video/photos                                                                  | ✅ UI             |
| 17  | 💾 Save Screen                    | Save/export screen with format and quality selection                                                                       | ✅ UI             |
| 18  | 🖼 Media Picker                    | Media import from gallery with grid view                                                                                   | ✅ UI             |

---

## Project Rules & Conventions

### Language & Framework

- **Language**: TypeScript (strict mode)
- **Framework**: React Native ≥ 0.71.0
- **React**: ≥ 18.0.0
- **Platforms**: iOS 13.0+ and Android (API 23+)
- **Engine**: Hermes (default)

### Code Conventions

- All source code lives under `packages/cng-editor-sdk/src/`
- Components follow a folder-per-component pattern (e.g., `src/components/FilterPanel/index.tsx`)
- All public types are exported from `src/types/index.ts`
- Use functional components with React hooks
- Context providers (`EditorProvider`, `LocaleProvider`) wrap all SDK components
- Use the `useEditor()` hook to access editor state and actions
- Use the `useLocale()` hook to access localized strings

### Naming Conventions

- **Components**: PascalCase (e.g., `FilterPanel`, `EditorScreen`)
- **Hooks**: camelCase with `use` prefix (e.g., `useEditor`, `useLocale`)
- **Types/Interfaces**: PascalCase (e.g., `EditorConfig`, `MediaAsset`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MOCK_FILTERS`, `DEFAULT_THEME`)
- **Files**: PascalCase for components, camelCase for utilities

### Monorepo Rules

- Managed with **Yarn Workspaces**
- SDK package: `packages/cng-editor-sdk`
- Example app: `apps/example`
- SDK is referenced as `"cng-editor-sdk": "*"` in the example app
- Metro is configured to watch the SDK source folder for hot-reload

### Testing

- Test framework: **Jest**
- Tests are in `src/__tests__/`
- Run tests: `yarn sdk:test`

### Linting

- ESLint with React Native config
- Run lint: `yarn sdk:lint`

---

## Getting Started — Step by Step

### Prerequisites

| Tool           | Minimum Version | Notes                            |
| -------------- | --------------- | -------------------------------- |
| Node.js        | 18+             | LTS recommended                  |
| Yarn           | 1.22+           | Classic (v1)                     |
| Xcode          | 14+             | For iOS development (macOS only) |
| CocoaPods      | 1.12+           | For iOS dependencies             |
| Android Studio | Latest          | For Android development          |
| JDK            | 17              | Required by React Native 0.73    |

### Step 1 — Clone the Repository

```bash
git clone https://github.com/chatngift-pn/cng-banuba-sdk.git
cd cng-banuba-sdk
```

### Step 2 — Install Dependencies

```bash
yarn install
```

### Step 3 — Build the SDK

```bash
yarn sdk:build
```

### Step 4 — Run the Example App

#### iOS (macOS only)

```bash
# Install CocoaPods dependencies
cd apps/example/ios && pod install && cd ../../..

# Run on iOS simulator
yarn ios
# or
yarn example:ios
```

#### Android

```bash
# Run on Android emulator or device
yarn android
# or
yarn example:android
```

#### Start Metro Bundler (standalone)

```bash
yarn start
# or
yarn example:start
```

---

## Running the Example App

### iOS Setup

1. Ensure Xcode is installed with iOS 13.0+ simulator
2. Install CocoaPods if not already installed:
   ```bash
   sudo gem install cocoapods
   ```
3. Install pods:
   ```bash
   cd apps/example/ios
   pod install
   cd ../../..
   ```
4. Run the app:
   ```bash
   yarn ios
   ```

### Android Setup

1. Ensure Android Studio is installed with SDK 34
2. Set the `ANDROID_HOME` environment variable
3. Start an Android emulator or connect a device
4. Run the app:
   ```bash
   yarn android
   ```

### Troubleshooting

| Issue                          | Solution                                                   |
| ------------------------------ | ---------------------------------------------------------- |
| `iOS project folder not found` | Ensure `apps/example/ios/` exists with the Xcode project   |
| `pod install` fails            | Run `cd apps/example/ios && pod install --repo-update`     |
| Metro port conflict            | Kill existing Metro: `npx react-native start --port 8081`  |
| Android build fails            | Run `cd apps/example/android && ./gradlew clean`           |
| Hermes issues                  | Ensure `hermesEnabled=true` in `android/gradle.properties` |

---

## SDK Integration Steps

### Step 1 — Install the SDK

```bash
yarn add cng-editor-sdk
```

### Step 2 — Use the Editor Modal

```tsx
import React, { useState } from "react";
import { Button, View } from "react-native";
import { EditorModal } from "cng-editor-sdk";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Open Editor" onPress={() => setOpen(true)} />
      <EditorModal visible={open} config={{ onClose: () => setOpen(false) }} />
    </View>
  );
}
```

### Step 3 — Or Use the Full-Screen Editor

```tsx
import { EditorScreen } from "cng-editor-sdk";

<EditorScreen config={{ onClose: () => navigation.goBack() }} />;
```

### Step 4 — Or Use the Multi-Step Creation Flow

```tsx
import { CreationFlow } from "cng-editor-sdk";

<CreationFlow
  config={{
    onClose: () => navigation.goBack(),
    onExportComplete: (uri) => console.log("Saved to:", uri),
  }}
/>;
```

### Step 5 — Customize the Theme (Optional)

```tsx
<EditorModal
  visible={open}
  config={{
    theme: {
      accent: "#7C3AED",
      background: "#0F0F0F",
      surface: "#1A1A2E",
      text: "#FFFFFF",
    },
    onClose: () => setOpen(false),
  }}
/>
```

### Step 6 — Set Locale (Optional)

```tsx
import { LocaleProvider, EditorModal } from "cng-editor-sdk";

<LocaleProvider locale="pt">
  <EditorModal visible={open} config={{ onClose: () => setOpen(false) }} />
</LocaleProvider>;
```

---

## Components Reference

### Full Editors

| Component      | Description                                                          | Props                                      |
| -------------- | -------------------------------------------------------------------- | ------------------------------------------ |
| `EditorScreen` | Full-screen editor view                                              | `config: EditorConfig`                     |
| `EditorModal`  | Editor wrapped in a React Native Modal                               | `visible: boolean`, `config: EditorConfig` |
| `CreationFlow` | Multi-step creation workflow (source → gallery/camera → edit → save) | `config: EditorConfig`                     |

### Screens

| Component      | Description                                           |
| -------------- | ----------------------------------------------------- |
| `CameraScreen` | Camera capture interface                              |
| `SaveScreen`   | Export/save interface with format and quality options |

### Individual Panels

Use these with `EditorProvider` for custom editor layouts:

| Component         | Description                                    |
| ----------------- | ---------------------------------------------- |
| `Toolbar`         | Main editing toolbar with tool buttons         |
| `Timeline`        | Clip timeline with thumbnails and scrubbing    |
| `FilterPanel`     | Filter browser and intensity slider            |
| `AdjustPanel`     | 10 adjustment parameter sliders                |
| `TextEditor`      | Text overlay editor with styling and animation |
| `StickerPanel`    | Sticker/emoji browser organized by category    |
| `TransitionPanel` | Transition picker between clips                |
| `AudioPanel`      | Audio tracks manager (music, voice-over, SFX)  |
| `ExportPanel`     | Export settings (format, quality, frame rate)  |
| `TrimPanel`       | Clip trimming interface                        |
| `SpeedPanel`      | Playback speed adjustment                      |
| `MediaPicker`     | Media import gallery                           |
| `EditorCanvas`    | Main editor preview canvas                     |

---

## Hooks & Context API

### `useEditor()`

Access editor state and actions from any component inside `EditorProvider`:

```tsx
const {
  state, // EditorState — full project state
  addMediaAsset, // (asset: MediaAsset) => void
  selectedClip, // Clip | null
  applyFilter, // (filterId: string) => void
  startExport, // (options: ExportOptions) => void
  undo, // () => void
  redo, // () => void
} = useEditor();
```

### `useLocale()`

Access localized strings:

```tsx
const { strings, locale, setLocale } = useLocale();
```

### `EditorProvider`

Wraps components to provide editor context:

```tsx
<EditorProvider config={editorConfig}>{/* Editor components */}</EditorProvider>
```

### `LocaleProvider`

Wraps components to provide localization context:

```tsx
<LocaleProvider locale="pt">{/* Localized components */}</LocaleProvider>
```

---

## Types Reference

### Media Types

```typescript
type MediaType = "video" | "image" | "audio";

interface MediaAsset {
  id: string;
  uri: string;
  type: MediaType;
  duration?: number; // seconds (video/audio)
  width?: number; // pixels
  height?: number; // pixels
  name: string;
  thumbnailUri?: string;
  size?: number; // bytes
}
```

### Timeline Types

```typescript
interface Clip {
  id: string;
  asset: MediaAsset;
  startTime: number; // offset in original asset (seconds)
  endTime: number; // offset in original asset (seconds)
  timelineStart: number; // position on timeline (seconds)
  speed: number; // 0.25 – 4.0
  opacity: number; // 0–1
  volume: number; // 0–1
  filterId?: string;
  transform: ClipTransform;
  textLayers: TextLayer[];
  stickerLayers: StickerLayer[];
  transition?: Transition;
}

interface ClipTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  cropRect?: CropRect;
}
```

### Audio Types

```typescript
interface AudioTrack {
  id: string;
  asset: MediaAsset;
  timelineStart: number;
  timelineEnd: number;
  volume: number; // 0–1
  fadeIn: number; // seconds
  fadeOut: number; // seconds
}

type AudioTrackType = "music" | "voiceover" | "sound-effect";
```

### Text Overlay Types

```typescript
interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string | undefined;
  color: string;
  backgroundColor?: string;
  bold: boolean;
  italic: boolean;
  alignment: "left" | "center" | "right";
  animationIn?: TextAnimation;
  animationOut?: TextAnimation;
  startTime?: number;
  endTime?: number;
}

type TextAnimation =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "bounce"
  | "typewriter"
  | "zoom";
```

### Filter & Transition Types

```typescript
interface Filter {
  id: string;
  name: string;
  previewColor: string; // visual stand-in for real LUT
  intensity: number; // 0–1
}

interface Transition {
  id: string;
  name: string;
  duration: number; // seconds
  icon: string;
}
```

### Adjustment Types

```typescript
interface Adjustments {
  brightness: number; // -1 to 1
  contrast: number; // -1 to 1
  saturation: number; // -1 to 1
  sharpness: number; // 0 to 1
  vignette: number; // 0 to 1
  fade: number; // 0 to 1
  temperature: number; // -1 to 1
  tint: number; // -1 to 1
  highlight: number; // -1 to 1
  shadow: number; // -1 to 1
}
```

### Export Types

```typescript
type ExportQuality = "480p" | "720p" | "1080p" | "4K";
type ExportFormat = "mp4" | "mov" | "gif";

interface ExportOptions {
  quality: ExportQuality;
  format: ExportFormat;
  frameRate: 24 | 30 | 60;
  includeAudio: boolean;
}

interface ExportProgress {
  status: "idle" | "processing" | "done" | "error";
  progress: number; // 0–100
  outputUri?: string;
  error?: string;
}
```

### Project & Config Types

```typescript
interface EditorProject {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  aspectRatio: AspectRatio;
  clips: Clip[];
  audioTracks: AudioTrack[];
  globalAdjustments: Adjustments;
}

type AspectRatio = "9:16" | "16:9" | "1:1" | "4:3" | "3:4";

interface EditorConfig {
  theme?: Partial<EditorTheme>;
  showWatermark?: boolean;
  maxDuration?: number; // seconds, 0 = unlimited
  aspectRatios?: AspectRatio[];
  onClose?: () => void;
  onExportComplete?: (outputUri: string) => void;
  locale?: "en" | "pt";
}

interface EditorTheme {
  background: string;
  surface: string;
  surfaceAlt: string;
  accent: string;
  text: string;
  textSecondary: string;
  border: string;
  danger: string;
  success: string;
}
```

### Creation Flow Types

```typescript
type CreationFlowStep =
  | "source-select"
  | "gallery"
  | "camera"
  | "edit"
  | "audio"
  | "save";
type ActiveTool =
  | null
  | "trim"
  | "split"
  | "speed"
  | "filters"
  | "adjust"
  | "text"
  | "stickers"
  | "audio"
  | "transitions"
  | "export"
  | "media-picker";
```

---

## Localization (i18n)

### Supported Locales

| Code | Language          |
| ---- | ----------------- |
| `en` | English (default) |
| `pt` | Portuguese        |

### Usage

```tsx
import { LocaleProvider } from "cng-editor-sdk";

// Wrap your app or editor
<LocaleProvider locale="pt">
  <EditorModal visible={true} config={{}} />
</LocaleProvider>;
```

### Accessing Strings

```tsx
import { useLocale, getStrings, getAvailableLocales } from "cng-editor-sdk";

// Inside a component
const { strings } = useLocale();
console.log(strings.filters); // "Filtros" (when locale is "pt")

// Outside React
const ptStrings = getStrings("pt");
const locales = getAvailableLocales(); // ['en', 'pt']
```

---

## Theming

### Default Theme

```typescript
const DEFAULT_THEME: EditorTheme = {
  background: "#0A0A0A",
  surface: "#1A1A1A",
  surfaceAlt: "#2A2A2A",
  accent: "#00D4AA",
  text: "#FFFFFF",
  textSecondary: "#999999",
  border: "#333333",
  danger: "#FF4757",
  success: "#2ED573",
};
```

### Custom Theme Example

```tsx
<EditorModal
  visible={open}
  config={{
    theme: {
      accent: "#7C3AED", // purple accent
      background: "#0F0F0F", // darker background
      surface: "#1A1A2E", // blue-ish surface
    },
    onClose: () => setOpen(false),
  }}
/>
```

---

## Export Options

| Quality | Resolution |
| ------- | ---------- |
| `480p`  | 854×480    |
| `720p`  | 1280×720   |
| `1080p` | 1920×1080  |
| `4K`    | 3840×2160  |

| Format | Description     |
| ------ | --------------- |
| `mp4`  | H.264 video     |
| `mov`  | QuickTime video |
| `gif`  | Animated GIF    |

| Frame Rate | Use Case      |
| ---------- | ------------- |
| 24 fps     | Cinematic     |
| 30 fps     | Standard      |
| 60 fps     | Smooth motion |

---

## Monorepo Structure

```
cng-banuba-sdk/
├── package.json              ← Root workspace config
├── README.md                 ← Project overview
├── FEATURES.md               ← This file
├── packages/
│   └── cng-editor-sdk/       ← SDK package
│       ├── package.json
│       ├── CngEditorSdk.podspec
│       ├── src/
│       │   ├── index.ts              ← Public API exports
│       │   ├── components/           ← UI components
│       │   │   ├── EditorScreen/
│       │   │   ├── CreationFlow/
│       │   │   ├── CameraScreen/
│       │   │   ├── SaveScreen/
│       │   │   ├── Toolbar/
│       │   │   ├── Timeline/
│       │   │   ├── FilterPanel/
│       │   │   ├── AdjustPanel/
│       │   │   ├── TextEditor/
│       │   │   ├── StickerPanel/
│       │   │   ├── TransitionPanel/
│       │   │   ├── AudioPanel/
│       │   │   ├── ExportPanel/
│       │   │   ├── TrimPanel/
│       │   │   ├── SpeedPanel/
│       │   │   ├── MediaPicker/
│       │   │   └── common/
│       │   ├── context/              ← EditorContext (state management)
│       │   ├── i18n/                 ← Localization strings
│       │   ├── types/                ← TypeScript type definitions
│       │   ├── utils/                ← Helpers, mock data, theme
│       │   └── __tests__/            ← Unit tests
│       ├── android/                  ← Android native stubs
│       └── ios/                      ← iOS native stubs
└── apps/
    └── example/              ← Demo React Native app
        ├── package.json
        ├── App.tsx
        ├── index.js
        ├── metro.config.js
        ├── android/          ← Android native project
        └── ios/              ← iOS native project
```

---

## Available Scripts

### Root Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `yarn install`         | Install all workspace dependencies      |
| `yarn ios`             | Run example app on iOS simulator        |
| `yarn android`         | Run example app on Android emulator     |
| `yarn start`           | Start Metro bundler                     |
| `yarn example:ios`     | Run example app on iOS simulator        |
| `yarn example:android` | Run example app on Android emulator     |
| `yarn example:start`   | Start Metro bundler                     |
| `yarn sdk:build`       | Build the SDK (TypeScript → JavaScript) |
| `yarn sdk:lint`        | Lint the SDK source code                |
| `yarn sdk:test`        | Run SDK unit tests                      |

### Example App Scripts (from `apps/example/`)

| Command        | Description             |
| -------------- | ----------------------- |
| `yarn ios`     | Run on iOS simulator    |
| `yarn android` | Run on Android emulator |
| `yarn start`   | Start Metro bundler     |
| `yarn test`    | Run tests               |
| `yarn lint`    | Lint source code        |

---

## Roadmap

- [ ] Real video playback with `react-native-video`
- [ ] Real media picker with `react-native-image-picker`
- [ ] GPU-accelerated filters (native modules)
- [ ] Real export with `react-native-ffmpeg`
- [ ] Drag-to-reorder timeline clips
- [ ] Multi-layer text editor
- [ ] AI-powered auto-cut
