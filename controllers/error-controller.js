const path = require('path');
exports.get404 = (req, res, next) => {
    res.status(404).render('pages/404', { title: 'Page Not Found', path: req.url });
};