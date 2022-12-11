const express = require('express');
const path = require('path');
const data = require('../data');
const validation = require('../validation');
const restroomData = data.restrooms;
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        searchTerm = req.body.searchRestrooms;
        const result = await restroomData.searchRestroomsByLocation();
        // const resultList = await results.toArray();
        // res.json(resultList);
        res.json(result);
    })
    .post(async (req, res) => {
        searchTerm = req.body.searchRestrooms;
        try {
            searchTerm = validation.checkString(searchTerm, "Search term(s)");
        } catch (e) {
            res.status(400).json({ error: e });
        }
        const results = await restroomData.searchRestroomsByTerm(searchTerm);
        const resultList = await results.toArray();
        res.json(resultList);
  });

module.exports = router;