const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const UsersController = require('../controllers/users');


router.post('/signup', UsersController.user_signup);
router.post('/login', UsersController.create_user);
router.delete('/:userId', checkAuth, UsersController.remove_user);




module.exports = router;