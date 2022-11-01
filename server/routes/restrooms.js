const express = require('express');
const router = express.Router();
const data = require('../data');
const restroomData = data.restrooms;

router
  .route('/')
  .get(async (req, res) => {
    const restroomsList = await restroomData.getAllRestrooms();
    res.json(restroomsList);
  })

module.exports = router;