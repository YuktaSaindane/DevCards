import express from 'express';
import cors from 'cors';
import { seedData } from './data/store';
import decksRouter from './routes/decks';
import cardsRouter from './routes/cards';
import flashcardsRouter from './routes/flashcards';
import { HealthResponse } from './types/models';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Health check route
app.get('/api/health', (req, res: express.Response<HealthResponse>) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/decks', decksRouter);
app.use('/api/decks', cardsRouter);
app.use('/api', flashcardsRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize server
const startServer = () => {
  // Seed the database with demo data
  seedData();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API endpoints:`);
    console.log(`   GET  /api/health`);
    console.log(`   GET  /api/decks`);
    console.log(`   POST /api/decks`);
    console.log(`   GET  /api/decks/:deckId`);
    console.log(`   PUT  /api/decks/:deckId`);
    console.log(`   DELETE /api/decks/:deckId`);
    console.log(`   GET  /api/decks/:deckId/cards`);
    console.log(`   POST /api/decks/:deckId/cards`);
    console.log(`   DELETE /api/decks/:deckId/cards/:cardId`);
    console.log(`   GET  /api/decks/:deckId/flashcards`);
    console.log(`   POST /api/decks/:deckId/flashcards`);
    console.log(`   PUT  /api/flashcards/:cardId`);
    console.log(`   DELETE /api/flashcards/:cardId`);
  });
};

startServer();
