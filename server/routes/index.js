const restroomRoutes = require('./restrooms');
const userRoutes = require('./users');
const homepageRoutes = require('./homepage');

const constructorMethod = (app) => {
    app.use('/', homepageRoutes);
    app.use('/restrooms', restroomRoutes);
    app.use('/users', userRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;