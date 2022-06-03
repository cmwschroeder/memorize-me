const router = require('express').Router();
const gameRoutes = require('./gameRoutes');
const userRoutes = require('./userRoutes');
const highscoreRoutes = require('./highscoreRoutes');

router.use('/game', gameRoutes);
router.use('/users', userRoutes);
router.use('/scores', highscoreRoutes);

module.exports = router;