const Product = require('../models/products-model');

exports.addProduct = (req, res, next) => {
    res.render('admin/add-products', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.inputProdTitle;
    const imageUrl = req.body.inputProdImgUrl;
    const price = req.body.inputProdPrice;
    const description = req.body.inputProdDesc;
    const product = new Product(title, price, description, imageUrl);


    product
        .save()
        .then(result => {
            console.log('Product Created');
            res.redirect('/add-product');
        })
        .catch(err => {
            console.log(err);
        });
};