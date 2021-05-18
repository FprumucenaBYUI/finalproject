const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin-controller');
const router = express.Router();

router.get('/add-product', adminController.addProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.get('/delete-product/:productId', adminController.deleteProduct);


module.exports = router;