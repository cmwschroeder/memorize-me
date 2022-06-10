const router = require('express').Router();

const {
    createHighScore,
    getHighScores,
    getOneHighScore,
    updateHighScore,
    deleteHighScore,
} = require('../../controllers/highscoreControllers');

const { authMiddleware } = require('../../utils/auth');

router.route('/').get(getHighScores).post(authMiddleware, createHighScore);
router.route('/:id').get(getOneHighScore).put(updateHighScore).delete(deleteHighScore);
module.exports = router;