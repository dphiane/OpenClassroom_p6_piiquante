const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name:{String},
    manufacturer:{String},
    description:{String},
    mainPeper:{String},
    imageUrl:{String},
    heat:{String},
});

module.exports = mongoose.model('Sauce', sauceSchema);