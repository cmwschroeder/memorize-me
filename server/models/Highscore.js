const { Schema, model } = require('mongoose');

const highscoreSchema = new Schema({
    score: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }
});

const Highscore = model('Highscore', highscoreSchema);

module.exports = Highscore;