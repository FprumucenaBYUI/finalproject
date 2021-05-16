const Product = require('../models/products-model');

exports.getProducts = (req, res, next) => {
    console.info("Products-Controller - Getting all products to display in the shop page");
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            }, console.info(`Products-Controller - ${products.length} products loaded to products page`));
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSingleProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .then(product => {
            res.render('pages/detail', {
                product: product
            }, console.info(`Products-Controller - Detail Product: ID:${productId} PRODUCT:${product.title} `));
        })
        .catch(err => console.error(err));
};