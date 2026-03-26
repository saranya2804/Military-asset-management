const express = require('express');
const router = express.Router();
const Asset = require('../models/asset');
const Transfer = require('../models/transfer');
const auth = require('../middleware/auth');

router.post('/', auth('Logistics'), async (req, res) => {
  try {
    const { assetName, fromBase, toBase, quantity } = req.body;

    const from = await Asset.findOne({ assetName, base: fromBase });
    const to = await Asset.findOne({ assetName, base: toBase });

    if (!from || from.quantity < quantity) {
      return res.status(400).send("Insufficient assets");
    }

    if (!to) {
      return res.status(400).send("Destination base not found");
    }

    from.quantity -= quantity;
    to.quantity += quantity;

    await from.save();
    await to.save();

    const transfer = new Transfer(req.body);
    await transfer.save();

    res.send("Transfer Successful");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;