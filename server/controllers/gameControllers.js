const { Game, User } = require('../models');

module.exports = {

    getGames(req, res) {
        Game.find({})
            .populate({ path: 'highscores', select: '-__v' })
            .select('-__v')
            .then(gamesData => res.json(gamesData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    getOneGame(req, res) {
        Game.findOne({ _id: req.params.id })
            .populate({ path: 'highscores', select: '-__v' })
            .select('-__v')
            .then(gamesData => {
                if (!gamesData) {
                    res.status(404).json({ message: 'No Games with this ID' });
                    return;
                }
                res.json(gamesData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
};
