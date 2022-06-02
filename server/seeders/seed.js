const db = require('../config/connection');
const { User, Game, Highscore } = require('../models');
const userSeeds = require('./userSeeds.json');
const gameSeeds = require('./gameSeeds.json');

db.once('open', async () => {
    try {
      await Game.deleteMany({});
      await Highscore.deleteMany({});
      await User.deleteMany({});
  
      await User.create(userSeeds);

      await Game.create(gameSeeds);

      const user = await User.findOne({ username: "User" });
      const game = await Game.findOne({ title: "Number Game"});

      const highScore = {
          score: 7,
          user: user._id,
          game: game._id
      }
      
      await Highscore.collection.insertOne(highScore);

    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('all done!');
    process.exit(0);
  });