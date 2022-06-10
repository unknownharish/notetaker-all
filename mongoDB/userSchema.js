const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config.env' })


const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: [true || 'enter username '],
        unique: [true || 'already exist']

    },
    name: {
        type: String,
        required: [true || 'enter name ']
    },
    password: {
        type: String,
        select: false
    },
    image: {
        type: String,

    },
    googleUser: {
        type: Boolean,
        required: [true || 'google user field not defined']

    }



});


userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        //lets encrypt the password

        let salt = await bcrypt.genSalt(15)
        this.password = await bcrypt.hash(this.password, salt);

        next()
    }
    // password value already encrypted
    next()
})


// lets compare the password

userSchema.methods.compare = async function(password) {

    let compare = await bcrypt.compare(password, this.password);
    return compare

}

userSchema.methods.genToken = async function() {

    let payload = {
        'id': this._id
    }


    let token = jwt.sign(payload, process.env.secret, { expiresIn: 60 * 30 }) // { expiresIn: 60 } 60s
    return token;
}


exports.userSchema = mongoose.model('user_details', userSchema);