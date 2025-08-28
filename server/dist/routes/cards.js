"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../data/store");
const validate_1 = require("../utils/validate");
const router = (0, express_1.Router)();
// POST /api/decks/:deckId/cards - Add a new card to the given deck
router.post('/:deckId/cards', (req, res) => {
    try {
        const { deckId } = req.params;
        const data = (0, validate_1.validateBody)(validate_1.createCardSchema, req.body);
        const updatedDeck = (0, store_1.addCardToDeck)(deckId, data);
        if (!updatedDeck) {
            return res.status(404).json({ error: 'not_found' });
        }
        res.status(201).json(updatedDeck);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// GET /api/decks/:deckId/cards - Return all cards in a given deck
router.get('/:deckId/cards', (req, res) => {
    const { deckId } = req.params;
    const deck = (0, store_1.findDeckById)(deckId);
    if (!deck) {
        return res.status(404).json({ error: 'not_found' });
    }
    res.json(deck.cards);
});
// DELETE /api/decks/:deckId/cards/:cardId - Remove a specific card from the given deck
router.delete('/:deckId/cards/:cardId', (req, res) => {
    const { deckId, cardId } = req.params;
    const updatedDeck = (0, store_1.removeCardFromDeck)(deckId, cardId);
    if (!updatedDeck) {
        return res.status(404).json({ error: 'not_found' });
    }
    res.json(updatedDeck);
});
exports.default = router;
//# sourceMappingURL=cards.js.map