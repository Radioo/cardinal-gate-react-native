# Cardinal Gate

A React Native mobile app for viewing arcade game scores and statistics, built with Expo.

Supports tracking play data for:
- **IIDX** (beatmania IIDX) - play history, clear types, scores
- **SDVX** (Sound Voltex) - play history, volforce, scores
- **GITADORA** - skill points, drum/guitar profiles

## Setup

```bash
npm install
npx expo start
```

## Development

- Built with [Expo](https://expo.dev) and [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing
- Uses [@tanstack/react-query](https://tanstack.com/query) for data fetching
- Supports dark/light themes with customizable accent color

## Testing

```bash
npm test
```
