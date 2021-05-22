const app = require('express');
const router = app.Router();
const { login, register, getUser } = require('../helpers/auth')
const { User } = require('../db/models');

router.post('/login', login);
router.post('/register', register)
router.get('/user', getUser)


module.exports = router;