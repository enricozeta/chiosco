const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const printer = require('./printer');

exports.create = (req, res) => {
  const order = new Order(req.body);
  order.created_at = new Date();

  order.save((err, orderCreated) => {
    if (err) {
      res.sendStatus(err);
    } else {
      res.json(orderCreated);
      printer.printOrder(orderCreated);
    }
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Order.remove({ _id: id }, (err) => {
    if (err) {
      res.sendStatus(err);
    } else {
      res.json(id);
    }
  });
};

exports.findByDate = (req, res) => {
    const { date } = req.params;
    Order.find({created_at: {$gte:date} }, (error, order) => {
    if (error) {
      res.sendStatus(error);
    } else {
      res.json(order);
    }
  });
};

exports.getAll = (req, res) => {
    Order.find({ }, (error, order) => {
    if (error) {
      res.sendStatus(error);
    } else {
      res.json(order);
    }
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  Order.findOneAndUpdate({_id: id }, req.body, { new: true }, (error, order) => {
    if (error) {
      res.sendStatus(error);
    } else {
      res.json(order);
    }
  });
};