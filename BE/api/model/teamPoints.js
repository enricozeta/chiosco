const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamPoints = new Schema({
  teamName:{
    type: String,
  },
  points: {
    type: Number,
  }
});

module.exports = mongoose.model('TeamPoints', TeamPoints);