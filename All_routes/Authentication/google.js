require('dotenv').config({ path: '../../config.env' })
const { userSchema } = require('../../mongoDB/userSchema')

exports.googleAuth = async(req, res) => {

    const { email, name, imageUrl } = req.body;

    let obj = {
        email,
        name,
        image: imageUrl,
        googleUser: true
    }



    try {

        // check user exist or create new one  assign token in cookie 
        let user = await userSchema.findOne({ email });
        if (!user) {
            let newUser = new userSchema(obj)
            await newUser.save();
            let token = await newUser.genToken();

            // add token to request cookie
            // res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true }); //  1 hr
            // res.header("Access-Control-Allow-Credentials", true);


            if (newUser) {
                res.status(200).json({
                    newUser,
                    error: false,
                    token
                })
            }




        } else {

            let token = await user.genToken();


            // res.cookie('token', token, { maxAge: 60 * 1000, httpOnly: true }); //  1 min
            // res.header("Access-Control-Allow-Credentials", true);

            res.status(200).json({
                userid: user._id,
                data: 'user already exist',
                error: false,
                token

            })
        }

    } catch (error) {
        // development
        console.log(error)
        res.status(200).json({
            error: true,
            reason: error
        })
    }


}