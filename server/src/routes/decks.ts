import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  decks,
  findDeckById,
  getFlashcardsByDeckId,
  deleteDeckAndCards,
} from '../data/store';
import { validateBody, createDeckSchema, updateDeckSchema } from '../utils/validate';
import {
  Deck,
  DeckWithCardCount,
  CreateDeckRequest,
  UpdateDeckRequest,
  ErrorResponse,
} from '../types/models';

const router = Router();

// GET /api/decks - List all decks
router.get('/', (req: Request, res: Response<Deck[]>) => {
  res.json(decks);
});

// POST /api/decks - Create a new deck
router.post('/', (req: Request, res: Response<Deck | ErrorResponse>) => {
  try {
    const data = validateBody(createDeckSchema, req.body) as CreateDeckRequest;
    
    const now = new Date().toISOString();
    const newDeck: Deck = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      createdAt: now,
      updatedAt: now,
    };
    
    decks.push(newDeck);
    res.status(201).json(newDeck);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// GET /api/decks/:deckId - Get one deck with card count
router.get('/:deckId', (req: Request, res: Response<DeckWithCardCount | ErrorResponse>) => {
  const { deckId } = req.params;
  const deck = findDeckById(deckId);
  
  if (!deck) {
    return res.status(404).json({ error: 'not_found' });
  }
  
  const cards = getFlashcardsByDeckId(deckId);
  const deckWithCount: DeckWithCardCount = {
    ...deck,
    cardCount: cards.length,
  };
  
  res.json(deckWithCount);
});

// PUT /api/decks/:deckId - Update a deck
router.put('/:deckId', (req: Request, res: Response<Deck | ErrorResponse>) => {
  try {
    const { deckId } = req.params;
    const data = validateBody(updateDeckSchema, req.body) as UpdateDeckRequest;
    
    const deck = findDeckById(deckId);
    if (!deck) {
      return res.status(404).json({ error: 'not_found' });
    }
    
    // Update deck properties
    if (data.title !== undefined) {
      deck.title = data.title;
    }
    if (data.description !== undefined) {
      deck.description = data.description;
    }
    deck.updatedAt = new Date().toISOString();
    
    res.json(deck);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// DELETE /api/decks/:deckId - Delete deck and its cards
router.delete('/:deckId', (req: Request, res: Response<{ success: boolean } | ErrorResponse>) => {
  const { deckId } = req.params;
  
  const deleted = deleteDeckAndCards(deckId);
  if (!deleted) {
    return res.status(404).json({ error: 'not_found' });
  }
  
  res.json({ success: true });
});

export default router;
