// models/transfer.js
const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  assetName: String,
  fromBase: String,
  toBase: String,
  quantity: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transfer', transferSchema);