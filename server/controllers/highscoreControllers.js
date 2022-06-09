const { Highscore, Game, User } = require('../models');

module.exports = {

    async createHighScore(req, res) {
        try {
            console.log(req.body);
            const highscoreData = await Highscore.create({score: req.body.score, username: req.user.username, game: req.body.game});

            await User.findOneAndUpdate(
                { username: req.user.username },
                { $push: { highscores: highscoreData._id } },
                { new: true });
            await Game.findOneAndUpdate(
                { title: req.body.game },
                { $push: { highscores: highscoreData._id } },
                { new: true });
            res.json("Highscore added");
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong" });
        }
    },


    getHighScores(req, res) {
        Highscore.find({})
            .select('-__v')
            .then(scoreData => res.json(scoreData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    getOneHighScore(req, res) {
        Highscore.findOne({ _id: req.params.id })
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
