const router = require('express').Router();

const {
    createHighScore,
    getHighScores,
    getOneHighScore,
    updateHighScore,
    deleteHighScore,
} = require('../../controllers/highscoreControllers')

router.route('/').get(getHighScores).post(createHighScore)
router.route('/:id').get(getOneHighScore).put(updateHighScore).delete(deleteHighScore);

module.exports = router;