# DevCards Backend

A TypeScript Express backend for the DevCards flashcard study app.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The server runs on `http://localhost:4000` with CORS enabled for `http://localhost:5173`.

## API Routes

### Health Check
- `GET /api/health` - Returns server status

### Decks
- `GET /api/decks` - List all decks
- `POST /api/decks` - Create a new deck
  - Body: `{ title: string, description?: string }`
- `GET /api/decks/:deckId` - Get one deck with card count
- `PUT /api/decks/:deckId` - Update a deck
  - Body: `{ title?: string, description?: string }`
- `DELETE /api/decks/:deckId` - Delete deck and its cards

### Flashcards
- `GET /api/decks/:deckId/flashcards` - List cards for a deck
- `POST /api/decks/:deckId/flashcards` - Add card to deck
  - Body: `{ question: string, answer: string }`
- `PUT /api/flashcards/:cardId` - Update a card
  - Body: `{ question?: string, answer?: string }`
- `DELETE /api/flashcards/:cardId` - Delete a card

## Data Models

### Deck
```typescript
{
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Flashcard
```typescript
{
  id: string;
  deckId: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}
```

## Error Responses

- `400` - Invalid input: `{ error: "message" }`
- `404` - Not found: `{ error: "not_found" }`
- `500` - Server error: `{ error: "Internal server error" }`

## Seed Data

The server automatically seeds 3 demo decks on startup:
1. **React Basics** - 3 cards about React fundamentals
2. **JavaScript Trivia** - 3 cards about JavaScript concepts
3. **Database Concepts** - 3 cards about database terminology

## Quick Verification

Test the API endpoints:

```bash
# Health check
curl http://localhost:4000/api/health

# Get all decks
curl http://localhost:4000/api/decks

# Get cards for first deck (replace with actual deckId)
curl http://localhost:4000/api/decks/{deckId}/flashcards

# Create a new deck
curl -X POST http://localhost:4000/api/decks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Deck", "description": "A test deck"}'
```

## Technology Stack

- **Express** - Web framework
- **TypeScript** - Type safety
- **Zod** - Runtime validation
- **UUID** - Unique ID generation
- **CORS** - Cross-origin resource sharing
- **ts-node-dev** - Development server with hot reload
