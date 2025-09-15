const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

//user lookup route

router.get('/user/form',userController.userCreate)
router.post('/user/create', userController.createUser);
router.get('/get/user', userController.getUser)

module.exports = router;