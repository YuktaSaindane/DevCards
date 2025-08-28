"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const store_1 = require("../data/store");
const validate_1 = require("../utils/validate");
const router = (0, express_1.Router)();
// GET /api/decks - List all decks
router.get('/', (req, res) => {
    res.json(store_1.decks);
});
// POST /api/decks - Create a new deck
router.post('/', (req, res) => {
    try {
        const data = (0, validate_1.validateBody)(validate_1.createDeckSchema, req.body);
        const now = new Date().toISOString();
        const newDeck = {
            id: (0, uuid_1.v4)(),
            title: data.title,
            description: data.description,
            cards: [],
            createdAt: now,
            updatedAt: now,
        };
        store_1.decks.push(newDeck);
        res.status(201).json(newDeck);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// GET /api/decks/:deckId - Get one deck with card count
router.get('/:deckId', (req, res) => {
    const { deckId } = req.params;
    const deck = (0, store_1.findDeckById)(deckId);
    if (!deck) {
        return res.status(404).json({ error: 'not_found' });
    }
    const deckWithCount = {
        ...deck,
        cardCount: deck.cards.length,
    };
    res.json(deckWithCount);
});
// PUT /api/decks/:deckId - Update a deck
router.put('/:deckId', (req, res) => {
    try {
        const { deckId } = req.params;
        const data = (0, validate_1.validateBody)(validate_1.updateDeckSchema, req.body);
        const deck = (0, store_1.findDeckById)(deckId);
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
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// DELETE /api/decks/:deckId - Delete deck and its cards
router.delete('/:deckId', (req, res) => {
    const { deckId } = req.params;
    const deleted = (0, store_1.deleteDeckAndCards)(deckId);
    if (!deleted) {
        return res.status(404).json({ error: 'not_found' });
    }
    res.json({ success: true });
});
exports.default = router;
//# sourceMappingURL=decks.js.map