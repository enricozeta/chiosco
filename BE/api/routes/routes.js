const order = require('../controllers/orderController');
const teamPointsController = require('../controllers/teamPointsController');

module.exports = function chioscoRoute(app) {
  app.options("/*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
  });

  // Order
  app.route('/order/:date')
    .get(order.findByDate);

  app.route('/order/:id')
    .delete(order.delete)

  app.route('/order')
    .get(order.getAll)
    .post(order.create);


  // TeamPoints
  app.route('/teamPoints/:teamName')
    .get(teamPointsController.findByName)
    .put(teamPointsController.update)

  app.route('/teamPoints/:id')
    .delete(teamPointsController.delete)

  app.route('/teamPoints')
    .get(teamPointsController.getAll)
    .post(teamPointsController.create)
    .put(teamPointsController.addPoints);

};