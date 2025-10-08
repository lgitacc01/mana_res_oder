const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  gia: { type: String, required: true },
  ten_mon_an: { type: String, required: true },
}, { collection: 'menu' });

module.exports = mongoose.model('Menu', menuSchema);