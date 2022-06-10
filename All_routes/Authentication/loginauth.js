const { userSchema } = require('../../mongoDB/userSchema');

exports.loginAuth = async(req, res) => {

    let { email, password } = req.body;

    if (!email || !password) {
        res.status(200).json({
            'error': false
        })
    } else {

        try {

            let user = await userSchema.findOne({ email }).select('password');
            if (await user.compare(password)) {

                let token = await user.genToken();


                // res.cookie('token', token, { maxAge: 60 * 1000, httpOnly: true }); //  1 min
                // res.header("Access-Control-Allow-Credentials", true);

                res.status(200).json({
                    user: user._id,
                    token,
                    error: false

                })




            } else {

                // res.clearCookie('token')
                res.status(200).json({
                    error: true
                })

            }

        } catch (error) {
            res.status(500).json({
                'error': true
            })
        }
    }

}