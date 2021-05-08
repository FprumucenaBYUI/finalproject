const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'Tshirts.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(id, img, name, description, price) {
        this.id = id;
        this.imageUrl = img;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }


    static findProductById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id == id);
            cb(product);
        });
    }
};