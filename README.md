# MS Trainer - Instrument Training Software

An intelligent instrument training application built with React, Vite, and TypeScript. Train efficiently using spaced repetition based on the forgetting curve algorithm.

## Features

- 📄 **Sheet Music Import**: Import and manage sheet music in MSCZ and MusicXML formats
- 🎯 **Smart Training**: Spaced repetition based on the forgetting curve algorithm
- 🎤 **Performance Recognition**: Real-time pitch detection using microphone input
- 📊 **Progress Tracking**: Monitor your learning progress with detailed statistics
- 🎼 **Note Extraction**: Automatically extract notes from imported sheet music
- ⚡ **Fast Development**: Built with Vite for lightning-fast HMR

## Project Structure

```
mstrainer/
├── apps/
│   └── app/                 # Main React application
│       ├── src/
│       │   ├── pages/       # Page components (Home, Training, SheetMusic)
│       │   ├── components/  # Reusable UI components
│       │   ├── features/    # Feature-specific modules
│       │   ├── utils/       # Utility functions (forgetting curve, audio)
│       │   └── types/       # TypeScript type definitions
│       └── package.json
├── packages/                # Shared packages (future expansion)
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Taoduhui/mstrainer.git
cd mstrainer
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## Core Algorithms

### Forgetting Curve

The application implements a spaced repetition system based on the Ebbinghaus forgetting curve:

- Items start with low memory strength
- Correct answers increase strength and extend review intervals
- Incorrect answers decrease strength and shorten review intervals
- Review intervals: 5min → 30min → 12h → 1d → 3d → 1w → 2w → 1m

### Pitch Detection

Audio processing uses autocorrelation for pitch detection:

- Real-time frequency analysis from microphone input
- Converts detected frequencies to musical notes
- Calculates pitch accuracy in cents (hundredths of a semitone)
- Provides instant feedback on performance

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **Audio Processing**: Web Audio API
- **Styling**: CSS with CSS Modules

## Features in Detail

### Sheet Music Import

Import sheet music files in MSCZ (MuseScore) or MusicXML format. The system automatically:
- Parses the musical notation
- Extracts individual notes with pitch, octave, and duration
- Prepares notes for training sessions

### Training System

The training module provides:
- Note-by-note practice with visual feedback
- Microphone input for performance validation
- Real-time accuracy scoring
- Statistics tracking (accuracy, streak, total attempts)
- Progressive difficulty based on performance

### Spaced Repetition

Notes are scheduled for review based on:
- Current memory strength (0-1 scale)
- Number of consecutive correct answers
- Time since last review
- Adaptive intervals that increase with mastery

## Future Enhancements

- [ ] Actual MSCZ file parsing implementation
- [ ] Advanced pitch detection algorithms
- [ ] Rhythm training mode
- [ ] Multi-instrument support
- [ ] User authentication and cloud sync
- [ ] Social features and leaderboards
- [ ] Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please open an issue on GitHub.
