const express = require('express');
const app = express();
const adminRoute = express.Router();

// Admin model
let Admin = require('../models/admin');

// //create admin account, no longer needed
// adminRoute.route('/add-admin').post((req, res, next) => {
//     Admin.create(req.body, (error, data) => {
//       if (error) {
//         return next(error)
//       } else {
//         res.json(data)
//       }
//     })
//   });

  //login
  adminRoute.route('/login-check').post((req, res, next) => { 
      Admin.findOne({userName: req.body.username }, (err, admin) => {
        if (err)  throw err;
        if(admin==null){
            //res.send(JSON.stringify({ message: "Invalid Credentials" }));
        } else if (admin.password !== req.body.password){
            //res.send(JSON.stringify("login unsuccessful"));
        } else if (admin.password === req.body.password){
          adminLogin = JSON.parse(JSON.stringify(admin));
          res.send(JSON.stringify(adminLogin));
        };
    });
  });
  
module.exports = adminRoute;
  