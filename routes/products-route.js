/**
 * APP CONSTANTS
 */
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products-controller');

/**
 * ADD PRODUCTS ROUTE
 */
router.get('/add-product', productsController.addProducts);


/**
 * PRODUCT DETAIL ROUTE
 */
router.get('/product-detail/:productId', productsController.getSingleProduct);



/**
 * DEFAULT ROUTE - SHOW ALL PRODUCTS
 */
router.get('/', productsController.getProducts);


module.exports = router;