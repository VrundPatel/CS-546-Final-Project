const mongoCollections = require('../config/mongoCollections');
const express = require('express');
const router = express.Router();
const data = require('../data');
const reportData = data.reports;
const restroomData = data.restrooms;
const restrooms = mongoCollections.restrooms;
const { ObjectId } = require('mongodb');

router
  .route('/:restroomId')
  .get(async (req, res) => {
    //code here for GET
    const id = req.params.restroomId;
    if (!id) {
      res.status(400).json({ error: `You must provide an id to search for` });
      return;
    }
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: `invalid id is given` });
      return;
    }
    try {
      await restroomData.getRestroomById(id);
    } catch (e) {
      res.status(404).json({ error: `Restroom by id not found` });
      return;
    }
    try {
      const allReportsList = await reportData.getAllReports(id);
      if (allReportsList.length == 0) {
        res.status(404).json({ error: `no report for this restroom` });
        return;
      }
      res.status(200).json(allReportsList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    let user = req.user;
    const id = req.params.restroomId;
    const reportInfo = req.body;
    if (!reportInfo.value) {
      res.status(400).json({ error: `the request body is not valid` });
      return;
    }
    try {
      checkString(id);
      checkString(reportInfo.value);
      checkString(user._id);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! Input should be a non-empty string` });
      return;
    }
    if (!id) {
      res.status(400).json({ error: `You must provide an id to search for` });
      return;
    }
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: `invalid id is given` });
      return;
    }
    const restroomsCollection = await restrooms();
    const restroom = await restroomsCollection.findOne({ _id: ObjectId(id) });
    if (restroom === null) {
      res.status(404).json({ error: `Restroom by id not found` });
      return;
    }
    const restroomData = await reportData.createReport(id, reportInfo.value, user._id);
    res.status(200).json(restroomData);
  });

router
  .route('/reports/:reportId')
  .get(async (req, res) => {
    //code here for GET
    const id = req.params.reportId;
    if (!id) {
      res.status(400).json({ error: `You must provide an id to search for` });
      return;
    }
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: `invalid id is given` });
      return;
    }
    try {
      await reportData.getReportById(id)
    } catch (e) {
      res.status(404).json({ error: `report by id not found` });
      return;
    }
    try {
      const report = await reportData.getReportById(id);
      res.status(200).json(report);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    const id = req.params.reportId;
    if (!id) {
      res.status(400).json({ error: `You must provide an id to search for` });
      return;
    }
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: `invalid id is given` });
      return;
    }
    try {
      await reportData.getReportById(id)
    } catch (e) {
      res.status(404).json({ error: `report by id not found` });
      return;
    }
    try {
      const restroom = await reportData.removeReportById(id);
      res.status(200).json(restroom);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

function checkString(input) {
  if (typeof input != 'string' || input.trim().length == 0) {
    throw `Not valid! ${input} should be a non-empty string`;
  }
}

module.exports = router;