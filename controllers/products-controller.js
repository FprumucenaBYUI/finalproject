const ProductModel = require('../models/products-model');

exports.getProducts = (req, res, next) => {
    console.info("Products-Controller - Getting all products to display in the shop page");
    ProductModel.fetchAll(products => {
        res.render('pages/shop', {
            productList: products
        }, console.info(`Products-Controller - ${products.length} products loaded to products page`));
    });
};

exports.getSingleProduct = (req, res, next) => {
    const productId = req.params.productId;
    ProductModel.findProductById(productId, product => {
        console.info(`Products-Controller - Detail Product: ID:${product.id} PRODUCT:${product.name} `);
        res.render('pages/detail', {
            product: product
        });
    });
};

exports.addProducts = (req, res, next) => {
    console.info("Products-Controller - Adding products ");
    res.render('pages/addProducts', {
        //TODO: create logic for adding products
    });
};