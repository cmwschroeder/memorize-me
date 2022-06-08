const { Schema, model } = require('mongoose');

const highscoreSchema = new Schema({
    score: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
    },
    game: {
        type: String,
    }
});

const Highscore = model('Highscore', highscoreSchema);

module.exports = Highscore;