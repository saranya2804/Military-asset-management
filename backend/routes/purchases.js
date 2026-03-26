const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');
const auth = require('../middleware/auth');

router.post('/', auth('Admin'), async (req, res) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.json(asset);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;