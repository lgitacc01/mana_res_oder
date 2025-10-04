const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  stt: { type: Number, required: true },
  ten_mon: { type: String, required: true },
});

module.exports = mongoose.model('Menu', menuSchema);