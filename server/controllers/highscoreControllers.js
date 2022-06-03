const { Highscore, Game, User } = require('../models');

module.exports = {

    createHighScore(req, res) {
        Highscore.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { highscores: _id } },
                    { new: true });
            })
            .then(scoreData => {
                if (!scoreData) {
                    res.status(404).json({ message: 'Something wrong happened :(' });
                    return;
                }
                res.json(scoreData)
            })
            .catch(err => res.json(err));
    },


    getHighScores(req, res) {
        Highscore.find({})
            .populate({ path: 'user', select: '-__v' })
            .populate({ path: 'game', select: '-__v' })
            .select('-__v')
            .then(scoreData => res.json(scoreData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    getOneHighScore(req, res) {
        Highscore.findOne({ _id: req.params.id })
            .populate({ path: 'user', select: '-__v' })
            .populate({ path: 'game', select: '-__v' })
            .select('-__v')
            .then(scoreData => {
                if (!scoreData) {
                    res.status(404).json({ message: 'No highscore with this ID' });
                    return;
                }
                res.json(scoreData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    updateHighScore(req, res) {
        Highscore.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true })
            .populate({ path: 'user', select: '-__v' })
            .populate({ path: 'game', select: '-__v' })
            .select('-___v')
            .then(scoreData => {
                if (!scoreData) {
                    res.status(404).json({ message: 'No highscore with this ID' });
                    return;
                }
                res.json(scoreData)
            })
            .catch(err => res.json(err));
    },

    deleteHighScore(req, res) {
        Highscore.findOneAndDelete({ _id: req.params.id })
            .then(scoreData => {
                if (!scoreData) {
                    res.status(404).json({ message: 'No highscore with this ID' });
                    return;
                }
                res.json(thoughts);
            })
            .catch(err => res.status(400).json(err));
    },
};
