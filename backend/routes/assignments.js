const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment');
const Asset = require('../models/asset');
const auth = require('../middleware/auth');

router.post('/', auth('Commander'), async (req, res) => {
  try {
    const { assetName, base, quantity } = req.body;

    const asset = await Asset.findOne({ assetName, base });

    if (!asset || asset.quantity < quantity) {
      return res.status(400).send("Not enough assets");
    }

    asset.quantity -= quantity;
    await asset.save();

    const assignment = new Assignment(req.body);
    await assignment.save();

    res.json(assignment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;