const router = require('express').Router();

const { googleAuth } = require('../All_routes/Authentication/google')


router.route('/login').post(googleAuth)




module.exports = router