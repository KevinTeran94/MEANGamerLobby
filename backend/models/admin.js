const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Admin = new Schema({
    player_name: {type: String},
    userName: {type: String},
    password: {type: String}
}, {collection:'admin'});

module.exports = mongoose.model('Admin', Admin);