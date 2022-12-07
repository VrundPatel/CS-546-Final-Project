const express = require('express');
const router = express.Router();
const data = require('../data');
const restroomData = data.restrooms;
const { ObjectId } = require('mongodb');

router
  .route('/')
  .get(async (req, res) => {
    const restroomList = await restroomData.getAllRestrooms();
    res.json(restroomList);
  })
  .post(async (req, res) => {
    //TODO: Inserts a new restroom with fields
    let restroomInfo = req.body;
    if (!restroomInfo.streetAddress || !restroomInfo.city || !restroomInfo.state ||
      !restroomInfo.zipCode || !restroomInfo.openingHours || !restroomInfo.closingHours ||
      !restroomInfo.availability || !restroomInfo.ammenities) {
      res.status(400).json({ error: `the request body is not valid` });
      return;
    }
    try {
      checkString(restroomInfo.streetAddress);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! StreetAddress should be a non-empty string` });
      return;
    }
    try {
      checkString(restroomInfo.city);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! City should be a non-empty string` });
      return;
    }
    try {
      checkString(restroomInfo.state);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! State should be a non-empty string` });
      return;
    }
    try {
      checkString(restroomInfo.zipCode);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! Zipcode should be a non-empty string` });
      return;
    }
    try {
      checkString(restroomInfo.openingHours);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! Opening hours should be a non-empty string` });
      return;
    }
    try {
      checkString(restroomInfo.closingHours);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! Closing hours should be a non-empty string` });
      return;
    }
    try {
      checkArrays(restroomInfo.availability);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! Availability should be a non-empty Array` });
      return;
    }
    try {
      checkArrays(restroomInfo.ammenities);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! Ammenities should be a non-empty Array` });
      return;
    }
    try {
      const restroom = await restroomData.createRestroom(restroomInfo.streetAddress, restroomInfo.city, restroomInfo.state, restroomInfo.zipCode, restroomInfo.openingHours, restroomInfo.closingHours, restroomInfo.availability, restroomInfo.ammenities);
      res.status(200).json(restroom);
    } catch (e) {
      res.status(500).json({ error: e });
    }

    //res.send('POST request to http://localhost:3000/restroom');
  });

router
  .route('/:restroomId')
  .get(async (req, res) => {
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
      res.status(404).json({ error: `restroom by id not found` });
      return;
    }
    try {
      const restroom = await restroomData.getRestroomById(id);
      res.status(200).json(restroom);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //TODO: Updates an existing restroom with updated fields
    const id = req.params.restroomId;
    const restroomInfo = req.body;
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
      res.status(404).json({ error: `restroom by id not found` });
      return;
    }
    if (!restroomInfo.streetAddress || !restroomInfo.city || !restroomInfo.state ||
      !restroomInfo.zipCode || !restroomInfo.openingHours || !restroomInfo.closingHours ||
      !restroomInfo.availability || !restroomInfo.ammenities) {
      res.status(400).json({ error: `the request body is not valid` });
      return;
    }
    try {
      checkString(restroomInfo.streetAddress);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! StreetAddress should be a non-empty string` });
      return;
    }
    try {
      checkString(restroomInfo.city);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! City should be a non-empty string` });
      return;
    }
    try {
      checkString(restroomInfo.state);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! State should be a non-empty string` });
      return;
    }
    try {
      checkString(restroomInfo.zipCode);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! Zipcode should be a non-empty string` });
      return;
    }
    try {
      checkString(restroomInfo.openingHours);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! Opening hours should be a non-empty string` });
      return;
    }
    try {
      checkString(restroomInfo.closingHours);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! Closing hours should be a non-empty string` });
      return;
    }
    try {
      checkArrays(restroomInfo.availability);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! Availability should be a non-empty Array` });
      return;
    }
    try {
      checkArrays(restroomInfo.ammenities);
    }
    catch (e) {
      res.status(400).json({ error: `Not valid! Ammenities should be a non-empty Array` });
      return;
    }
    try {
      const updatedRestroom = await restroomData.updateRestroom(id, restroomInfo.streetAddress, restroomInfo.city, restroomInfo.state, restroomInfo.zipCode, restroomInfo.openingHours, restroomInfo.closingHours, restroomInfo.availability, restroomInfo.ammenities);
      res.status(200).json(updatedRestroom);
    } catch (e) {
      res.status(500).json({ error: e });
    }
    //res.send(`POST request to http://localhost:3000/restroom/${req.params.id}`);
  })
  .delete(async (req, res) => {
    //TODO: Deletes a restroom by ID
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
      res.status(404).json({ error: `restroom by id not found` });
      return;
    }
    try {
      await restroomData.removeRestroomById(id);
      res.status(200).json({ restroomId: id, deleted: true });
    } catch (e) {
      res.status(500).json({ error: e });
    }
    //res.send('DELETE request to http://localhost:3000/restroom');
  });

  function checkString(input) {
    if (typeof input != 'string' || input.trim().length == 0) {
      throw `Not valid! ${input} should be a non-empty string`;
    }
  }
  
  function checkArrays(input) {
    if (!Array.isArray(input) || input.length === 0) {
      throw `${input} should not be a non-empty array`;
    }
    for (i = 0; i < input.length; i++) {
      if (typeof input[i] != 'string' || input[i].trim().length === 0) {
        throw `${input} should not have empty string elements`;
      }
    }
  }
module.exports = router;