const mongoose = require('mongoose');


const schema = mongoose.Schema({
    userId: {
        type: String,
        required: [true || 'provide the user_id of user ']
    },
    title: {
        type: String,
        required: [true || 'title is necessary']
    },
    body: {
        type: String,
        required: [true || 'body is necessary']
    }
});



exports.Note = mongoose.model('notetakers', schema);