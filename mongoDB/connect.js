const mongoose = require('mongoose');
require('dotenv').config({ path: '../config.env' })

exports.connect = async() => {
    await mongoose.connect(process.env.URL, (err) => {
        err ? console.log(err) : console.log('DB connected sucessfully')
    })

    // localhost
    // await mongoose.connect(process.env.URL, (err) => {
    //     err ? console.log(err) : console.log('DB connected sucessfully')
    // })
}