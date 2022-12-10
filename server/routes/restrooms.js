const express = require("express");
const router = express.Router();
const data = require("../data");
const restroomData = data.restrooms;
const { ObjectId } = require("mongodb");

router
  .route("/")
  .get(async (req, res) => {
    const restroomList = await restroomData.getAllRestrooms();
    res.json(restroomList);
  })
  .post(async (req, res) => {
    //TODO: Inserts a new restroom with fields
    console.log(req.body);
    let newObj = await data.restrooms.createRestroom(
      req.body.streetAddress,
      req.body.city,
      req.body.state,
      req.body.zipCode,
      req.body.openingHours,
      req.body.closingHours,
      req.body.tags
    );
    res.status(200).json({ newObj: newObj });
  })
  .delete(async (req, res) => {
    //TODO: Deletes a restroom by ID
    res.send("DELETE request to http://localhost:3000/restroom");
  });

router
  .route("/:restroomId")
  .get(async (req, res) => {
    try {
      // Error Checking
      //TODO: ID validation
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const restroom = await restroomData.getRestroomById(
        req.params.restroomId
      );
      res.json(restroom);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //TODO: Updates an existing restroom with updated fields
    res.send(`POST request to http://localhost:3000/restroom/${req.params.id}`);
  });

module.exports = router;
