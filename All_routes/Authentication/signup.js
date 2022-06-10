const { userSchema } = require('../../mongoDB/userSchema');

exports.signup_auth = async(req, res) => {

    let { email, name, password } = req.body;



    if (!email || !name || !password || !req.file) {

        res.status(401).json({
            error: 'invalid / missing information'
        })


    } else {


        const file = req.file;
        const filename = file.filename;

        let insert = {
            email,
            name,
            password,
            image: filename,
            googleUser: false

        }

        try {

            let user = new userSchema(insert);
            await user.save();

            if (!user) {

                res.status(200).json({

                    'error': ' user already exists..!'
                })
            } else {
                let token = await user.genToken();


                res.status(200).json({
                    error: false,
                    userid: user._id,
                    token

                })



            }



        } catch (error) {
            console.log(error)
            res.status(200).json({

                'error': true
            })
        }

    }





}



exports.signUp = async(req, res) => {

    let { email, name, password } = req.body


    res.json({
        email,
        name,
        password,
        file: [req.file]

    })


}