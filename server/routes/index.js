const restroomRoutes = require('./restrooms');

const constructorMethod = (app) => {
  app.use('/restrooms', restroomRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;