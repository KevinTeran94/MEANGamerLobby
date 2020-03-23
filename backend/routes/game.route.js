const express = require('express');
const app = express();
const gameRoute = express.Router();

let Game = require('../models/Game');

// Add Game, no longer needed after seeding database
// gameRoute.route('/add-game').post((req, res, next) => {
//     Game.create(req.body, (error, data) => {
//       if (error) {
//         return next(error)
//       } else {
//         res.json(data)
//       }
//     })
//   });
  
  // Get All Games
  gameRoute.route('/game').get((req, res) => {
    Game.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  module.exports= gameRoute;