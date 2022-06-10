const mongoose = require('mongoose');
const googleschema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'enter name it is necessary'],


    },
    email: {
        type: String,
        unique: [true, 'already exist']
    },

})


exports.googleModel = mongoose.model('googleUser', googleschema);