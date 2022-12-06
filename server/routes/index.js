const restroomRoutes = require('./restrooms');
const userRoutes = require('./users');
const reviewsRoutes = require('./reviews');
const reportsRoutes = require('./reports');
const homepageRoutes = require('./homepage');

const constructorMethod = (app) => {
  app.use('/', homepageRoutes);
  app.use('/restrooms', restroomRoutes);
  app.use('/users', userRoutes);
  app.use('/reviews', reviewsRoutes);
  app.use('/reports', reportsRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;