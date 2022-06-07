const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    instructions: {
        type: String,
    },
    image: {
        type: String,
    },
    preview: {
        type: String,
    },
    link: {
        type: String,
    },
    highscores: [{
        type: Schema.Types.ObjectId,
        ref: 'Highscore'
    }]
});

const Game = model('Game', gameSchema);

module.exports = Game;