# DevCards Frontend

A React + TypeScript frontend for the DevCards flashcard study app.

## Features

- 📚 **Deck Management**: View, create, and delete flashcard decks
- 🃏 **Flashcard Flip Effect**: Interactive card flipping with smooth animations
- 🎯 **Study Mode**: Progressive study session with accuracy tracking
- ➕ **Card Creation**: Add new flashcards to any deck
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🎨 **Modern UI**: Clean design with TailwindCSS

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start

# Build for production
npm run build
```

## Requirements

- Node.js 16+
- Backend server running on http://localhost:4000

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Create React App** - Build tooling

## Usage

1. **Start the backend server** first (in the `server` directory):
   ```bash
   cd ../server
   npm run dev
   ```

2. **Start the frontend** (in this directory):
   ```bash
   npm start
   ```

3. **Open your browser** to http://localhost:3000

## Features Overview

### 🏠 Home Screen
- View all your flashcard decks
- Create new decks
- Quick access to study mode

### 🃏 Deck View
- Browse all flashcards in a deck
- Add new flashcards
- Delete individual cards
- Start study sessions

### 📖 Study Mode
- Progressive card study
- Flip cards to reveal answers
- Mark answers as correct/incorrect
- Real-time progress tracking
- Final accuracy statistics
- Option to study again

### ➕ Creating Content
- **New Deck**: Title and optional description
- **New Flashcard**: Question and answer pair
- Form validation and error handling

## API Integration

The frontend connects to the backend API at `http://localhost:4000/api`:

- `GET /decks` - Load all decks
- `POST /decks` - Create new deck
- `GET /decks/:id/flashcards` - Load deck flashcards
- `POST /decks/:id/flashcards` - Add flashcard
- `DELETE /flashcards/:id` - Delete flashcard

## Responsive Design

- **Desktop**: Multi-column grid layouts
- **Tablet**: Responsive grid with appropriate spacing
- **Mobile**: Single-column stack with touch-friendly buttons

## Development

```bash
# Start development server with hot reload
npm start

# Run tests
npm test

# Build for production
npm run build

# Eject from Create React App (not recommended)
npm run eject
```

The app automatically opens at http://localhost:3000 and hot-reloads when you make changes.