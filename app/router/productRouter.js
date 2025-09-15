const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');


// product
router.get('/product/form',productController.productForm)
router.post('/product/create', productController.createProduct)
router.get('/edit/products/:id',productController.productEdit)
// Update product (POST)
router.post('/edit/products/:id', productController.updateProduct);
router.get('/delete/:id',productController.deleteProduct)
module.exports = router;