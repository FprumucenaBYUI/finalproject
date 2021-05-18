/**
 * APP CONSTANTS
 */
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop-controller');


/**
 * PRODUCT DETAIL ROUTE
 */
router.get('/product-detail/:productId', shopController.getSingleProduct);

router.post('/cart', shopController.postCart);


/**
 * SHOW ALL PRODUCTS
 */
router.get('/', shopController.getProducts);


module.exports = router;