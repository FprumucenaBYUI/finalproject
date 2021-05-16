/**
 * APP CONSTANTS
 */
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products-controller');


/**
 * PRODUCT DETAIL ROUTE
 */
router.get('/product-detail/:productId', productsController.getSingleProduct);



/**
 * SHOW ALL PRODUCTS
 */
router.get('/', productsController.getProducts);


module.exports = router;