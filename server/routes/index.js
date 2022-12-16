
const restroomRoutes = require('./restrooms');
const userRoutes = require('./users');
const reviewsRoutes = require('./reviews');
const reportsRoutes = require('./reports');
const homepageRoutes = require('./homepage');
const profileRoutes = require('./profile');
const userData = require('../data/users');

const constructorMethod = (app) => {
  app.use("/users", userRoutes);

  app.use(userData.verifyJwtToken);


  app.use('/profile', profileRoutes);
  app.use('/search', homepageRoutes);
  app.use('/restrooms', restroomRoutes);
  app.use('/reviews', reviewsRoutes);
  app.use('/reports', reportsRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
