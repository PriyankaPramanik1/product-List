const express= require('express');

const LookUpController = require('../controller/LookUpController');

const router= express.Router();
//create user
router.post('/create/user',LookUpController.createUser);
router.post('/create/product',LookUpController.createProduct);
router.get('/product', LookUpController.getproduct);






module.exports = router;