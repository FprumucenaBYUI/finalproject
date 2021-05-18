const Product = require('../models/products-model');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;


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
    const product = new Product(title, price, description, imageUrl, null, req.user._id);

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


exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.inputProdTitle;
    const updatedPrice = req.body.inputProdPrice;
    const updatedImageUrl = req.body.inputProdImgUrl;
    const updatedDesc = req.body.inputProdDesc;

    const product = new Product(
        updatedTitle,
        updatedPrice,
        updatedDesc,
        updatedImageUrl,
        new ObjectId(prodId)
    );
    product
        .save()
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.deleteById(prodId)
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/products');
        })
        .catch(err => console.log(err));
};