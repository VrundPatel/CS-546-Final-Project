const express = require('express');
const path = require('path');
const data = require('../data');
const validation = require('../validation');
const restroomData = data.restrooms;
const router = express.Router();

router.route('/')
  .post(async (req, res) => {
    searchTerm = req.body.searchRestrooms;
    console.log(searchTerm);
    // searchTerm = validation.checkSearchTerm(searchTerm, "Search term(s)");
    const results = await restroomData.searchRestroomsByTerm(searchTerm);
    // results.toArray(function(err, restroom){
    //     console.log(restroom);
    // });
    const resultList = await results.toArray();
    res.json(resultList);
  });

module.exports = router;