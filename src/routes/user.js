const app = require('express');
const router = app.Router();
const { login, register, getUser, loginRequired } = require('../helpers/auth')

router.post('/login', login);
router.post('/register', register)
router.get('/user', loginRequired, getUser)


module.exports = router;