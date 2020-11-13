const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/note.controller');
const { authenticateToken, authenticateTokenOrNull } = require('../middleware/middleware');

router.get('/:id/find', authenticateTokenOrNull, NoteController.getById);

router.get('/list', authenticateToken, NoteController.list);

router.post('/create', authenticateToken, NoteController.create);

router.put('/:id/update', authenticateToken, NoteController.update);

router.delete('/:id/delete', authenticateToken, NoteController.remove);

module.exports = router;