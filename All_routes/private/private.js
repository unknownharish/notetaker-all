let { userSchema } = require('../../mongoDB/userSchema')
let jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../../config.env' })



exports.middleware = async(req, res, next) => {


    if (req.headers.token) {

        try {


            //unhash and verify the user exist in db
            let token = req.headers.token;

            let payload = await jwt.verify(token, process.env.secret);
            let user = await userSchema.findById(payload.id)


            if (user) {
                req.user = user
                next()
            } else {
                res.status(200).json({
                    msg: 'no user exists ',
                    error: true
                })
            }
        } catch (error) {
            res.status(200).json({
                msg: 'in hashing json ',
                error: true
            })
        }


    } else {

        res.status(200).json({
            msg: 'error in verifying user  ',
            error: true
        })

    }
}




exports.private = (req, res) => {
    let user;
    if (req.user) {
        user = req.user
        res.status(200).json({
            msg: 'hello',
            user,
            error: false
        })
    } else {


        res.status(200).json({
            msg: 'in private route without user ',
            error: true
        })
    }
}