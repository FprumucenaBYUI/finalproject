const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const secret = require('./secret/secret');

const User = require('./models/user');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const app = express();
const PORT = process.env.PORT || 5000
const corsOptions = {
    origin: "https://finalproject-store.herokuapp.com/",
    optionsSuccessStatus: 200
};
const mongoose = require('mongoose');
// const MONGODB_URL = process.env.MONGODB_URL || secret.getMongoUrl;
const MONGODB_URL = process.env.MONGODB_URL;

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    family: 4
};

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.use((req, res, next) => {
    User.findById('60a72dcfd0630c368c670f3c')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
    .connect(MONGODB_URL, options)
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Fla',
                    email: 'fla@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        });
        app.listen(PORT, () => {
            console.info(`Store Server running on Port ${PORT}`);
        })
    })
    .catch(err => {
        console.error(err);
    });

//Week4 Mongoose finished