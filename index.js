/**
 * Creating app by using Express
 * and defining the routes in the routes folder
 * Defining port 3000 for Heroku
 */
const express = require('express');
const shopRoute = require('./routes/shop_route');
const adminRoute = require('./routes/admin-route');
const errorController = require('./controllers/error-controller');
const path = require('path');
const cors = require('cors');
const mongoConnect = require('./util/database').mongoConnect;
const app = express();
const PORT = process.env.PORT || 3000
const corsOptions = {
    origin: "https://finalproject-store.herokuapp.com/",
    optionsSuccessStatus: 200
};
const User = require('./models/user-model');


/**
 * Declare EJS for html rendering
 * Adding routes into the application
 * Adding Error controler into the application 
 * instantiating app server instance on port 3000
 * 
 */
app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(express.urlencoded({ extended: false }))
    .use(cors(corsOptions))
    .use(shopRoute)
    .use(adminRoute)
    .use(errorController.get404)
    .use((req, res, next) => {
        User.findById('60a0cc40b451edaab5df1f34')
            .then(user => {
                // req.user = new User(user.name, user.email, user.cart, user._id);
                req.user = user;
                next();
            })
            .catch(err => console.log(err));
    });


mongoConnect(() => {
    app.listen(PORT, () => {
        console.info(`Store Server running on Port ${PORT}`);
    });
})