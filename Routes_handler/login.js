const router = require('express').Router();
const { loginAuth } = require('../All_routes/Authentication/loginauth')


router.post('/user', loginAuth)

module.exports = router;