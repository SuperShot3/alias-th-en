# Alias Thai ⇄ English

A mobile-only web application for learning Thai and English word pairs through an interactive card game.

## Description

Alias Thai ⇄ English is a Next.js-based web application designed for mobile devices. Players can flip between Thai and English translations on cards, navigate through random cards, and search for specific cards by ID. The app features swipe gestures for intuitive navigation and maintains a history of viewed cards.

## Features

- **Card Flipping**: Tap cards to flip between Thai and English sides
- **Random Card Selection**: Get random cards with the "Next card" button
- **Card Search**: Find specific cards by entering their ID number
- **Swipe Navigation**: 
  - Swipe left for next card
  - Swipe right to go back to previous card
- **History Management**: Navigate back through previously viewed cards
- **Mobile-First Design**: Optimized for mobile devices with touch-friendly UI
- **Accessibility**: ARIA labels and keyboard navigation support

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules** (no Tailwind)
- **React 18**

## Requirements

- Node.js 18+ 
- npm or yarn

## Local Development

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your mobile browser or browser's mobile emulation mode.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
alias_game/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with screen routing
│   └── globals.css         # Global styles
├── components/
│   ├── WelcomeScreen.tsx   # Welcome/Search screen
│   ├── WelcomeScreen.module.css
│   ├── GameScreen.tsx      # Game screen with swipe handling
│   ├── GameScreen.module.css
│   ├── FlipCard.tsx        # Card flip component
│   ├── FlipCard.module.css
│   ├── CardView.tsx        # Card view for Find card feature
│   └── CardView.module.css
├── data/
│   └── cards.json          # Card data (Thai-English pairs)
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Data Format

Cards are stored in `data/cards.json`. Each card has:
- `id`: Unique numeric identifier
- `pairs`: Array of exactly 8 objects with `thai` and `english` properties

Example:
```json
{
  "id": 1,
  "pairs": [
    { "thai": "สวัสดี", "english": "Hello" },
    { "thai": "ขอบคุณ", "english": "Thank you" },
    ...
  ]
}
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project" and import your repository

4. Vercel will automatically detect Next.js and configure the build settings

5. Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in

2. Click "Add New Project"

3. Import your Git repository or upload the project folder

4. Configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build` (or `yarn build`)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (or `yarn install`)

5. Click "Deploy"

## How to Play

1. **Welcome Screen**: 
   - Click "Find a card" to search for a specific card by ID
   - Click "Start" to begin with a random card

2. **Game Screen**:
   - Tap the card to flip between Thai and English
   - Use "Next card" button to get a random card
   - Swipe left to go to next card
   - Swipe right to go back to previous card
   - Click "Exit" to return to welcome screen

3. **Find Card**:
   - Enter a card number (1-3 for sample data)
   - View the card with flip functionality
   - Click "Back / Home" to return

## Adding More Cards

To add more cards, edit `data/cards.json` and add new card objects following the same format. Each card must have:
- A unique numeric `id`
- Exactly 8 word pairs in the `pairs` array

## Browser Compatibility

- Modern mobile browsers (Chrome, Safari, Firefox)
- Desktop browsers with mobile emulation
- Requires touch support for swipe gestures (mouse drag works but touch is recommended)

## Notes

- Browser refresh always returns to the Welcome screen (no state persistence)
- Card history is maintained during a session but resets on page refresh
- Cards always start on the Thai side when navigating (next/previous)
- The app is optimized for mobile viewports and touch interactions

## License

This project is open source and available for personal use.
