const express = require('express');
const router = express.Router();

const { upload } = require('../storage_image(multer)/middleware')

const { signup_auth, signUp } = require('../All_routes/Authentication/signup')


router.use(upload.single('file'))
router.route('/signup').post(signup_auth)

module.exports = router;