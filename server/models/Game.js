const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    highscores: [{
        type: Schema.Types.ObjectId,
        ref: 'Highscore'
    }]
});

const Game = model('Game', gameSchema);

module.exports = Game;