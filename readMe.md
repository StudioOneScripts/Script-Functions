# S1 Utility Functions

This script provides a collection of helper functions for working with **Studio One’s scripting API**, covering transport control, tracks, channels, mixer management, file I/O, and utility operations.

---

## 📖 Overview

The `S1` object contains grouped methods for:

- **Transport control**
- **Tracks & channels management**
- **Mixer reset & normalization**
- **Coloring and naming**
- **File read/write support**
- **Window management**
- **Utility shortcuts**

---

## 🚀 Functions

### Core
- `S1.runCommand(context, command)` → Runs a Studio One command.
- `S1.getVersion()` → Returns the Studio One version.

### Transport
- `S1.getTransport()` → Gets the active transport panel.
- `S1.getTrackFilter()` / `S1.getChannelFilter()` / `S1.getHeaderTrackFilter()` → Access filters.

### Tracks
- `S1.getTrackList()` → Gets the main track list.
- `S1.getTracks()` → Returns all tracks.
- `S1.getSelectedTracks()` → Returns selected tracks.
- `S1.disableMutedTracks()` → Disables muted tracks.
- `S1.colorTrack(context, track, hexColor)` → Colors a track.
- `S1.normalizeTrackNames(context)` → Normalizes track names (title case).
- `S1.removeEmptyTracks(context)` → Removes empty audio/music tracks.

### Channels
- `S1.getMixer()` → Gets the mixer console.
- `S1.getChannels()` → Returns all mixer channels.
- `S1.getSelectedChannels()` → Returns selected channels.
- `S1.getMasterBus()` → Returns master bus channel.
- `S1.prefixMixerChannels()` → Prefixes channels with numbers.
- `S1.removeChannelPrefixes()` → Removes prefixes from channel names.
- `S1.removeChannelNotes()` → Clears notes from all channels.

### Mixer Reset
- `S1.resetMixer()` → Resets entire mixer (gain, pan, VCA, speaker, FX).
- `S1.resetInputGain(selected)` → Resets input gain.
- `S1.resetPolarity(selected)` → Resets polarity.
- `S1.resetPan(selected)` → Resets pan to center.
- `S1.fadersToUnity(selected)` → Sets faders to 0dB.
- `S1.fadersToInfinty(selected)` → Sets faders to -∞.
- `S1.resetVCA(selected)` → Resets VCA assignments.
- `S1.resetSpeaker(selected)` → Resets speaker setup.
- `S1.panChannelPairs()` → Pans selected channels left/right alternately.

### File I/O
- `S1.writeTextFile(folder, filename, text)` → Writes text to file.
- `S1.readTextFile(folder, filename)` → Reads text file into an array.
- `S1.saveNewVersion(name)` → Saves song as a new version.
- `S1.exportStems()` → Exports stems.

### Engine
- `S1.getAudioDeviceName()` → Returns current audio device name.

### Windows
- `S1.openWindow(window)` → Opens a Studio One window.
- `S1.closeWindow(window)` → Closes a Studio One window.
- `S1.closeHeaderTracks()` → Closes header/tempo/arranger/chord/marker/lyrics/video tracks.

### Utilities
- `S1.getLegalFileName(fileName)` → Sanitizes string for file name.
- `print(msg)` → Console log.
- `alert(msg)` → Alert dialog.
- `ask(msg)` → Yes/No dialog.
- `getAllPropertyNames(obj)` → Dumps all property names of an object.

---

## 🪟 Useful Window Names
Examples for `S1.openWindow()` and `S1.closeWindow()`:
```
BigTimeDisplay, Browser, ChordDisplay, Console, Editor,
Inspector, LyricsDisplay, MetronomeSetup, MidiMonitor,
PerformanceMonitor, PluginManager, RecordPanel, 
SignatureEditor, SongInformation, SongToolbar, SynthRack,
TempoEditor, TrackList, VideoPlayer
```

---

## 📂 Notes
- Designed for **Studio One scripting environment**.
- Functions rely on `Host` API calls and only work inside Studio One.
- Use with caution: some functions (e.g., `S1.resetMixer`) make irreversible changes.
