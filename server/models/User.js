const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  highscores: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Highscore'
      }
  ]
});

const User = model('User', userSchema);

module.exports = User;
