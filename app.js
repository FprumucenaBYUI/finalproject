const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
<<<<<<< HEAD
=======

>>>>>>> 5c40c412804d2e56782f6b43a2c371d8bdc6e444
const User = require('./models/user');

//ROUTES 
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


const app = express();
const PORT = process.env.PORT || 5000
const corsOptions = {
    origin: "https://finalproject-store.herokuapp.com/",
    optionsSuccessStatus: 200
};

const mongoose = require('mongoose');
<<<<<<< HEAD
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const MONGODB_URL = process.env.MONGODB_URL;
=======
const MONGODB_URL = process.env.MONGODB_URL;

>>>>>>> 5c40c412804d2e56782f6b43a2c371d8bdc6e444
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    family: 4
};

const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(cors(corsOptions));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
    .connect(MONGODB_URL, options)
    .then(result => {
        app.listen(PORT, () => {
            console.info(`Store Server running on Port ${PORT}`);
        })
    })
    .catch(err => {
        console.error(err);
    });