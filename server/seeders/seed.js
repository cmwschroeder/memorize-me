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

    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  
    console.log('all done!');
    process.exit(0);
  });