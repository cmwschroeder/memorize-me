const router = require('express').Router();

const {
    getGames,
    getOneGame,
} = require('../../controllers/gameControllers')

router.route('/').get(getGames)
router.route('/:id').get(getOneGame);

module.exports = router;