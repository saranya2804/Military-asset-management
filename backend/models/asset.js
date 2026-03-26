const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    assetName: String,
    type: String,
    quantity: Number,
    base: String
});

module.exports = mongoose.model('Asset', assetSchema);