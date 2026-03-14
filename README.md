# cng-banuba-sdk

> A **CapCut-inspired** video/photo/audio editor SDK for React Native — TypeScript, installable via yarn, works on iOS & Android.

## Packages

| Package | Description |
|---|---|
| [`cng-editor-sdk`](./packages/cng-editor-sdk) | The in-app editor SDK |
| [`cng-editor-example`](./apps/example) | Demo React Native app |

## Quick start

```bash
# Install dependencies
yarn install

# Run example app (iOS)
cd apps/example/ios && pod install && cd ../../..
yarn ios

# Run example app (Android)
yarn android

# Start Metro bundler
yarn start

# Build the SDK
yarn sdk:build
```

## Install the SDK in your project

```bash
yarn add cng-editor-sdk
```

## Features

- 🎬 Video & photo clip timeline
- ✂️ Trim, cut & split clips
- ⚡ Speed control (0.25× – 16×)
- ✨ 12+ cinematic filters
- 🎚 10 adjustment parameters
- 🔤 Animated text overlays
- 😊 Stickers & emoji overlays
- 🔀 12 transition effects
- 🎵 Music, voice-over & sound effects
- ⬆ Export to MP4/MOV/GIF (480p – 4K)
- ↩ Undo / redo history
- 📐 Aspect ratio selector (9:16, 16:9, 1:1, 4:3)
- 🎨 Fully themeable (custom accent color, backgrounds)
- 🌐 Localization (English, Portuguese)

See [FEATURES.md](./FEATURES.md) for the complete feature reference, rules, and step-by-step guides.

See the [SDK README](./packages/cng-editor-sdk/README.md) for full API docs.
