import { Router, Request, Response } from 'express';
import {
  findDeckById,
  addCardToDeck,
  removeCardFromDeck,
} from '../data/store';
import { validateBody, createCardSchema } from '../utils/validate';
import {
  Deck,
  Card,
  CreateCardRequest,
  ErrorResponse,
} from '../types/models';

const router = Router();

// POST /api/decks/:deckId/cards - Add a new card to the given deck
router.post('/:deckId/cards', (req: Request, res: Response<Deck | ErrorResponse>) => {
  try {
    const { deckId } = req.params;
    const data = validateBody(createCardSchema, req.body) as CreateCardRequest;
    
    const updatedDeck = addCardToDeck(deckId, data);
    if (!updatedDeck) {
      return res.status(404).json({ error: 'not_found' });
    }
    
    res.status(201).json(updatedDeck);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// GET /api/decks/:deckId/cards - Return all cards in a given deck
router.get('/:deckId/cards', (req: Request, res: Response<Card[] | ErrorResponse>) => {
  const { deckId } = req.params;
  
  const deck = findDeckById(deckId);
  if (!deck) {
    return res.status(404).json({ error: 'not_found' });
  }
  
  res.json(deck.cards);
});

// DELETE /api/decks/:deckId/cards/:cardId - Remove a specific card from the given deck
router.delete('/:deckId/cards/:cardId', (req: Request, res: Response<Deck | ErrorResponse>) => {
  const { deckId, cardId } = req.params;
  
  const updatedDeck = removeCardFromDeck(deckId, cardId);
  if (!updatedDeck) {
    return res.status(404).json({ error: 'not_found' });
  }
  
  res.json(updatedDeck);
});

export default router;
